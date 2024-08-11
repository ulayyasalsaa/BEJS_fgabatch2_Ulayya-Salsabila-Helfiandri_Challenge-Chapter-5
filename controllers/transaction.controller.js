const TRANSACTION_MODELS = require('../models/transaction.model');

//get all transaction
async function getAllTransactions (req, res) {
    try {
        const transactions = await TRANSACTION_MODELS.getAllTransactions();
        res.json({
          status: 'success',
          message: 'Transactions retrieved successfully',
          data: transactions
        });
    } catch (error) {
        console.error(error);
        res.json({
          status: 'error',
          message: 'Failed to retrieve transactions'
        });
    }
};

//get transaction by id
async function getTransactionById (req, res) {
    try {
        const { id } = req.params;
    
        if (!id) {
          return res.json({
            status: 'error',
            message: 'Invalid input'
          });
        }
    
        const transaction = await TRANSACTION_MODELS.getTransactionById(id);
    
        if (!transaction) {
          return res.json({
            status: 'error',
            message: 'Transaction not found'
          });
        }
    
        res.json({
          status: 'success',
          message: 'Transaction retrieved successfully',
          data: transaction
        });
    } catch (error) {
        console.error(error);
        res.json({
          status: 'error',
          message: 'Failed to retrieve transaction'
        });
    } 
};

const createTransaction = async (req, res) => {
    try {
      const { sourceAccountId, destinationAccountId, amount } = req.body;
  
      if (!sourceAccountId || !destinationAccountId || !amount) {
        return res.json({
          status: 'error',
          message: 'Invalid input'
        });
      }
  
      const transactionData = { sourceAccountId, destinationAccountId, amount };
  
      const newTransaction = await TRANSACTION_MODELS.createTransaction(transactionData);
  
      res.json({
        status: 'success',
        message: 'Transaction created successfully',
        data: newTransaction
      });
    } catch (error) {
      console.error(error);
      res.json({
        status: 'error',
        message: 'Failed to create transaction'
      });
    }
  };

module.exports = {
  getAllTransactions,
  getTransactionById,
  createTransaction
};
