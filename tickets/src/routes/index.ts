import express, { Request, Response } from 'express';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.get('/api/tickets',
    async (req: Request, res: Response) => {
        const tick = await Ticket.find({});
        res.send(tick);
    });


export { router as indexTicketRouter };
