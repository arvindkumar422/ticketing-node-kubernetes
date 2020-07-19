import express from 'express';

import { currentUserMw } from '../middleware/currentUserMiddleware';

const router = express.Router();

router.get('/api/users/currentuser', currentUserMw, (req, res) => {
    res.send({ currentUser: req.currentUser || null });
});

export { router as currentuserRouter }
