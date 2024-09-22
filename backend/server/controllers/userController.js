// const userService = require('../services/userService')

// module.exports.createUser = async (req, res) => {
//   let response = {}

//   try {
//     const responseFromService = await userService.createUser(req.body)
//     response.status = 200
//     response.message = 'User successfully created'
//     response.body = responseFromService
//   } catch (error) {
//     console.error('Something went wrong in userController.js', error)
//     response.status = 400
//     response.message = error.message
//   }

//   return res.status(response.status).send(response)
// }

// module.exports.loginUser = async (req, res) => {
//   let response = {}

//   try {
//     const responseFromService = await userService.loginUser(req.body)
//     response.status = 200
//     response.message = 'User successfully logged in'
//     response.body = responseFromService
//   } catch (error) {
//     console.error('Error in loginUser (userController.js)')
//     response.status = 400
//     response.message = error.message
//   }

//   return res.status(response.status).send(response)
// }

// module.exports.getUserProfile = async (req, res) => {
//   let response = {}

//   try {
//     const responseFromService = await userService.getUserProfile(req)
//     response.status = 200
//     response.message = 'Successfully got user profile data'
//     response.body = responseFromService
//   } catch (error) {
//     console.log('Error in userController.js')
//     response.status = 400
//     response.message = error.message
//   }

//   return res.status(response.status).send(response)
// }

// module.exports.updateUserProfile = async (req, res) => {
//   let response = {}

//   try {
//     const responseFromService = await userService.updateUserProfile(req)
//     response.status = 200
//     response.message = 'Successfully updated user profile data'
//     response.body = responseFromService
//   } catch (error) {
//     console.log('Error in updateUserProfile - userController.js')
//     response.status = 400
//     response.message = error.message
//   }

//   return res.status(response.status).send(response)
// }
const userService = require("../services/userService");

// Créer un nouvel utilisateur
module.exports.createUser = async (req, res) => {
  try {
    const responseFromService = await userService.createUser(req.body);
    return res.status(200).json({
      status: 200,
      message: "User successfully created",
      body: responseFromService,
    });
  } catch (error) {
    console.error("Error in createUser (userController.js):", error.message);
    return res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
};

// Connexion de l'utilisateur
module.exports.loginUser = async (req, res) => {
  try {
    const responseFromService = await userService.loginUser(req.body);
    return res.status(200).json({
      status: 200,
      message: "User successfully logged in",
      body: responseFromService,
    });
  } catch (error) {
    console.error("Error in loginUser (userController.js):", error.message);
    return res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
};

// Récupérer le profil utilisateur
module.exports.getUserProfile = async (req, res) => {
  try {
    const responseFromService = await userService.getUserProfile(req);
    return res.status(200).json({
      status: 200,
      message: "Successfully retrieved user profile data",
      body: responseFromService,
    });
  } catch (error) {
    console.error(
      "Error in getUserProfile (userController.js):",
      error.message
    );
    return res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
};

// Mettre à jour le profil utilisateur
module.exports.updateUserProfile = async (req, res) => {
  try {
    const responseFromService = await userService.updateUserProfile(req);
    return res.status(200).json({
      status: 200,
      message: "Successfully updated user profile data",
      body: responseFromService,
    });
  } catch (error) {
    console.error(
      "Error in updateUserProfile (userController.js):",
      error.message
    );
    return res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
};
