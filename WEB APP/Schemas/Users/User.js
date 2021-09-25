const { Schema, model } = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { AUTH_SECRET } = require("../../Config");

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name must not be empty"],
    },
    lastName: {
      type: String,
      required: [true, "Last name must not be empty."],
    },
    phone: {
      type: String,
      required: [true, "Contact number must not be empty."],
    },
    email: {
      type: String,
      required: [true, "Email must not be empty."],
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Invalid email type.",
      ],
    },
    address: {
      type: String,
      required: [true, "address must not be empty."],
      minlength: [8, "address must have at least 8 characters."],
      maxlength: [500, "address must not have more than 60 characters."],
    },
    password: {
      type: String,
      required: [true, "Password must not be empty."],
      minlength: [8, "Password must have at least 8 characters."],
      select: false, // password will not be retrived unless specified
    },

    is_two_factor_enabled: {
      type: Boolean,
      required: false,
    },

    two_factor_secret: {
      type: String,
      required: false,
    },

    two_factor_recovery_codes: {
      type: String,
      required: false,
    },

    role: {
      type: String,
      required: true,
      enum: ["ADMIN", "SITEMANAGER", "ACCOUNTANT", "MANAGER", "SUPPLIER"],
    },

    email_verify_token: { type: String, select: false },
    email_verified_at: Date,
    password_recovery_token: { type: String, select: false },
    password_recovery_expire: { type: String, select: false },
  },

  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  // encrypt password if updated
  this.password = bcrypt.hashSync(this.password, 12);
  next();
});

UserSchema.methods.matchPasswords = function (password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.matchPasswordRecoveryTokens = function (token) {
  return bcrypt.compareSync(token, this.password_recovery_token);
};

UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60, //1hour
      data: {
        user_id: this._id,
        username: this.fname + this.lname,
        role: this.role,
        sub_role: this.sub_role,
        is_two_factor_enabled: this.is_two_factor_enabled,
      },
    },
    AUTH_SECRET
  );
};

UserSchema.methods.getPasswordRecoveryToken = function () {
  const recovery_token = crypto.randomBytes(32).toString("hex");
  this.password_recovery_token = bcrypt.hashSync(recovery_token, 10);
  this.password_recovery_expire = Date.now() + 10 * (60 * 1000);
  this.save();
  return recovery_token;
};

const User = model("user", UserSchema);
module.exports = User;
