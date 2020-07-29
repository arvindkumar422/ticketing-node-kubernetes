import { Listener, OrderCancelledEvent, Subjects } from "@arvindtix/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./QueueGroupName";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from "../ticketupdate.publisher";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
    queueGroupName: string = queueGroupName;
    async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
        const tick = await Ticket.findById(data.ticket.id);
        
        if(!tick) {throw new Error('Ticket can\'t be found!');}

        tick.set({orderId: undefined});

        await tick.save();

        new TicketUpdatedPublisher(this.client).publish({
            id: tick.id,
            title: tick.title,
            price: tick.price,
            userId: tick.userId,
            version: tick.version,
            orderId: tick.orderId
        });

        msg.ack();
    }
    
}