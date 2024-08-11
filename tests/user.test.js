const request = require('supertest');
const express = require('express');
const userRoutes = require('./routes/api/v1/user/index');
const prisma = require('../prismaClient');  // Misalkan ini adalah Prisma Client Anda

const app = express();
app.use(express.json());
app.use('./routes/api/v1/user/index', userRoutes);

describe('User API', () => {
  beforeAll(async () => {
    // Setup: Anda dapat membuat setup database di sini jika diperlukan
  });

  afterAll(async () => {
    // Cleanup: Misalnya membersihkan data setelah tes selesai
    await prisma.user.deleteMany();
  });

  it('should return all users', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.data).toBeInstanceOf(Array);
  });

  it('should create a new user', async () => {
    const newUser = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123'
    };
    const res = await request(app).post('/users').send(newUser);
    expect(res.statusCode).toBe(201);
    expect(res.body.status).toBe('success');
    expect(res.body.data.name).toBe(newUser.name);
    expect(res.body.data.email).toBe(newUser.email);
  });

  it('should return a single user by ID', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'password123'
      }
    });
    const res = await request(app).get(`/users/user/${user.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.data.name).toBe(user.name);
  });

  it('should update a user by ID', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'John Smith',
        email: 'john.smith@example.com',
        password: 'password123'
      }
    });
    const updatedData = { name: 'John Smith Updated' };
    const res = await request(app).patch(`/users/user/${user.id}`).send(updatedData);
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.data.name).toBe(updatedData.name);
  });

  it('should delete a user by ID', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'Alice Doe',
        email: 'alice@example.com',
        password: 'password123'
      }
    });
    const res = await request(app).delete(`/users/user/${user.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('success');
    const findUser = await prisma.user.findUnique({ where: { id: user.id } });
    expect(findUser).toBeNull();
  });
});
