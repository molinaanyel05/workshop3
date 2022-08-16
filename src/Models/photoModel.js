const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
  album_id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  photo: { type: String, required: true },
});

photoSchema.methods.toJSON = function () {
  const { __v, _id, ...photo } = this.toObject();
  photo.id = _id;
  return photo;
};
module.exports = mongoose.model("Photo", photoSchema);
