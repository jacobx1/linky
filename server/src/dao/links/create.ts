import { User } from '../../entity/User';
import { getConnection } from 'typeorm';
import { Bookmark } from '../../entity/Bookmark';
import * as cheerio from 'cheerio';
import * as Request from 'request-promise';
import * as URL from 'url';

const chromeUA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36';
const chromeUserAgentOptions = {
  headers: { 'User-Agent': chromeUA }
};

const updateWithTempTitle = (bookmark: Bookmark) => {
  try {
    const url = URL.parse(bookmark.url);
    let { host, pathname } = url;

    pathname = pathname === '/' ? '' : pathname;
    bookmark.title = `${host}${pathname}`;
  } catch (e) {
    console.error(e);
    bookmark.title = bookmark.url;
  }
};

const updateWithRealTitle = async (bookmark: Bookmark) => {
  try {
    const data = await Request.get(bookmark.url, chromeUserAgentOptions);
    const $ = cheerio.load(data);
    bookmark.title = $('title').text();
  } catch (error) {
    console.error(error);
  }
};

export default async (user: User, url: string) => {
  const bookmarkRepo = getConnection().getRepository(Bookmark);

  const nextPosition = await bookmarkRepo.count({ ownerId: user.id });
  const newBookmark = bookmarkRepo.create();

  newBookmark.owner = user;
  newBookmark.url = url;
  newBookmark.position = nextPosition;

  updateWithTempTitle(newBookmark);
  await updateWithRealTitle(newBookmark);
  await getConnection().manager.save(newBookmark);

  const updatedUser = await getConnection()
    .getRepository(User)
    .findOneById(user.id, { relations: ['bookmarks'] });

  return await updatedUser.bookmarks;
};
