import express, {Request, Response} from 'express';
import { requireAuth, validateReq } from '@arvindtix/common';
import { body } from 'express-validator';
import { Order } from '../models/order';

const router = express.Router();

router.get('/api/orders', 
requireAuth,
async (req: Request, res: Response) => {
    const allOrders = await Order.find({
        userId: req.currentUser!.id
    }).populate('ticket');
    res.status(200).send(allOrders);
});

export {router as indexOrderRouter};
