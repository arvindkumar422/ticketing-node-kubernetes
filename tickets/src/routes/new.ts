import express, { Request, Response } from 'express';
import { requireAuth, validateReq } from '@arvindtix/common';
import { body } from 'express-validator';
import { Ticket } from '../models/ticket';
import { TicketCreatedPublisher } from '../events/ticketcreate.publisher';
import {natsUtil} from '../models/nats-singleton';

const router = express.Router();

router.post('/api/tickets',
  [
    body('title').notEmpty().withMessage('Title should have at least one character'),
    body('price').notEmpty().isFloat({ gt: 0 }).withMessage('Price invalid format')
  ],
  validateReq,
  requireAuth,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const tick = await Ticket.build({
      title,
      price,
      userId: req.currentUser!.id
    });

    await tick.save();

    new TicketCreatedPublisher(natsUtil.client).publish(
      {
        id: tick.id,
        title: tick.title,
        price: tick.price,
        userId: tick.userId,
        version: tick.version
      }
    );

    res.status(200).send(tick);
  });


export { router as createTicketRouter };
