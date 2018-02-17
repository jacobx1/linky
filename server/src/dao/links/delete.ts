import { getConnection } from 'typeorm';
import { Bookmark } from '../../entity/Bookmark';
import { User } from '../../entity/User';

const updatePositionsQuery =
  'UPDATE bookmark SET position = position - 1 WHERE position > ? AND ownerId = ?';

export const deleteBookmark = (owner: User, id: string) =>
  getConnection().transaction(async em => {
    const bookmarkRepo = em.getRepository(Bookmark);
    const currentBookmark = await bookmarkRepo.findOneById(id);

    if (currentBookmark.ownerId !== owner.id) throw 'Not the owner!';

    await em.query(updatePositionsQuery, [currentBookmark.position, owner.id]);
    bookmarkRepo.delete(currentBookmark);
  });
