// import bcrypt from "bcryptjs/dist/bcrypt";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import listing from "../models/listing.model.js";

export const test = (req, res) => {
  res.json({
    message: "API route is working!",
  });
};

export const updateUser = async (req, res) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "you can only update your own account"));
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updateUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
   if(req.user.id !== req.params.id) return next(errorHandler(401, 'you can only delete your owm account'))
   try {
      await User.findByIdAndDelete(req.param.id)
      res.clearCookie('access_token')
      res.status(200).json('user has been deleted!')
  } catch (error) {
    next(errorHandler(500, 'failed to delete user'));
  }
}

export const getUserListings = async (req, res, next) => {
  if (req.user.id === req.params.id){
    try{
      const listings = await listing.find({ userRef: req.params.id });
      res.status(200).json(listings);
    } catch(error){
      next(error)
    }
  } else{
    return next(errorHandler(401, "You can only view your own listings"))
  }
}