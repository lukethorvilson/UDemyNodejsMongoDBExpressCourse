const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

// Users routes
router.post('/signup', authController.signup); // does not follow REST because it explains what it is doing
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// protect all routes after this middleware
router.use(authController.protect);
router.patch(
  '/updateMyPassword',
  authController.updatePassword,
);
router.get(
  '/me',
  userController.getMe,
  userController.getUser,
);
router.patch('/updateMe', userController.updateMe);
router.patch('/deleteMe', userController.deleteMe);
router.use(authController.restrictTo('admin'))
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
