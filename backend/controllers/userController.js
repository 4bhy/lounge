const User = require("../models/userModel");
const Host = require("../models/hostModel")
const Hotel = require("../models/hotelModel")
const generateToken = require("../utils/generateToken");

module.exports = {
  registerUser: (async (req, res) => {

    const { name, email, password, phoneNumber } = req.body;

    const userExists = await User.findOne({ phoneNumber: phoneNumber });

    if (userExists) {
      res.status(400);
      throw new Error("User Already exists");
    }

    const user = await User.create({
      name,
      email,
      password,
      phoneNumber
    });
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        blocked: user.blocked,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Error Occured!");
    }
  }),

  authUser: (async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const host = await Host.findOne({
      userId: user._id
    })
    console.log(host, "host");
    if (user && (await user.matchPassword(password))) {
      if (user.blocked) {
        res.status(403);
        throw new Error("You are blocked by the admin");
      }
      res.json({
        user, host
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  }),

  viewIndividualProperty: (async (req, res) => {

    try {
      const propertyInfo = await Hotel.findById({ _id: req.params.id })
      console.log("propertyInfo", propertyInfo);
      if (propertyInfo) {
        res.status(201).json({
          propertyInfo
        })
      } else {
        res.status(401);
        throw new Error("Property Not Found");
      }
    } catch (error) {
      console.log(error.message);
    }

  })


}