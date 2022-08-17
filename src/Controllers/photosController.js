const { ReasonPhrases, StatusCodes } = require("http-status-codes");
const Photo = require("./../Models/photoModel");
const e = require("express");
const { default: mongoose } = require("mongoose");

exports.createPhoto = async (req, res) => {
  if (!req.user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: ReasonPhrases.UNAUTHORIZED });
  }
  try {
    const photo = await new Photo(req.body);
    photo.save();
    return res
      .status(StatusCodes.CREATED)
      .json({ message: ReasonPhrases.CREATED });
  } catch (error) {
    console.log("as", error);
  }
};

exports.deletePhoto = async (req, res) => {
  if (!req.user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: ReasonPhrases.UNAUTHORIZED });
  }
  const idu = mongoose.Types.ObjectId(req.params.id);
  const foundPhoto = await Photo.findByIdAndRemove(idu);
  if (foundPhoto) {
    return res.status(StatusCodes.OK).json({
      message: ReasonPhrases.OK,
    });
  } else {
    return res.status(StatusCodes.NOT_FOUND).json({
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
    album_id: album,
  });
  return photosList
    ? res.status(StatusCodes.OK).json({ photos: { photosList } })
    : res.status(StatusCodes.NOT_FOUND).json({
        message: ReasonPhrases.NOT_FOUND,
      });
};

exports.getPhotoByName = async (req, res) => {
  const user= req.params.user;
  const title= req.params.title;
  const foundAlbum = await Album.find({user: user});
  if (foundAlbum) {
      res.status(StatusCodes.OK).json({
      message: ReasonPhrases.OK,
      data: foundAlbum.filter(album => album.name.toLowerCase().includes(title.toLowerCase()))
    });
  } else {
    res.status(StatusCodes.NOT_FOUND).json({
      message: ReasonPhrases.NOT_FOUND,
    });
  }
};


exports.getPhotoByID = async (req, res) => {
  const { id } = req.query;

  if (!req.user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: ReasonPhrases.UNAUTHORIZED });
  }

  try {
    const photo = await Photo.findById(id);
    return res
      .status(StatusCodes.OK)
      .json({ message: ReasonPhrases.OK, data: photo });
  } catch (error) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: ReasonPhrases.NOT_FOUND });
  }
};
