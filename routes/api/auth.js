const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const ErrorResponse = require('../../utils/ErrorResponse');
const sendEmail = require('../../utils/sendEmail');

router.post('/register', async (req, res, next) => {
  const { username, email, password } = req.body;

  User.findOne({ email }).then(user => {
    if (user) return next(new ErrorResponse('User already exist!', 401));
    //   res.status(401).json({
    //   success: false,
    //   error: 'User already exist!',
    // });
  });

  User.create({
    username,
    email,
    password,
  })
    .then(user => {
      return sendToken(user, 201, res);
    })
    .catch(err => {
      return next(err);
      //   res.status(400).json({
      //   success: false,
      //   error: err.message,
      // });
    });
  // try{
  //     const user = await User.create({
  //         username,
  //         email,
  //         password
  //     });
  //     res.status(201).json({
  //         success: true,
  //         user
  //     });
  // }catch(error){
  //     res.status(500).json({
  //         success:false,
  //         error: error.message,
  //     });
  // }
});

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse('Please provide email and password', 400));
    //   res.status(400).json({
    //   success: false,
    //   error: 'Please provide email and password',
    // });
  }

  User.findOne({ email })
    .select('+password')
    .then(user => {
      if (!user) return next(new ErrorResponse('Invalid credentials', 404));
      //   res.status(404).json({
      //   success: false,
      //   error: 'Invalid credentials',
      // });

      user.matchPasswords(password).then(isMatch => {
        if (!isMatch)
          return next(new ErrorResponse('Invalid credentials', 404));
        //   res.status(404).json({
        //   success: false,
        //   error: 'Invalid password',
        // });

        //if Match
        return sendToken(user, 200, res);
      });
    })
    .catch(err => {
      return next(err);
      //   res.status(500).json({
      //   success: false,
      //   erorr: err.message,
      // });
    });
  // try{
  //     const user = await User.findOne({ email }).select('+password');

  //     if(!user){
  //         res.status(404).json({
  //             success: false,
  //             error: 'Invalid credentials'
  //         });
  //     }
  //     const isMatch = await user.matchPasswords(password);
  //     if(!isMatch){
  //         res.status(404).json({
  //             success: false,
  //             error: 'Invalid password'
  //         });
  //     }
  //     res.status(200).json({
  //         success: true,
  //         token: '123124123'
  //     });
  // }catch(error){
  //     res.status(404).json({
  //         success: false,
  //         error: error.message
  //     });
  // }
});

router.post('/forgotpassword', async (req, res, next) => {
  const { email } = req.body;

  User.findOne({ email })
    .then(user => {
      if (!user) return next(new ErrorResponse('Email could not be sent', 404));

      const resetToken = user.getResetPasswordToken();

      user.save();
      const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

      const message = `
          <h1>You have requested a password reset</h1>
          <p>Please go to this link to reset your password <a href=${resetUrl} clickracking=off>${resetUrl}</a></p>
          `;
      try {
        sendEmail({
          to: user.email,
          subject: 'Password Reset Request',
          text: message,
        });

        return res.status(200).json({
          success: true,
          data: 'email sent',
        });
      } catch (err) {
        user.getResetPasswordToken = undefined;
        user.getResetPasswordExpire = undefined;

        user.save();

        return next(new ErrorResponse('Email could not be sent', 500));
      }
    })
    .catch(err => {
      return next(err);
    });
});

router.put('/resetpassword:resetToken', (req, res, next) => {
  res.send('Reset password route');
});

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({
    success: true,
    user,
    token,
  });
};

module.exports = router;
