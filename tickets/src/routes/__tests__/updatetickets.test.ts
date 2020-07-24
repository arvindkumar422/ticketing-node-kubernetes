import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('401 if user is not unauthorized', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/tickets/${id}`)
        .send({
            title: 'asdfghj',
            price: 2345,
        })
        .expect(401);
});

it('404 if id does not exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/tickets/${id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'aslkdfj',
            price: 20,
        })
        .expect(404);
});

it('401 if the user does not own ticket', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'old title',
            price: 20,
        });

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'new title',
            price: 40,
        })
        .expect(401);
});

it('returns a 400 if the user provides an invalid title or price', async () => { });

it('updates the ticket provided valid inputs', async () => { });
