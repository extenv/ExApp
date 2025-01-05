const { json } = require('body-parser');
const db = require('../db');

const appController = {};

// Menampilkan semua pengguna dengan paginasi
appController.getAllUsers = (req, res) => {
    // Ambil halaman saat ini dari query parameter atau default ke halaman 1
    const currentPage = parseInt(req.query.page) || 1;
    const itemsPerPage = 5;  // Tentukan jumlah item per halaman
    const offset = (currentPage - 1) * itemsPerPage;

    // Query untuk mengambil pengguna sesuai halaman saat ini
    db.query('SELECT COUNT(*) AS totalUsers FROM users', (err, countResult) => {
        if (err) {
            console.error('Error fetching total user count:', err.stack);
            res.status(500).send('Error fetching user count');
            return;
        }

        const totalUsers = countResult[0].totalUsers;
        const totalPages = Math.ceil(totalUsers / itemsPerPage); // Hitung jumlah halaman total

        // Query untuk mengambil data pengguna dengan limit dan offset
        db.query('SELECT * FROM users ORDER BY id ASC LIMIT ? OFFSET ?', [itemsPerPage, offset], (err, results) => {
            if (err) {
                console.error('Error fetching users:', err.stack);
                res.status(500).send('Error fetching users');
                return;
            }

            // Kirimkan data pengguna dan informasi halaman ke tampilan
            res.render('crud/list', {
                json: results,
                currentPage: currentPage,
                totalPages: totalPages,
                itemsPerPage: itemsPerPage,
            });
        });
    });
};


// Menambahkan pengguna baru
appController.createUser = (req, res) => {
    const { name, job } = req.body;
    const query = 'INSERT INTO users (name, job) VALUES (?, ?)';
    db.query(query, [name, job], (err, results) => {
        if (err) {
            console.error('Error adding user:', err.stack);
            res.status(500).send('Error adding user');
            return;
        }
        res.redirect('/users');
    });
};


// Memperbarui pengguna
appController.updateUser = (req, res) => {
    const userId = req.params.id;
    const { name, job } = req.body;
    const query = 'UPDATE users SET name = ?, job = ? WHERE id = ?';
    db.query(query, [name, job, userId], (err, results) => {
        if (err) {
            console.error('Error updating user:', err.stack);
            res.status(500).send('Error updating user');
            return;
        }
        res.redirect('/users');
    });
};

// Menghapus pengguna
appController.deleteUser = (req, res) => {
    const userId = req.params.id;
    const query = 'DELETE FROM users WHERE id = ?';
    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error deleting user:', err.stack);
            res.status(500).send('Error deleting user');
            return;
        }
        res.redirect('/users');
    });
};

module.exports = appController;
