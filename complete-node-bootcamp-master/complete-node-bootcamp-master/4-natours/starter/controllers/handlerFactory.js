const catchAsync = require('./../util/catchAsync');
const AppError = require('./../util/appError');
const APIFeatures = require('./../util/apiFeatures');

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

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // returns the modified document instead of the original
      runValidators: true, // runs the validators on the schema
    });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404)); // must return this so we do not run into the next lines of code below
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.getOne = (Model, popOtions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOtions) query = query.populate(popOtions);
    const doc = await query;
    // const doc = await Model.findById(req.params.id).populate('reviews');

    if (!doc) {
      return next(new AppError('No document found with that ID', 404)); // must return this so we do not run into the next lines of code below
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async function (req, res, next) {
    // To allow for nested GET reviews on tour(small hack)
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

    // EXCECUTE QUERY
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .pagination();

    const docs = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        data: docs,
      },
    });
  });
