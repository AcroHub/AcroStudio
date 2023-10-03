const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const jwt = require('jsonwebtoken');

// Register User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {

  try {

    const { name, username, email, password } = req.body;

    const isUsernameAlready = await User.findOne({ username });

    if (isUsernameAlready) {
      return next(new ErrorHandler("Username already exists", 400));
    }

  const isEmailAlready = await User.findOne({ email });

  if (isEmailAlready) {
    return next(new ErrorHandler("Email already exists", 400));
  }

  const user = await User.create({
    name,
    username,
    email,
    password,
    avatar: {
      public_id: "default-avatar",
      url: "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg",
    },
  });

  const token  = jwt.sign({
    id: user._id,
    name: user.name,
    username: user.username,
    role: user.role,
    avatar: user.avatar,
  },
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
);

  res.cookie("token", token, {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  });

  const { ...others } = user._doc;

    res.status(200).json({ ...others, token });

  //sendToken(user, 201, res);

  //   var user = await User.findOne({ username: req.body.username });
  //   if(user) {
  //       return res.status(400).json("Username Already Taken");
  //   }

  //   user = await User.findOne({ email: req.body.email });
  //   if(user) {
  //       return res.status(400).json("E-Mail ID Already In Use")
  //   }

  //   // check password = confirm password
  //   if(req.body.password !== req.body.confirmPassword) {
  //       return res.status(400).json("Passwords Do Not Match");
  //   }

  //   const newUser = await User.create({
  //     name: req.body.name,
  //     username: req.body.username,
  //     email: req.body.email,
  //     password: crypto.AES.encrypt(req.body.password, process.env.PASS_PHRASE).toString(),
  //     avatar: {
  //       public_id: "default-avatar",
  //       url: "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg",
  //     }
  // });

  //   // const newUser = new User({
  //   //   name: req.body.name,
  //   //     username: req.body.username,
  //   //     email: req.body.email,
  //   //     password: crypto.AES.encrypt(req.body.password, process.env.PASS_PHRASE).toString(),
  //   //     avatar: {
  //   //       public_id: "default-avatar",
  //   //       url: "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg",
  //   //     }
  //   // });
  //   // const savedUser = await newUser.save();

  //   res.status(200).json(newUser);
} catch (err) {
    res.status(500).json(err.message);
}

  
});

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {

  try {

    const { email, password } = req.body;

  // Checks if email and password is entered by user
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  
  if (user.role === "admin") {
    res.cookie("role", "admin", {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    });
  }

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const token  = jwt.sign({
    id: user._id,
    name: user.name,
    username: user.username,
    role: user.role,
    avatar: user.avatar,
  },
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
);

  res.cookie("token", token, {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  });

  const { ...others } = user._doc;

    res.status(200).json({ ...others, token });

  //sendToken(user, 200, res);

    // const user = await User.findOne({ username: req.body.username });

    // if(!user) {
    //     return res.status(404).json("Invalid Username");
    // }

    // const hashedPassword = crypto.AES.decrypt(user.password, process.env.PASS_PHRASE);
    // const OriginalPassword = hashedPassword.toString(crypto.enc.Utf8);

    // if(OriginalPassword !== req.body.password) {
    //     return res.status(400).json("Incorrect Password");
    // }

    // const accessToken = jwt.sign({
    //         id: user._id,
    //         name: user.username,
    //         isAdmin: user.isAdmin,
    //         isStaff: user.isStaff
    //     },
    //     process.env.JWT_SECRET,
    //     { expiresIn: "1d" }
    // );

    // const { password, ...others } = user._doc;

    // res.status(200).json({ ...others, accessToken });
} catch (err) {
    res.status(500).json(err.message);
}
});

// Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

// Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found with this email", 404));
  }
  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your password reset token is as follow:\n\n${resetPasswordUrl}\n\nIf you have not requested this email, then ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "AcroAssets Password Recovery",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to: ${user.email}`,
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(err.message, 500));
  }
});

// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: {
      $gt: Date.now(),
    },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Password reset token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  // Setup new password
  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

// Get user Details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {

  const user = await User.findById(req.user.id);

  if(!user) {
    return next(new ErrorHandler("User not found with this ID", 404));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// Update User Password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  // Check previous user password
  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

// Update User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  // Update avatar: TODO

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

// Get All Users
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// Get User Details => Admin
exports.getUserDetail = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not found with id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// Update User Profile => Admin
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  // Update avatar: TODO

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

// Delete User => Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not found with id: ${req.params.id}`, 404)
    );
  }

  // Remove avatar from cloudinary: TODO

  await user.remove();

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});