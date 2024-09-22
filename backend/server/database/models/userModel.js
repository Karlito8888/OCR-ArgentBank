const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+\@.+\..+/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
    toObject: {
      transform: (doc, ret, options) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password; // Supprime le mot de passe lors de la transformation
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Middleware pour hacher le mot de passe avant de le sauvegarder
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Si le mot de passe n'est pas modifié, passer à l'étape suivante
  try {
    const salt = await bcrypt.genSalt(10); // Générer un sel avec un facteur de coût de 10
    this.password = await bcrypt.hash(this.password, salt); // Hacher le mot de passe
    next();
  } catch (error) {
    next(error);
  }
});

// Méthode pour comparer les mots de passe lors de la connexion
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password); // Comparer le mot de passe haché
};

module.exports = mongoose.model("User", userSchema);
