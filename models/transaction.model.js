const prisma = require('../config/db');

// get all transaction
async function getAllTransactions () {
    try {
        return await prisma.transaction.findMany({
          include: {
            sourceAccount: true,
            destinationAccount: true
          }
        });
      } catch (error) {
        console.error('Error retrieving transactions:', error);
        throw new Error('Failed to retrieve transactions');
      }
};

//get transaction by id
async function getTransactionById (id) {
    try {
        return await prisma.transaction.findUnique({
            where: { id: Number(id) },
            include: {
            sourceAccount: true,
            destinationAccount: true
            }
        });
    } catch (error) {
        console.error('Error retrieving transaction:', error);
        throw new Error('Failed to retrieve transaction');
    }
};

//create transaction
async function createTransaction (transactionData) {
    try {
        return await prisma.transaction.create({
          data: transactionData,
          include: {
            sourceAccount: true,
            destinationAccount: true
          }
        });
      } catch (error) {
        console.error('Error creating transaction:', error);
        throw new Error('Failed to create transaction');
      }
}

module.exports = {
  getAllTransactions,
  getTransactionById,
  createTransaction
};
