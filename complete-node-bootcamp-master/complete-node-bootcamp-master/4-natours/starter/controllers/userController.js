const User = require('./../models/userModel');
const catchAsync = require('./../util/catchAsync');

// User handlers
exports.getAllUsers = catchAsync(async function (req, res) {
  const users = await User.find();

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.createUser = function (req, res) {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet implemented!',
  });
};

exports.getUser = function (req, res) {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet implemented!',
  });
};

exports.updateUser = function (req, res) {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet implemented!',
  });
};

exports.deleteUser = function (req, res) {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet implemented!',
  });
};
