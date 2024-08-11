const request = require('supertest');
const express = require('express');
const profileRoutes = require('./routes/api/v1/profile/index');
const prisma = require('../prismaClient');

const app = express();
app.use(express.json());
app.use('./routes/api/v1/transaction/index', profileRoutes);

describe('Profile API', () => {
  beforeAll(async () => {
  });

  afterAll(async () => {
    await prisma.profile.deleteMany();
  });

  it('should return all profiles', async () => {
    const res = await request(app).get('/profiles');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.data).toBeInstanceOf(Array);
  });

  it('should create a new profile', async () => {
    const newProfile = {
      firstName: 'John',
      lastName: 'Doe',
      userId: 1,
    };
    const res = await request(app).post('/profiles').send(newProfile);
    expect(res.statusCode).toBe(201);
    expect(res.body.status).toBe('success');
    expect(res.body.data.firstName).toBe(newProfile.firstName);
    expect(res.body.data.lastName).toBe(newProfile.lastName);
  });

  it('should return a single profile by ID', async () => {
    const profile = await prisma.profile.create({
      data: {
        firstName: 'Jane',
        lastName: 'Doe',
        userId: 1,
      }
    });
    const res = await request(app).get(`/profiles/profile/${id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.data.firstName).toBe(profile.firstName);
  });

  it('should update a profile by ID', async () => {
    const profile = await prisma.profile.create({
      data: {
        firstName: 'John',
        lastName: 'Smith',
        userId: 1,
      }
    });
    const updatedData = { firstName: 'John Updated', lastName: 'Smith Updated' };
    const res = await request(app).patch(`/profiles/profile/${id}`).send(updatedData);
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.data.firstName).toBe(updatedData.firstName);
  });

  it('should delete a profile by ID', async () => {
    const profile = await prisma.profile.create({
      data: {
        firstName: 'Alice',
        lastName: 'Doe',
        userId: 1,
      }
    });
    const res = await request(app).delete(`/profiles/profile/${id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('success');
    const findProfile = await prisma.profile.findUnique({ where: { id: profile.id } });
    expect(findProfile).toBeNull();
  });
});
