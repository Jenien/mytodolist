const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const { authenticateToken } = require('./middlewares/auth');
const  morgan = require('morgan');

const app = express();
const prisma = require('./libs/prisma');
app.use (morgan('dev'));

app.use(bodyParser.json());

app.use('/api/users', userRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;