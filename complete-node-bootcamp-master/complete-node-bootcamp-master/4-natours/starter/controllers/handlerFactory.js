const catchAsync = require('./../util/catchAsync');
const AppError = require('./../util/appError');

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404)); // must return this so we do not run into the next lines of code below
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
