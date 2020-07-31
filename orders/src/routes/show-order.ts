import express, {Request, Response} from 'express';
import { Order } from '../models/order';
import { GenericError, NotAuthorizedError } from '@arvindtix/common';

const router = express.Router();

router.get('/api/orders/:orderid', async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderid).populate('ticket');
    if(!order) {
        throw new GenericError('Order not found..!');
    }
    if(order.userId !== req.currentUser!.id) {
        throw new NotAuthorizedError();
    }
    res.send(order);
});

export {router as showOrderRouter};