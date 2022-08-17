const { ReasonPhrases, StatusCodes } = require("http-status-codes");
const Album = require("./../Models/albumModel");
const e = require("express");
const { default: mongoose } = require("mongoose");



exports.createAlbum = async (req, res) => {
  if (!req.user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: ReasonPhrases.UNAUTHORIZED });
  }
  try {
    const album = await new Album(req.body);
    album.save();
    return res
      .status(StatusCodes.CREATED)
      .json({ message: ReasonPhrases.CREATED });
  } catch (error) {
    console.log("as", error);
  }

}

exports.showAlbums = async (req, res) => {
  if (!req.user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: ReasonPhrases.UNAUTHORIZED });
  }
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
  try {
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
  } catch (error) {
     return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: ReasonPhrases.NOT_FOUND });
  }
  
};

exports.getAlbumByName = async (req, res) => {
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


exports.deleteAlbum = async (req, res) => {
  if (!req.user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: ReasonPhrases.UNAUTHORIZED });
  }
  const idu = mongoose.Types.ObjectId(req.params.id);
  const foundAlbum = await Album.findByIdAndRemove(idu);
  if (foundAlbum) {
    return res.status(StatusCodes.OK).json({
      message: ReasonPhrases.OK,
    });
  } else {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: ReasonPhrases.NOT_FOUND,
    });
  }
};

exports.updateAlbum = async (req, res) => {;
  if (!req.user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: ReasonPhrases.UNAUTHORIZED });
  }
  const idu = mongoose.Types.ObjectId(req.params.id);
  const newu = req.body;
  const options = { new: true };
  const foundAlbum = (await Album.findByIdAndUpdate(idu, newu, options))
    ? res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK })
    : res.status(StatusCodes.NOT_FOUND).json({
        message: ReasonPhrases.NOT_FOUND,
      });
};
