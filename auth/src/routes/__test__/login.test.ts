import request from 'supertest';
import { app } from '../../app';

it('test for non-existing email', async () => {
    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'axy@rty.com',
            password: 'asdsd'
        })
        .expect(400);
});

it('test for incorrect password', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'abc@abc.com',
            password: 'abc'
        })
        .expect(201);

    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'abc@abc.com',
            password: 'abcd'
        })
        .expect(400);
});

it('test for response with cookie when given valid credentials', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'abc@abc.com',
            password: 'abc'
        })
        .expect(201);

    const response = await request(app)
        .post('/api/users/signin')
        .send({
            email: 'abc@abc.com',
            password: 'abc'
        })
        .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();
});