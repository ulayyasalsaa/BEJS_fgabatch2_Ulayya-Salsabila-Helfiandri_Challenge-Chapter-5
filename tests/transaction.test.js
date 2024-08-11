const request = require('supertest');
const express = require('express');
const transactionRoutes = require('./routes/api/v1/transaction/index');
const prisma = require('../prismaClient');

const app = express();
app.use(express.json());
app.use('./routes/api/v1/transaction/index', transactionRoutes);

describe('Transaction API', () => {
  beforeAll(async () => {
    // Setup: Bisa tambahkan setup database jika diperlukan
  });

  afterAll(async () => {
    // Cleanup: Membersihkan data setelah tes selesai
    await prisma.transaction.deleteMany();
  });

  it('should return all transactions', async () => {
    const res = await request(app).get('/transactions');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.data).toBeInstanceOf(Array);
  });

  it('should create a new transaction', async () => {
    const newTransaction = {
      amount: 100.0,
      description: 'Test Transaction',
      accountId: 1,
    };
    const res = await request(app).post('/transactions').send(newTransaction);
    expect(res.statusCode).toBe(201);
    expect(res.body.status).toBe('success');
    expect(res.body.data.amount).toBe(newTransaction.amount);
    expect(res.body.data.description).toBe(newTransaction.description);
  });

  it('should return a single transaction by ID', async () => {
    const transaction = await prisma.transaction.create({
      data: {
        amount: 50.0,
        description: 'Sample Transaction',
        accountId: 1,
      }
    });
    const res = await request(app).get(`/transactions/transaction/${id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.data.amount).toBe(transaction.amount);
  });

  it('should update a transaction by ID', async () => {
    const transaction = await prisma.transaction.create({
      data: {
        amount: 75.0,
        description: 'Transaction to Update',
        accountId: 1,
      }
    });
    const updatedData = { amount: 100.0, description: 'Updated Transaction' };
    const res = await request(app).patch(`/transactions/transaction/${id}`).send(updatedData);
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.data.amount).toBe(updatedData.amount);
  });

  it('should delete a transaction by ID', async () => {
    const transaction = await prisma.transaction.create({
      data: {
        amount: 150.0,
        description: 'Transaction to Delete',
        accountId: 1,
      }
    });
    const res = await request(app).delete(`/transactions/transaction/${id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('success');
    const findTransaction = await prisma.transaction.findUnique({ where: { id: transaction.id } });
    expect(findTransaction).toBeNull();
  });
});
