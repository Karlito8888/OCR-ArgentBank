// const mongoose = require("mongoose");
// const databaseUrl =
//   process.env.DATABASE_URL || "mongodb://localhost/argentBankDB";

// module.exports = async () => {
//   try {
//     await mongoose.connect(databaseUrl, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true, // Ajout de cette option
//     });
//     console.log("Database successfully connected");
//   } catch (error) {
//     console.error(`Database Connectivity Error: ${error}`);
//     throw new Error(error);
//   }
// };
const mongoose = require("mongoose");
const databaseUrl =
  process.env.DATABASE_URL || "mongodb://localhost/argentBankDB";

module.exports = async () => {
  try {
    await mongoose.connect(databaseUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false, // Désactivation des méthodes dépréciées
      useCreateIndex: true, // Utilisation de l'indexation pour éviter les avertissements
    });
    console.log("Database successfully connected");

    // Écouter les événements de connexion
    mongoose.connection.on("connected", () => {
      console.log("Mongoose connected to the database");
    });

    mongoose.connection.on("error", (err) => {
      console.error(`Database connection error: ${err}`);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("Mongoose disconnected from the database");
    });
  } catch (error) {
    console.error(`Database Connectivity Error: ${error}`);
    throw new Error(error);
  }
};

// Pour gérer les événements de déconnexion manuelle
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("Mongoose connection closed due to app termination");
  process.exit(0);
});
