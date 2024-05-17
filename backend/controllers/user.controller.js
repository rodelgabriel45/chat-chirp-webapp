import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import validator from "email-validator";

export const getUsers = async (req, res, next) => {
  try {
    const loggedInUserId = req.user.id;

    const allUsers = await User.find({ _id: { $ne: loggedInUserId } })
      .select("-password")
      .sort({ updatedAt: -1 });

    res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id)
      return next(errorHandler(401, "You can only update your own accoun!"));

    if (req.body.username) {
      if (req.body.username.length < 6 || req.body.username.length > 12) {
        return next(
          errorHandler(400, "Username must be at between 6 and 12 characters.")
        );
      }

      if (req.body.username.includes(" "))
        return next(errorHandler(400, "Username cannot contain spaces."));
    }

    if (req.body.password) {
      if (req.body.password.length < 6) {
        return next(
          errorHandler(400, "Password must be atleast 6 characters.")
        );
      }
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    if (req.body.email) {
      const validEmail = validator.validate(req.body.email);
      if (!validEmail) {
        return next(errorHandler(400, "Please enter a valid email address."));
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    );

    const { password: pass, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const getSender = async (req, res, next) => {
  try {
    const messageId = req.params.messageId;

    const messageSender = await Message.findById(messageId).populate(
      "senderId"
    );
    if (!messageSender) return next(404, "Message not found");

    res.status(200).json(messageSender);
  } catch (error) {
    next(error);
  }
};
