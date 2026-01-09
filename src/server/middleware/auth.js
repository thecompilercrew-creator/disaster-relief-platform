const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'No token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decoded.id || decoded._id
    };
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};


