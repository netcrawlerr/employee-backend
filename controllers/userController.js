import Users from "../models/userModel.js";

export const userClockIn = (req, res) => {
  console.log("Clock in");
  res.send("Good !!");
};
export const userClockOut = (req, res) => {
  console.log("Clock out");
  res.send("Good !!");
};
export const userBreak = (req, res) => {
  console.log("break");
  res.send("Good !!");
};
export const userResume = (req, res) => {
  console.log("resume");
  res.send("Good !!");
};

export const getAllUsers = async () => {
  try {
    const users = await Users.find({});
    if (users) return users;
  } catch (error) {
    console.log(error);
  }
};

// export const getSingleUser = async (email) => {
//   try {
//     const user = Users.findOne({ email: email });
//     if (user) return user;
//   } catch (error) {
//     console.log(error);
//   }
// };
