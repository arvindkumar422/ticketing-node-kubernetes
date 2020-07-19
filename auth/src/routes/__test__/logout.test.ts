import request from 'supertest';
import { app } from '../../app';

it('test to see if cookie is cleared after signing out', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'abcc@abc.com',
      password: 'abc'
    })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signout')
    .send({currentUser: null})
    .expect(200);

  expect(response.get('Set-Cookie')[0]).toEqual(
    'express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
  );
});
