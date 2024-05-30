module.exports = catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next); // if error go to global error handler
  };
};
