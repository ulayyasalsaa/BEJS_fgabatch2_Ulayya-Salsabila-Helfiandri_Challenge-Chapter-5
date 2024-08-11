var express = require('express');
var router = express.Router();
const USER_CONTROLLER = require('../../../../controllers/user.controller');

// Rute untuk mendapatkan daftar semua pengguna
router.get('/', USER_CONTROLLER.getAllUsers);

// Rute untuk mendapatkan pengguna berdasarkan ID
router.get('/user/:id', USER_CONTROLLER.getUserById);

// Rute untuk menambahkan pengguna baru
router.post('/', USER_CONTROLLER.createUser);

// Rute untuk memperbarui seluruh informasi pengguna berdasarkan ID
router.put('/user/:id', USER_CONTROLLER.updateUser);

// Rute untuk memperbarui sebagian informasi pengguna berdasarkan ID
router.patch('/user/:id', USER_CONTROLLER.patchUser);

// Rute untuk menghapus pengguna berdasarkan ID
router.delete('/user/:id', USER_CONTROLLER.deleteUser);

module.exports = router;