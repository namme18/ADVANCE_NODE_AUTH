const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('config');
const ErrorResponse = require('../utils/ErrorResponse');

const auth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new ErrorResponse('Not authorize to access this route!', 401));
  }

  try {
    const decoded = await jwt.verify(token, config.get('secret'));

    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new ErrorResponse('No user found with this id', 404));
    }
    req.user = decoded;
    next();
  } catch (err) {
    return next(new ErrorResponse('Not authorize to access this route!', 401));
  }
};

module.exports = auth;
