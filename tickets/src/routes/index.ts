import express, { Request, Response } from 'express';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.get('/api/tickets',
    async (req: Request, res: Response) => {
        const ticks = await Ticket.find();
        console.log("All ticks: ", ticks);
        const tick = await Ticket.find({
            orderId: undefined
        });
        console.log("Tick:", tick);
        res.send(tick);
    });


export { router as indexTicketRouter };
