import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { statisticsUsers } from "./userHelpers.js";

//Desc: Fetch all admin users
//Route: GET/api/users
//Access: Private / Admin / Manager
const getUsers = asyncHandler(async (req, res) => {
  const active = await User.find({ deleted: false });
  const removed = await User.find({ deleted: true });
  const users = { active, removed };

  if (!users) {
    res.json({ users: [], statistics: {} });
    return;
  }

  const statistics = statisticsUsers(active);

  res.json({ users, statistics });
});

//Desc: Update admin user
//Route: PUT/api/users/:id/admin
//Access: Private Admin
const updateAdminUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user && !user.deleted) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.purpose = req.body.purpose || user.purpose;
    user.birthday = req.body.birthday || user.birthday;
    user.gender = req.body.gender || user.gender;
    user.testScore = +req.body.testScore === 0 ? 0 : user.testScore;
    user.coupon = req.body.coupon || user.coupon;
    user.isManager = req.body.isManager ?? user.isManager;
    user.isSupport = req.body.isSupport ?? user.isSupport;
    user.lastModified = Date.now();
    user.modifiedBy = "Admin";

    if (+user.testScore === 0) {
      user.test = {
        test1: "00",
        test2: "00",
        test3: "00",
        test4: "00",
        test5: "00",
      };
    }

    await user.save();
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//Desc: Delete user
//Route: DELETE/api/users/:id
//Access: Private Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user && !user.deleted) {
    user.deleted = true;
    await user.save();
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { getUsers, updateAdminUser, deleteUser };
