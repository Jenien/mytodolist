const express = require('express');
const { registerUser, login,getAllUsers } = require('../controllers/userController');
// const { authenticateToken } = require('../middlewares/auth');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', login);
router.get('/all', getAllUsers);

module.exports = router;
