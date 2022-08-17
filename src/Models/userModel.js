const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  picture: { type: String, required: true },
  google: { type: Boolean, required: true },
  status: { type: Number, required: true, default: 1 },
});
userSchema.methods.toJSON = function () {
  const { __v, _id, ...user } = this.toObject();
  user.id = _id;
  return user;
};
module.exports = mongoose.model("User", userSchema);
