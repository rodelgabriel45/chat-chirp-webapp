import User from "../models/user.model.js";

export const getUsers = async (req, res, next) => {
  try {
    const loggedInUserId = req.user.id;

    const allUsers = await User.find({ _id: { $ne: loggedInUserId } }).select(
      "-password"
    );

    res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
};
