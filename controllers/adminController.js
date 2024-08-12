import { getAllUsers } from "./userController.js";
import Users from "../models/userModel.js";

export const createShift = (req, res) => {
  console.log("create shift");
  res.send("Good !!");
};

export const updateShift = async (req, res) => {
  
  const user = await Users.findOne({ _id: "66b8c6102fd0a2a65dfe9e69" });
  console.log("users from update shit", user);

  console.log("update shift");
  res.status(200).json({ msg: "users from update shift", user });
};

export const deleteShift = (req, res) => {
  console.log("create shift");
  res.send("Good !!");
};

export const addUser = (req, res) => {
  console.log("admin add user");
  res.send("Good !!");
};
export const deleteUser = (req, res) => {
  console.log("admin delete user");
  res.send("Good !!");
};

export const activateUser = (req, res) => {
  console.log("admin activate user");
  res.send("Good !!");
};
export const deactivateUser = (req, res) => {
  console.log("admin de-activate user");
  res.send("Good !!");
};
