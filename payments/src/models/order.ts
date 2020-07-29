import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { OrderStatus } from '@arvindtix/common';

interface OrderAttrs {
    id: string;
    price: number;
    userId: string;
    version: number;
    status: OrderStatus
}

interface OrderDoc extends mongoose.Document {
    price: number;
    userId: string;
    version: number;
    status: OrderStatus
}

interface OrderModel extends mongoose.Model<OrderDoc> {
    build(attrs: OrderAttrs): OrderDoc;
}

const orderSchema = new mongoose.Schema(
    {
        status: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        }
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
            },
        },
    }
);

orderSchema.set('versionKey', 'version'); // to ensure mongoose doesnt user __v flag
orderSchema.plugin(updateIfCurrentPlugin);

orderSchema.statics.build = (attrs: OrderAttrs) => {
    return new Order({
        _id: attrs.id,
        version: attrs.version,
        price: attrs.price,
        userId: attrs.userId,
        status: attrs.status
    });
};

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);

export { Order };
