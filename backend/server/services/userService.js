// const User = require("../database/models/userModel");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// module.exports.createUser = async (serviceData) => {
//   console.log(serviceData);
//   try {
//     const user = await User.findOne({ email: serviceData.email });
//     if (user) {
//       throw new Error("Email already exists");
//     }

//     const hashPassword = await bcrypt.hash(serviceData.password, 12);

//     const newUser = new User({
//       email: serviceData.email,
//       password: hashPassword,
//       firstName: serviceData.firstName,
//       lastName: serviceData.lastName,
//       userName: serviceData.userName,
//     });
//     console.log(newUser);
//     let result = await newUser.save();

//     return result;
//   } catch (error) {
//     console.error("Error in userService.js", error);
//     throw new Error(error);
//   }
// };

// module.exports.getUserProfile = async (serviceData) => {
//   try {
//     const jwtToken = serviceData.headers.authorization
//       .split("Bearer")[1]
//       .trim();
//     const decodedJwtToken = jwt.decode(jwtToken);
//     const user = await User.findOne({ _id: decodedJwtToken.id });

//     if (!user) {
//       throw new Error("User not found!");
//     }

//     return user.toObject();
//   } catch (error) {
//     console.error("Error in userService.js", error);
//     throw new Error(error);
//   }
// };

// module.exports.loginUser = async (serviceData) => {
//   try {
//     const user = await User.findOne({ email: serviceData.email });

//     if (!user) {
//       throw new Error("User not found!");
//     }

//     const isValid = await bcrypt.compare(serviceData.password, user.password);

//     if (!isValid) {
//       throw new Error("Password is invalid");
//     }

//     const token = jwt.sign(
//       { id: user._id },
//       process.env.SECRET_KEY || "default-secret-key",
//       { expiresIn: "1d" }
//     );

//     return { token };
//   } catch (error) {
//     console.error("Error in userService.js", error);
//     throw new Error(error);
//   }
// };

// module.exports.updateUserProfile = async (serviceData) => {
//   try {
//     const jwtToken = serviceData.headers.authorization
//       .split("Bearer")[1]
//       .trim();
//     const decodedJwtToken = jwt.decode(jwtToken);
//     const user = await User.findOneAndUpdate(
//       { _id: decodedJwtToken.id },
//       {
//         userName: serviceData.body.userName,
//       },
//       { new: true }
//     );

//     if (!user) {
//       throw new Error("User not found!");
//     }

//     return user.toObject();
//   } catch (error) {
//     console.error("Error in userService.js", error);
//     throw new Error(error);
//   }
// };
const User = require("../database/models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY || "default-secret-key";

module.exports.createUser = async (serviceData) => {
  try {
    // Vérifier si l'email existe déjà
    const existingUser = await User.findOne({ email: serviceData.email });
    if (existingUser) {
      throw new Error("Email already exists");
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(serviceData.password, 12);

    // Créer un nouvel utilisateur
    const newUser = new User({
      email: serviceData.email,
      password: hashedPassword,
      firstName: serviceData.firstName,
      lastName: serviceData.lastName,
      userName: serviceData.userName,
    });

    // Sauvegarder l'utilisateur dans la base de données
    return await newUser.save();
  } catch (error) {
    console.error("Error in createUser:", error.message);
    throw new Error("Unable to create user");
  }
};

module.exports.getUserProfile = async (serviceData) => {
  try {
    // Extraction et vérification du token JWT
    const jwtToken = serviceData.headers.authorization
      .split("Bearer")[1]
      .trim();
    const decodedJwtToken = jwt.verify(jwtToken, SECRET_KEY); // Utilisation de `verify`

    // Récupérer l'utilisateur par son ID
    const user = await User.findById(decodedJwtToken.id).lean();

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    console.error("Error in getUserProfile:", error.message);
    throw new Error("Unable to retrieve user profile");
  }
};

module.exports.loginUser = async (serviceData) => {
  try {
    // Recherche de l'utilisateur par email
    const user = await User.findOne({ email: serviceData.email });

    if (!user) {
      throw new Error("User not found");
    }

    // Vérification du mot de passe
    const isPasswordValid = await bcrypt.compare(
      serviceData.password,
      user.password
    );
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    // Générer un token JWT
    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1d" });

    return { token };
  } catch (error) {
    console.error("Error in loginUser:", error.message);
    throw new Error("Unable to login user");
  }
};

module.exports.updateUserProfile = async (serviceData) => {
  try {
    // Extraction et vérification du token JWT
    const jwtToken = serviceData.headers.authorization
      .split("Bearer")[1]
      .trim();
    const decodedJwtToken = jwt.verify(jwtToken, SECRET_KEY);

    // Mise à jour des informations de l'utilisateur
    const updatedUser = await User.findByIdAndUpdate(
      decodedJwtToken.id,
      { userName: serviceData.body.userName },
      { new: true, lean: true }
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }

    return updatedUser;
  } catch (error) {
    console.error("Error in updateUserProfile:", error.message);
    throw new Error("Unable to update user profile");
  }
};
