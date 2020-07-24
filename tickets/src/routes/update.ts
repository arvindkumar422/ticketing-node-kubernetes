import express, { Request, Response } from 'express';
import { Ticket } from '../models/ticket';
import {body} from 'express-validator';
import { GenericError, requireAuth, NotAuthorizedError, validateReq } from '@arvindtix/common';

const router = express.Router();

router.put('/api/tickets/:id',
    [
        body('title').notEmpty().withMessage('Title should have at least one character'),
        body('price').notEmpty().isFloat({ gt: 0 }).withMessage('Price invalid format')
    ],
    validateReq,
    requireAuth,
    async (req: Request, res: Response) => {
        const tick = await Ticket.findById(req.params.id);
        if (!tick) {
            return new GenericError('Ticket not found');
        }

        if (tick.userId !== req.currentUser!.id) {
            throw new NotAuthorizedError();
        }

        tick.set({
            title: req.body.title,
            price: req.body.price
        });

        await tick.save();

        res.send(tick);
    });


export { router as updateTicketRouter };