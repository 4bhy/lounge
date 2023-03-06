const User = require("../models/userModel");
const Host = require("../models/hostModel")
const Hotel = require("../models/hotelModel")
const Booking = require("../models/bookingModel")
const asyncHandler = require("express-async-handler");

const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const nodemailer = require("nodemailer");

const stripe = require("stripe")("sk_test_51MgPNUSGJWduBmwsIEtRsvDlhdzrn4QsCkDNNVxtjz2PIml545V5ZnfDHITtZC1tPMl7S0o73tGNq3S5ysbNmRNG00JE20Fofi")


module.exports = {
  registerUser: (async (req, res) => {

    const { name, email, password, phoneNumber } = req.body;

    const userExists = await User.findOne({ email: email });

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
      throw new Error("Invalid Email or Password");
    }
  })),

  viewIndividualProperty: (async (req, res) => {

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
        to: "jokerhap9444@gmail.com", // list of receivers
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


      if (!userData) {
        res.status(404).json("Invalid Email")
      } else {
        console.log("11");
        userData.password = password;
        const user = await userData.save();
        console.log(user);
        if (user) {
          res.status(201).json({ user, host })
        }
      }

    } catch (error) {
      console.log(error.message);
    }

  }),

  payment: asyncHandler(async (req, res) => {
    const { amount, id, userInfo, propertyData, checkIn, checkOut, guests, totalPrice } = req.body;
    console.log(amount);
    console.log(propertyData.hostID);
    const hid = propertyData.hostID;

    try {
      const booking = await Booking.create({
        userId: userInfo._id,
        payment: id,
        propertyId: propertyData._id,
        hostId: propertyData.hostID,
        amount,
        guests: guests,
        checkIn: checkIn,
        checkOut: checkOut,
        status: "Pending",
        invoice: Math.floor((Math.random() * 1000) + 1)
      })
      await booking.save();
      const payment = await stripe.paymentIntents.create({
        amount,
        currency: "USD",
        description: "Hotel Booking",
        payment_method: id,
        confirm: true
      })
      console.log("Payment", payment)
      res.status(201).json({
        message: "Payment successful",
        success: true
      })
    } catch (error) {
      console.log("Error", error)
      res.json({
        message: "Payment failed",
        success: false
      })
    }
  }),



  bookings: asyncHandler(async (req, res) => {

    try {
      const bookingData = await Booking.find({ userId: req.params.id }).populate('propertyId')

      if (bookingData) {
        res.status(201).json({
          bookingData
        })
      }
    } catch (error) {
      throw new Error("Something went wrong!")
    }

  }),

  cancelBooking: asyncHandler(async (req, res) => {
    try {
      console.log("3454");
      const bookingData = await Booking.findById({ _id: req.params.id })

      bookingData.isCancelled = "true";
      const newData = await bookingData.save()
      if (newData) {
        res.status(201).json({
          title: "Cancellation Requested!",
          message: "You'll be notified soon!"
        })
      }
    } catch (error) {
      console.log(error.message);
      res.status(401).json({
        title: "Cancellation Failed",
        message: "Please try again after some time"

      })
    }
  }),

  submitReview: asyncHandler(async (req, res) => {
    try {

      const { uid, pid, title, review, rating } = req.body;
      console.log(req.body);
      const propertyData = await Hotel.findById({ _id: pid })

      const reviews = {
        user: uid,
        title: title,
        rating: rating,
        description: review
      }
      await propertyData.reviews.push(reviews)

      await propertyData.save()

      const length = propertyData.reviews.length;
      console.log(rating, "rating");
      console.log(length, "length");
      console.log(propertyData.averageRating, "before")
      propertyData.averageRating = (propertyData.averageRating+rating) / length;
      console.log(propertyData.averageRating, "avg")
      const data = await propertyData.save()
      if (data) {
        res.status(201).json({ message: "Review Submitted" })
      }
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: "Submitting Review Failed!" })
      throw new Error("Submitting Review Failed!")
    }

  })

}