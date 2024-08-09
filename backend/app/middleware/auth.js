const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key';

const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch {
    return null;
  }
};

module.exports = { verifyToken };
