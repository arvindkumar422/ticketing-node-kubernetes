import { Listener, PaymentCreatedEvent, Subjects, GenericError, OrderStatus } from "@arvindtix/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./QueueGroupName";
import { Order } from "../../models/order";

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
    queueGroupName: string = queueGroupName;
    async onMessage(data: PaymentCreatedEvent['data'], msg: Message) {

        const ord = await Order.findById(data.orderId);

        if (!ord) { throw new GenericError('Order not found'); }

        ord.set({status: OrderStatus.Complete});

        await ord.save();

        msg.ack();
    }

}