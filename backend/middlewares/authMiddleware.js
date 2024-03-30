import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Driver from '../models/driverModel.js';
import Admin from '../models/adminModel.js';

const isUserAuthenticated = asyncHandler(async (req, res, next) => {
    let token;
    token = req.cookies.jwt;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.userId).select('-password');
            next();
        } catch (error) {
            res.status(401);
            throw new Error("not authorized, invalid token");
        }
    } else {
        res.status(401);
        throw new Error("not authorized, no token");
    }
});

const isUserBlocked = asyncHandler(async (req, res, next) => {
    if (!req.user.isBlocked) {
        next();
    } else {
        res.status(401);
        throw new Error("You are blocked due to suspected activity, no privillege");
    }
});

const isDriverAuthenticated = asyncHandler(async (req, res, next) => {
    let token;
    token = req.cookies.jwt;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.driver = await Driver.findById(decoded.userId).select('-password');
            next();
        } catch (error) {
            res.status(401);
            throw new Error("not authorized, invalid token");
        }
    } else {
        res.status(401);
        throw new Error("not authorized, no token");
    }
});

const isDriverBlocked = asyncHandler(async (req, res, next) => {
    if (!req.driver.isBlocked) {
        next();
    } else {
        res.status(401);
        throw new Error("You are blocked due to suspected activity, no privillege");
    }
});

const isAdminAuthenticated = asyncHandler(async (req, res, next) => {
    let token;
    token = req.cookies.jwt;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.admin = await Admin.findById(decoded.userId).select('-password');
            next();
        } catch (error) {
            res.status(401);
            throw new Error("not authorized, invalid token");
        }
    } else {
        res.status(401);
        throw new Error("not authorized, no token");
    }
});

export { isUserAuthenticated, isDriverAuthenticated, isUserBlocked, isDriverBlocked, isAdminAuthenticated };
