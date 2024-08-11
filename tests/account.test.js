const request = require('supertest');
const express = require('express');
const accountRoutes = require('./routes/api/v1/account/index');
const prisma = require('../prismaClient');

const app = express();
app.use(express.json());
app.use('./routes/api/v1/account/index', accountRoutes);

describe('Account API', () => {
  beforeAll(async () => {
    // Setup database jika diperlukan
  });

  afterAll(async () => {
    // Cleanup setelah tes selesai
    await prisma.account.deleteMany();
  });

  it('should return all accounts', async () => {
    const res = await request(app).get('/accounts');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.data).toBeInstanceOf(Array);
  });

  it('should create a new account', async () => {
    const newAccount = {
      accountType: 'Savings',
      balance: 1000.0,
      userId: 1,
    };
    const res = await request(app).post('/accounts').send(newAccount);
    expect(res.statusCode).toBe(201);
    expect(res.body.status).toBe('success');
    expect(res.body.data.accountType).toBe(newAccount.accountType);
    expect(res.body.data.balance).toBe(newAccount.balance);
  });

  it('should return a single account by ID', async () => {
    const account = await prisma.account.create({
      data: {
        accountType: 'Checking',
        balance: 500.0,
        userId: 1,
      }
    });
    const res = await request(app).get(`/accounts/account/${id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.data.accountType).toBe(account.accountType);
  });

  it('should update an account by ID', async () => {
    const account = await prisma.account.create({
      data: {
        accountType: 'Investment',
        balance: 2000.0,
        userId: 1,
      }
    });
    const updatedData = { balance: 2500.0 };
    const res = await request(app).patch(`/accounts/account/${id}`).send(updatedData);
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.data.balance).toBe(updatedData.balance);
  });

  it('should delete an account by ID', async () => {
    const account = await prisma.account.create({
      data: {
        accountType: 'Retirement',
        balance: 3000.0,
        userId: 1,
      }
    });
    const res = await request(app).delete(`/accounts/account/${id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('success');
    const findAccount = await prisma.account.findUnique({ where: { id: account.id } });
    expect(findAccount).toBeNull();
  });
});
