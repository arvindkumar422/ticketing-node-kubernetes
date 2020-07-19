import request from 'supertest';
import { app } from '../../app';

it('test to check if cookie is set after registration', async () => {
    const resp = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'arvin@dku.com',
            password: 'marty'
        })
        .expect(201);
    
    expect(resp.get('Set-Cookie')).toBeDefined();
});

it('basic test for register', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'arvin@dku.com',
            password: 'marty'
        })
        .expect(201);
});

it('test when email is not valid', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'arvincom',
            password: 'marty'
        })
        .expect(400);
});

it('test when password is not valid', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'arvin@dku.com',
            password: '1'
        })
        .expect(400);
});

it('test when email and password aren\'t provided', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: '',
            password: ''
        })
        .expect(400);
});

it('test when user already exists', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'abc@def.com',
            password: 'pass'
        })
        .expect(201);
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'abc@def.com',
            password: 'pass2?'
        })
        .expect(400);
});