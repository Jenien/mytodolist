const express = require('express');
const router = express.Router();
const { createTodo,deleteTodo, getAllTodo} = require('../controllers/todoControllers');
const { authenticate } = require('../middlewares/auth');

// Create new Todo
router.post('/', authenticate,createTodo );
router.delete('/:todoId', authenticate, deleteTodo);
router.get('/All', authenticate, getAllTodo);
module.exports = router;
 