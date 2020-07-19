import request from 'supertest';
import { app } from '../../app';

it('test for obtaining current user', async () => {
    const resp = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'abc@abc.com',
            password: 'pass'
        })
        .expect(201);

    const cookie = resp.get('Set-Cookie');

    const resp2 = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', cookie)
        .send()
        .expect(200);

    expect(resp2.body.currentUser.email).toEqual('abc@abc.com');
});
