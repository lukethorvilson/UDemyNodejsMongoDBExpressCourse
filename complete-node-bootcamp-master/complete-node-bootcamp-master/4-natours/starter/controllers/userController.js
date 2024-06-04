const User = require('./../models/userModel');
const catchAsync = require('./../util/catchAsync');
const AppError = require('./../util/appError');
const factory = require('./handlerFactory');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

// User handlers

exports.updateMe = async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('This route is not for password updates.', 400));
  }
  // 2) Filter the body to just the fields that should be changed
  const filteredBody = filterObj(req.body, 'name', 'email');
  // 3) update the user
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
};

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.createUser = function (req, res) {
  res.status(500).json({
    status: 'error',
    message: 'This route will not be defined. Please use sign up instead.',
  });
};

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);

// Do not update passwords with this
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
