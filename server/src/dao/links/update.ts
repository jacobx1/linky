import { getConnection } from 'typeorm';
import { Bookmark } from '../../entity/Bookmark';
import { User } from '../../entity/User';

const updatePositionsQuery =
  'UPDATE bookmark SET position = position + 1 WHERE position >= ? AND ownerId = ? AND id != ?';

export const repositionBookmark = (
  user: User,
  id: string,
  newPosition: number
) =>
  getConnection().transaction(async manager => {
    const bookmarkStore = manager.getRepository(Bookmark);
    const bookmark = await bookmarkStore.findOneById(id);
    if (bookmark.ownerId !== user.id) throw 'Not the owner!';

    bookmark.position = newPosition;

    await manager.query(updatePositionsQuery, [newPosition, user.id, id]);
    await bookmarkStore.save(bookmark);
  });
