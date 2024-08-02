import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { INestApplication } from '@nestjs/common';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let userToken: string;
  const userCredentials = {
    username: 'testuser',
    password: 'testpassword',
    email: 'test@email.com',
  };

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/login (POST) - failure before registration', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(userCredentials);

    expect(response.status).toBe(401);
  });

  it('/auth/register (POST) - success', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send(userCredentials);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty(
      'message',
      'User registered successfully!',
    );
  });

  it('/auth/login (POST) - success', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(userCredentials);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('access_token');
    userToken = response.body.access_token;
  });

  it('/auth/login (POST) - failure with wrong credentials', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'wronguser', password: 'wrongcredentials' });

    expect(response.status).toBe(401);
  });

  it('/auth/profile (GET) - success', async () => {
    const response = await request(app.getHttpServer())
      .get('/auth/profile')
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('username', userCredentials.username);
    expect(response.body).toHaveProperty('email', userCredentials.email);
  });

  it('/auth/profile (GET) - failure with invalid token', async () => {
    const response = await request(app.getHttpServer())
      .get('/auth/profile')
      .set('Authorization', 'Bearer invalidtoken');

    expect(response.status).toBe(401);
  });

  afterAll(async () => {
    await request(app.getHttpServer())
      .delete('/auth/delete')
      .set('Authorization', `Bearer ${userToken}`);
    await app.close();
  });
});
