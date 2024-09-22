// const jwt = require('jsonwebtoken')
// const { restart } = require('nodemon')

// module.exports.validateToken = (req, res, next) => {
//   let response = {}

//   try {
//     if (!req.headers.authorization) {
//       throw new Error('Token is missing from header')
//     }

//     const userToken = req.headers.authorization.split('Bearer')[1].trim()
//     const decodedToken = jwt.verify(
//       userToken,
//       process.env.SECRET_KEY || 'default-secret-key'
//     )
//     return next()
//   } catch (error) {
//     console.error('Error in tokenValidation.js', error)
//     response.status = 401
//     response.message = error.message
//   }

//   return res.status(response.status).send(response)
// }
const jwt = require("jsonwebtoken");

module.exports.validateToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Authorization header is missing or malformed" });
    }

    const userToken = authHeader.split("Bearer ")[1].trim();
    const decodedToken = jwt.verify(
      userToken,
      process.env.SECRET_KEY || "default-secret-key"
    );

    req.user = decodedToken; // Passe les données utilisateur pour les prochains middlewares
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    } else {
      return res
        .status(500)
        .json({ message: "Authentication failed", error: error.message });
    }
  }
};
