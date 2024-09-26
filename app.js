const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const todoRoutes= require('./routes/todoRoutes');
const listRoutes= require('./routes/listRoutes');
const { authenticateToken } = require('./middlewares/auth');
const  morgan = require('morgan');

const app = express();
const prisma = require('./libs/prisma');
app.use (morgan('dev'));

app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/checklist', todoRoutes);
app.use('/api/checklist', listRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;