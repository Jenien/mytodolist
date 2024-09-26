const jwt = require('jsonwebtoken');

const loggedOutTokens = [];

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  if (loggedOutTokens.includes(token)) {
    return res.status(401).json({ success: false, message: "Please log in again." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ success: false, message: "Token has expired." });
      }
      return res.sendStatus(403);
    }

    req.user = decoded;
    next();
  });
};

module.exports = { authenticateToken };