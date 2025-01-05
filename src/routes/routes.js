const express = require('express');
const route = express.Router();
const AppController = require('../controllers/App.controller');


// Halaman utama
route.get('/', (req, res) => {
    res.render('App', {
        title: 'Home',
        message: 'Welcome to Home Page',
    });
});

// Menampilkan semua pengguna
route.get('/users', AppController.getAllUsers);

// Menambahkan pengguna baru
route.post('/users/create', AppController.createUser);

// Memperbarui pengguna
route.post('/users/edit/:id', AppController.updateUser);

// Menghapus pengguna
route.post('/users/delete/:id', AppController.deleteUser);

module.exports = route;
