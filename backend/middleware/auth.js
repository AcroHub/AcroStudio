const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");

exports.isAuthenticatedUser = catchAsyncErrors(
    async (req, res, next) => {
        // console.log(req.headers.authorization);
        // get token from header and check if it is there or not
        const { authorization } = req.headers;
        if (!authorization) {
            return next(new ErrorHandler("Login first to access this resource", 401));
        }
        const token = authorization.split(" ")[1]; 

        if (!token) {
            return next(new ErrorHandler('Login first to access this resource', 401));
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    }
);

exports.authorizedRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role (${req.user.role}) is not allowed to access this resource`, 403));
        }
        next();
    }
}