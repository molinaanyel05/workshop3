const { ReasonPhrases, StatusCodes } = require("http-status-codes");
const Photo = require("./../Models/photoModel");
const e = require("express");
const { default: mongoose } = require("mongoose");

exports.createPhoto = async (req, res) => {
  const photo = new Photo(req.body);
  photo.save();
  res.status(StatusCodes.CREATED).json({ message: ReasonPhrases.CREATED });
};

exports.deletePhoto = async (req, res) => {
  const idu = mongoose.Types.ObjectId(req.params.id);
  const foundPhoto = await Photo.findByIdAndRemove(idu);
  if (foundPhoto) {
    res.status(StatusCodes.OK).json({
      message: ReasonPhrases.OK,
    });
  } else {
    res.status(StatusCodes.NOT_FOUND).json({
      message: ReasonPhrases.NOT_FOUND,
    });
  }
};

exports.updatePhoto = async (req, res) => {
  const idu = mongoose.Types.ObjectId(req.params.id);
  const newu = req.body;
  const options = { new: true };
  const foundPhoto = (await Photo.findByIdAndUpdate(idu, newu, options))
    ? res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK })
    : res.status(StatusCodes.NOT_FOUND).json({
        message: ReasonPhrases.NOT_FOUND,
      });
};

exports.getPhotoByAlbumUser = async (req, res) => {
  const { album } = req.query;
  //const albumId = mongoose.Types.ObjectId(album);
  const photosList = await Photo.find({
    album_id: mongoose.Types.ObjectId(album),
  });

  return photosList
    ? res.status(StatusCodes.OK).json({ photos: { photosList } })
    : res.status(StatusCodes.NOT_FOUND).json({
        message: ReasonPhrases.NOT_FOUND,
      });
};
