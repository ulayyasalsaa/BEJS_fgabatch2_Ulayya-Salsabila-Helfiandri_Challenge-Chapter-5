var express = require('express');
var router = express.Router();
const TRANSACTION_CONTROLLER = require('../../../../controllers/transaction.controller');

// Rute untuk mendapatkan daftar semua transaksi
router.get('/', TRANSACTION_CONTROLLER.getAllTransactions);

// Rute untuk mendapatkan transaksi berdasarkan ID
router.get('/transaction/:id', TRANSACTION_CONTROLLER.getTransactionById);

// Rute untuk menambah transaksi baru
router.post('/', TRANSACTION_CONTROLLER.createTransaction);

module.exports = router;