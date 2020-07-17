import express from 'express';

const router = express.Router();

router.get('/api/users/currentuser', (req, res) => {
    res.send('back to local docker');
});

export { router as currentuserRouter }

// app.get('/api/users/currentuser', (req, res) => {
//     res.send('finally');
// });
