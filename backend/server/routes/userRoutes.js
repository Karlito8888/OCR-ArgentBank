// const express = require('express')
// const router = express.Router()
// const userController = require('../controllers/userController')
// const tokenValidation = require('../middleware/tokenValidation')

// router.post('/signup', userController.createUser)

// router.post('/login', userController.loginUser)

// router.get(
//   '/profile',
//   tokenValidation.validateToken,
//   userController.getUserProfile
// )

// router.put(
//   '/profile',
//   tokenValidation.validateToken,
//   userController.updateUserProfile
// )

// module.exports = router
const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const userController = require("../controllers/userController");
const tokenValidation = require("../middleware/tokenValidation");

// Middleware de validation des données pour la création d'utilisateur
const validateUserCreation = [
  body("email").isEmail().withMessage("Enter a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

router.post("/signup", validateUserCreation, userController.createUser);

router.post("/login", userController.loginUser);

router.get(
  "/profile",
  tokenValidation.validateToken,
  userController.getUserProfile
);

router.put(
  "/profile",
  tokenValidation.validateToken,
  userController.updateUserProfile
);

module.exports = router;
