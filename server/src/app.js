const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

require("dotenv").config();

const middlewares = require("./middlewares");
const api = require("./api");
const rolesConfig = require("./config/rolesConfig");
const roleTypes = require("./config/roleTypes");

const User = require("./models/user.model");
const { unauthorizedResponse } = require("./utils/responses");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json({ message: "API running." });
});

app.use(
  "/api/v1",
  async (req, res, next) => {
    const path = req.path;
    const method = req.method;
    let allowed = false;

    rolesConfig.every((r) => {
      if (path == r.path && method == r.method) {
        if (r.roles.includes(roleTypes.DEFAULT)) {
          allowed = true;
        }
      }
    });

    if (allowed) return next();

    const token = req.headers["x-access-token"];

    if (!token) unauthorizedResponse(res);

    try {
      var decoded = await jwt.verify(token, process.env.SECRET_KEY);
    } catch (err) {
      unauthorizedResponse(res);
    }

    const user = await User.findById(decoded.id);
    let match = false;

    rolesConfig.every((r) => {
      if (path != r.path || method != r.method) return true;
      if (
        (r.roles.length == 0 && user.roles.length >= 0) ||
        r.roles.filter((i) => user.roles.includes(i)).length > 0
      ) {
        match = true;
        return false; // just like break
      }
    });

    if (match) return next();

    unauthorizedResponse(res);
  },
  api
);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
