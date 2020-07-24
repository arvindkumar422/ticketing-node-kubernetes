import express, { Request, Response } from 'express';
import { Ticket } from '../models/ticket';
import { GenericError } from '@arvindtix/common';

const router = express.Router();

router.get('/api/tickets/:id',
    async (req: Request, res: Response) => {
        const tick = await Ticket.findById(req.params.id);
        if(!tick) {
            return new GenericError('Ticket not found');
        }

        res.send(tick);
    });


export { router as showTicketRouter };
