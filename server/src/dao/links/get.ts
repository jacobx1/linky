import { User } from '../../entity/User';
import { getConnection } from 'typeorm';
import { Bookmark } from '../../entity/Bookmark';

export const getBookmarks = (user: User) =>
  getConnection()
    .getRepository(Bookmark)
    .find({ ownerId: user.id });
