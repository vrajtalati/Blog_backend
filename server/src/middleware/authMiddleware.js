const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Token is not valid' });
      }

      req.user = user;
      console.log(user);
      next();
    });
  } else {
    res.status(401).json({ message: 'Authentication token is required' });
  }
};

module.exports = authMiddleware;
