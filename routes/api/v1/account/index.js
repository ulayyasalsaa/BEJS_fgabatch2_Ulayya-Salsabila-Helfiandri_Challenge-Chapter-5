var express = require('express');
var router = express.Router();
const ACCOUNT_CONTROLLER = require('../../../../controllers/account.controller');

// Rute untuk mendapatkan daftar semua pengguna
router.get('/', ACCOUNT_CONTROLLER.getAllAccounts);

// Rute untuk mendapatkan pengguna berdasarkan ID
router.get('/account/:id', ACCOUNT_CONTROLLER.getAccountById);

// Rute untuk menambahkan pengguna baru
router.post('/', ACCOUNT_CONTROLLER.createAccount);

// Rute untuk memperbarui seluruh informasi pengguna berdasarkan ID
router.put('/account/:id', ACCOUNT_CONTROLLER.updateAccount);

// Rute untuk menghapus pengguna berdasarkan ID
router.delete('/account/:id', ACCOUNT_CONTROLLER.deleteAccount);

module.exports = router;