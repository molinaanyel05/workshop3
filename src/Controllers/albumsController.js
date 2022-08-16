const { ReasonPhrases, StatusCodes } = require("http-status-codes");
const Album = require("./../Models/albumModel");
const e = require("express");
const { default: mongoose } = require("mongoose");

exports.createAlbum = async (req, res) => {
  const album = new Album(req.body);
  album.save();
  res.status(StatusCodes.CREATED).json({ message: ReasonPhrases.CREATED });
};

exports.showAlbums = async (req, res) => {
  const nameParam = req.params.user;

  const foundAlbum = await Album.find({ user: nameParam });
  if (foundAlbum) {
    res.status(StatusCodes.OK).json({
      message: ReasonPhrases.OK,
      data: foundAlbum,
    });
  } else {
    res.status(StatusCodes.NOT_FOUND).json({
      message: ReasonPhrases.NOT_FOUND,
    });
  }
};

exports.getAlbumById = async (req, res) => {
  const idAlbum = mongoose.Types.ObjectId(req.params.id);

  const foundAlbum = await Album.findById(idAlbum);
  if (foundAlbum) {
    res.status(StatusCodes.OK).json({
      message: ReasonPhrases.OK,
      data: foundAlbum,
    });
  } else {
    res.status(StatusCodes.NOT_FOUND).json({
      message: ReasonPhrases.NOT_FOUND,
    });
  }
};

exports.getAlbumByName = async (req, res) => {
  const nameParam = req.params.user;
  const title =req.params.title
  const foundAlbum = await Album.find({ user: nameParam });
  if (foundAlbum) {
    res.status(StatusCodes.OK).json({
      message: ReasonPhrases.OK,
      data: foundAlbum.filter(album => album.name.toString().toLowerCase().includes(title.toString().toLowerCase()))
    });
  } else {
    res.status(StatusCodes.NOT_FOUND).json({
      message: ReasonPhrases.NOT_FOUND,
    });
  }
};

exports.deleteAlbum = async (req, res) => {
  const idu = mongoose.Types.ObjectId(req.params.id);
  if (idu) {
    const foundAlbum = await Album.findByIdAndRemove(idu);
    if (foundAlbum) {
      res.status(StatusCodes.OK).json({
        message: ReasonPhrases.OK,
      });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({
        message: ReasonPhrases.NOT_FOUND,
      });
    }
  } else {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: ReasonPhrases.BAD_REQUEST });
  }
};

exports.updateAlbum = async (req, res) => {
  console.log(req.params.id);
  const idu = mongoose.Types.ObjectId(req.params.id);
  const newu = req.body;
  const options = { new: true };
  const foundAlbum = (await Album.findByIdAndUpdate(idu, newu, options))
    ? res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK })
    : res.status(StatusCodes.NOT_FOUND).json({
        message: ReasonPhrases.NOT_FOUND,
      });
};
