import { Router } from 'express';
import * as Auth from '../auth';

import { getConnection } from 'typeorm';
import { Bookmark } from '../entity/Bookmark';
import { User } from '../entity/User';
import createBookmark from '../dao/links/create';
import { getBookmarks } from '../dao/links/get';
import { deleteBookmark } from '../dao/links/delete';
import { repositionBookmark } from '../dao/links/update';

const router = Router();

// Resource requires authentication
router.use(Auth.authenticated);

const getBookmarksResource = async (req, res) => {
  try {
    const bookmarks = await getBookmarks(req.user);
    res.status(200).send(bookmarks);
  } catch {
    res.status(500).send('Failed to get all links');
  }
};

const createBookmarkResource = async (req, res) => {
  try {
    const bookmarks = await createBookmark(req.user, req.body.url);
    res.status(200).send(bookmarks);
  } catch (e) {
    console.error(e);
    res.status(500).send('Failed to add url');
  }
};

const repositionBookmarkResource = async (req, res) => {
  const { position } = req.body;
  const { id } = req.params;

  try {
    await repositionBookmark(req.user, id, position);
    res.status(200).end();
  } catch {
    res.status(500).send('Failed to update link position');
  }
};

const removeBookmarkResource = async (req, res) => {
  try {
    await deleteBookmark(req.user, req.params.id);
    res.status(200).end();
  } catch {
    res.status(500).send('Failed to delete link');
  }
};

router
  .route('/')
  .get(getBookmarksResource)
  .post(createBookmarkResource);

router
  .route('/:id')
  .patch(repositionBookmarkResource)
  .delete(removeBookmarkResource);

export default router;
