const nodemailer = require('nodemailer');
const catchAsync = require('./catchAsync');

const sendEmail = async (options) => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: proccess.env.EMAIL_PASSWORD,
    },
  });
  // 2) Define the email options
  const mailOptions = {
    from: 'Luke Thorvilson <lukethorvilson@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  // 3) Actually send the email
  await transporter.sendMail(mailOptions)
};

module.exports = sendEmail