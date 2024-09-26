const jwt = require('jsonwebtoken');
const prisma = require("../libs/prisma");
require("dotenv").config();

const authenticate = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer <token>
    if (!token) {
        return res.status(401).json({ success: false, message: 'Token is required' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ success: false, message: 'Invalid token' });
        }
        
        req.user = decoded; 
        next();
    });
};

module.exports = { authenticate };

