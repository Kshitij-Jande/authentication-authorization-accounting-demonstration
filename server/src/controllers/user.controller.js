const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { internalErrorResponse } = require("../utils/responses");

exports.registerUser = async (req, res, next) => {
  console.log("register user");
  try {
    const err = validationResult(req);

    if (!err.isEmpty()) {
      var details = err.array().map((o) => {
        return o.msg;
      });

      return res.status(400).json({
        success: false,
        details: details,
      });
    }

    const { email, password } = req.body;
    var doc = new User({ email: email, password: password });
    doc.password = await saltAndHash(doc.password);

    await doc.save();

    next();
  } catch (e) {
    return internalErrorResponse(res);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const query = await User.findOne({ email: email }).exec();

    if (!query) next();

    if (!(await isCorrectPassword(password, query.password))) {
      return res.status(400).json({
        status: false,
        msg: "Incorrect credentials. Please try again.",
      });
    }

    const userId = query._id;
    const token = await signJWT(userId);

    return res.status(200).json({
      status: true,
      msg: "Login successful.",
      user_id: userId,
      token: token,
    });
  } catch (err) {
    return internalErrorResponse(res);
  }
};

const isCorrectPassword = async (enteredPassword, actualPassword) => {
  return await bcrypt.compare(enteredPassword, actualPassword);
};

const signJWT = async (id) => {
  return await jwt.sign({ id: id }, process.env.SECRET_KEY, {
    expiresIn: process.env.JWT_LIFE,
  });
};

const saltAndHash = async (val) => {
  return await bcrypt.hash(val, await bcrypt.genSalt(10));
};
