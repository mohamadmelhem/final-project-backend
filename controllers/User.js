import user from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
/**
 * @description user sign up
 * @param {Object} req.body
 */
const createUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      userName,
      email,
      phone,
      
      preferredAirlines,
      preferredDestinations,
    } = req.body;
    let newUser;
    if (req.body.password) {
      let hashed = await bcrypt.hashSync(req.body.password, 10);
      newUser = new user({
        firstName,
        lastName,
        email,
        userName,
        phone,
        password: hashed,
        preferredAirlines,
        preferredDestinations,
      });
    } else {
      newUser = new user({
        firstName,
        lastName,
        email,
        userName,
        phone,
        preferredAirlines,
        preferredDestinations,
      });
    }
    await newUser.save();
    res.status(201).send({ success: true, message: "User added successfully" });
  } catch (error) {
    console.log(error);
    res.status(410).send({
      error: true,
      message: "There is a problem with Saving the data",
      data: error,
    });
  }
};

/**
 * @description update user information by id
 * @param {String} req.params.id
 * @param {Object} req.body
 */
const updateUserById = async (req, res) => {
  try {
    let updatedUser = await user.updateOne(
      { _id: req.params.ID },
      { $set: req.body },
      {
        runValidators: true,
      }
    );
    res.status(200).send({ success: true, message: "user data updated" });
  } catch (error) {
    res.status(412).send({
      error: true,
      message: "There was a problem updating the data",
      data: error,
    });
  }
};

/**
 * @description delete user by id
 * @param {String} req.params.id
 */
const deleteUserById = async (req, res) => {
  try {
    await user.findByIdAndDelete({ _id: req.params.ID }).then(
      function (response) {
        res
          .status(200)
          .send({ success: true, message: "User deleted successfully" });
      },
      function (reject) {
        res.status(412).send({
          error: true,
          message: "There was a problem deleting this user",
          data: reject,
        });
      }
    );
  } catch (error) {
    res.status(412).send({
      error: true,
      message: "There was a problem delete the user",
      data: error,
    });
  }
};

/**
 * @description get all users
 */
const getAllUser = async (req, res) => {
  try {
    await user.find({}).then(
      function (response) {
        res.status(200).send({
          success: true,
          message: "Users data retrieved Successfully",
          data: response,
        });
      },
      function (reject) {
        res.status(412).send({
          error: true,
          message: "There was a problem getting the users data",
          data: reject,
        });
      }
    );
  } catch (error) {
    res.status(412).send({
      error: true,
      message: "There was a problem getting the users data",
      data: error,
    });
  }
};
/**
 * @description get one user by id
 * @param {string} req.params.ID
 */
const getUserByParam = async (req, res) => {
  try {
    user.find({ _id: req.params.ID }).then(
      function (response) {
        res.status(200).send({
          success: true,
          message: "User data retrieved Successfully",
          data: response,
        });
      },
      function (reject) {
        res.status(412).send({
          error: true,
          message: "There was a problem getting the user data",
          data: reject,
        });
      }
    );
  } catch (error) {
    res.status(412).send({
      error: true,
      message: "There was a problem getting the users data",
    });
  }
};
/**
 * @description get one user by id
 * @param {Object} req.body
 */
export default {
    createUser,
    updateUserById,
    deleteUserById,
    getAllUser,
    getUserByParam,
  };
  