const express = require("express");

const {
  setupOwner,
  loginUser
} = require("../controllers/authController");

const router = express.Router();

router.post(
  "/setup",
  setupOwner
);

router.post(
  "/login",
  loginUser
);

module.exports = router;