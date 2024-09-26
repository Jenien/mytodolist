const jwt = require("jsonwebtoken");
const prisma = require("../libs/prisma");
require("dotenv").config();

// Create new Todo
const createTodo = async (req, res) => {
    const userId = req.user.userId; 
    const { title } = req.body;

    try {
    
        const todo = await prisma.todo.create({
            data: {
                title,
                userId, 
            },
        });
        res.status(201).json(todo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

//Delete todo
const deleteTodo = async (req, res) => {
        const userId = req.user.userId; 
        const { todoId } = req.params; 
    
        console.log(`User ID: ${userId}, Todo ID: ${todoId}`); 
        try {
            const parsedTodoId = parseInt(todoId, 10);
            const todo = await prisma.todo.findUnique({
                where: {
                    todoId: parsedTodoId,
                },
            });
    
            if (!todo) {
                return res.status(404).json({ message: 'Todo not found' });
            }
    
            if (todo.userId !== userId) {
                return res.status(403).json({ message: 'You are not authorized to delete this todo' });
            }
            const deletedTodo = await prisma.todo.delete({
                where: {
                    todoId: parsedTodoId, 
                },
            });
    
            console.log(`Todo with ID ${todoId} deleted successfully`);

            res.status(200).json({
                message: `Todo with ID ${todoId} deleted successfully`,
                deletedTodo: {
                    todoId: deletedTodo.todoId,
                    title: deletedTodo.title,
                    createdAt: deletedTodo.createdAt,
                    updatedAt: deletedTodo.updatedAt,
                    deletedBy: userId, 
                },
            }); 
        } catch (error) {
            console.error('Error deleting Todo:', error); 
            res.status(500).json({ error: 'Something went wrong' });
        }
    };

// Get todo
const getAllTodo = async (req, res) => {
    try {
        const todos = await prisma.todo.findMany();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    createTodo,
    deleteTodo,
    getAllTodo
};
