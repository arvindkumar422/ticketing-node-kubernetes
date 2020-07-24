import express from 'express';

import { currentUserMw } from '@arvindtix/common';

const router = express.Router();

router.get('/api/users/currentuser', currentUserMw, (req, res) => {
    res.send({ currentUser: req.currentUser || null });
});

export { router as currentuserRouter }
