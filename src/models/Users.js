const { model, Schema } = require("mongoose");
const bcrypt = require("bcrypt");

const UsersSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    guest_session_id: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

UsersSchema.pre("save", async function preSave(next) {
  this.username = this.username.toLowerCase();
  if (!this.isModified("password")) return next();
  this.password = await this.encrypt(this.password);
  return next();
});

UsersSchema.methods = {
  encrypt: async (plainTextPassword) => {
    if (!plainTextPassword) return "";
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(plainTextPassword, salt);
  },
  authenticate: async function auth(plainTextPassword) {
    return bcrypt.compare(plainTextPassword, this.password);
  },
  toJson: function json() {
    const user = this.toObject();
    delete user.password;
    return user;
  },
};

module.exports = model("mhizterkeyz-user", UsersSchema);
