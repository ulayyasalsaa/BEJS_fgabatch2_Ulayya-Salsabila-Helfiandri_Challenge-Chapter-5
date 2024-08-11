var express = require('express');
var router = express.Router();
const PROFILE_CONTROLLER = require('../../../../controllers/profile.controller');

// Rute untuk mendapatkan daftar semua profile
router.get('/', PROFILE_CONTROLLER.getAllProfiles);

// Rute untuk mendapatkan profile berdasarkan ID
router.get('/profile/:id', PROFILE_CONTROLLER.getProfileById);

// Rute untuk menambahkan profile baru
router.post('/', PROFILE_CONTROLLER.createProfile);

// Rute untuk memperbarui seluruh informasi pengguna berdasarkan ID
router.put('/profile/:id', PROFILE_CONTROLLER.updateProfile);

// Rute untuk memperbarui sebagian informasi pengguna berdasarkan ID
router.patch('/profile/:id', PROFILE_CONTROLLER.patchProfile);

// Rute untuk menghapus pengguna berdasarkan ID
router.delete('/profile/:id', PROFILE_CONTROLLER.deleteProfile);

module.exports = router;