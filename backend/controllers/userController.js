const User = require("../models/userModel");
const Host = require("../models/hostModel")
const Hotel = require("../models/hotelModel")
const asyncHandler = require("express-async-handler");

const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const nodemailer = require("nodemailer");

module.exports = {
  registerUser: (async (req, res) => {
    console.log("please");
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

  authUser: asyncHandler((async (req, res) => {
  
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const host = await Host.findOne({
      userId: user._id
    })

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
  })),

  viewIndividualProperty: (async (req, res) => {
    console.log("666");
    try {
      const propertyInfo = await Hotel.findById({ _id: req.params.id })

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

  }),

  getForgotPasswordLink: (async (req, res) => {

  console.log(req.body.email, "44");
    const { email } = req.body;
 
    try {

      const oldUser = await User.findOne({ email });
      if (!oldUser) {
        return res.status(404).json({ status: "User Not Exists!!" });
      }
      const token = await generateToken(oldUser._id);
      const link = `http://localhost:3000/reset-password/${oldUser._id}/${token}`;

      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "abhy.r010@gmail.com",
          pass: "vrphagtstthsdtda",
        },
      });


      let info = await transporter.sendMail({
        from: 'abhy.r010@gmail.com', // sender address
        to: "marshallmathers1522@gmail.com", // list of receivers
        subject: "Password Reset", // Subject line
        html: link, // html body
      });

      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));


    } catch (error) {
      console.log("2");
      console.log(error.message);
    }

  }),

  resetPassword: (async (req, res) => {

    try {

      const { email, password } = req.body;
      console.log(password);
      const userData = await User.findOne({ email })
      const host = await Host.findOne({ userId: userData._id })
        console.log(userData);
        console.log(host);
      if (!userData) {
        res.status(404).json("Invalid Email")
      } else {
       
        const newPassword= await bcrypt.hash(password, 10);
        console.log("11");
        userData.password = newPassword;
        const user = await userData.save();
        console.log(user);
        if (user) {
          res.status(201).json({ user, host })
        }
      }

    } catch (error) {
      console.log(error.message);
    }

  })


}