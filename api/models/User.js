const { Schema, model } = require("mongoose");

const validateEmail = function (email) {
  if (email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  return true;
};

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      default: null,
    },
    phone: {
      type: String,
      unique: true,
      trim: true,
      require: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      validate: [validateEmail, "Please provide a valid email address"],
      default: null,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    image: {
      type: String,
      trim: true,
      default: null,
    },
    accountStatus: {
      type: String,
      trim: true,
      default: "Active",
      enum: ["Active", "Deactivate"],
    },
    resetPasswordToken: String,
    resetPasswordTime: Date,
  },
  {
    timestamps: true,
});

// Forgot password 
userSchema.methods.getResetToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // hashing and adding resetPasswordtoken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordTime = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

const User = model("User", userSchema)
module.exports = User;
