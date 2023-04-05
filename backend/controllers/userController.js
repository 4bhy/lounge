const User = require("../models/userModel");
const Host = require("../models/hostModel")
const Hotel = require("../models/hotelModel")
const Booking = require("../models/bookingModel")
const Coupon = require("../models/couponModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const nodemailer = require("nodemailer");

require('dotenv').config();
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

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
        user:user
      });
    } else {
      res.status(400);
      throw new Error("Error Occured!");
    }
  }),

  authUser: asyncHandler((async (req, res) => {

    //sanitize input, no sql injection
    //remive sppcl caharacters, use regex, node sanitize module
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const host = await Host.findOne({
      userId: user._id
    })
    const token = generateToken(user._id);


    if (user && (await user.matchPassword(password))) {
      if (user.blocked) {
        res.status(403).json({ message: "" });

        throw new Error("You are blocked by the admin");
      }
      user.token = generateToken(user._id);

      res.json({
        user, host, token
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
      const token = await generateToken(oldUser._id)
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
    const { amount, id, userInfo, propertyData, checkIn, checkOut, guests, totalPrice, couponId } = req.body;
    console.log(couponId);
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
        status: "Approved",
        invoice: Math.floor((Math.random() * 1000) + 1)
      })
      await booking.save();

      if (couponId) {
        const couponData = await Coupon.findById({ _id: couponId })
        couponData.usedBy.push(userInfo._id)
        console.log(couponData);
      }
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
      const bookingData = await Booking.find({ userId: req.params.id }).sort({
        createdAt: -1
      }).populate('propertyId')

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

      const propertyData = await Hotel.findById({ _id: pid })

      const reviews = {
        user: uid,
        title: title,
        rating: rating,
        description: review
      }
      await propertyData.reviews.push(reviews)
      propertyData.totalRatings += rating;
      await propertyData.save()

      const length = propertyData.reviews.length;
      propertyData.averageRating = Math.round(((propertyData.totalRatings) / length) * 2) / 2;

      const data = await propertyData.save()
      if (data) {
        res.status(201).json({ message: "Review Submitted" })
      } else {
        throw new Error("Failed to submit review")
      }
    } catch (error) {
      console.log(error);
      res.status(404).json({ error })
    }

  }),

  editProfile: asyncHandler(async (req, res) => {
    try {
      const id = req.user._id;
      const { name, email, phone, password } = req.body
      const userData = await User.findById({ _id: id })
      userData.name = name;
      userData.phone = phone;
      userData.email = email;
      if (req.body.password != null) {
        userData.password = password;
      }
      const user = await userData.save()
      const host = await Host.findOne({
        userId: user._id
      })
      console.log(user);
      const token = generateToken(user._id)
      if (user || host) {
        res.status(201).json({ user, host, token })
      } else {
        throw new Error("Failed to update details")
      }
    } catch (error) {
      console.log(error);
      res.status(404).json({ error })
    }
  }),

  checkAvailability: asyncHandler(async (req, res) => {
    try {
      const bookingData = await Booking.find({ propertyId: req.body.id })

      const bookingDates = bookingData.map(booking => [booking.checkIn, booking.checkOut]);
      function expandDateRange(checkIn, checkOut) {
        if (!(checkIn instanceof Date)) {
          checkIn = new Date(checkIn);
        }
        if (!(checkOut instanceof Date)) {
          checkOut = new Date(checkOut);
        }
        const expandedRange = [];
        let currentDate = new Date(checkIn);
        while (currentDate <= checkOut) {
          expandedRange.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + 1);
        }
        return expandedRange;
      }

      const expandedRange = expandDateRange(req.body.checkIn, req.body.checkOut)

      if (expandedRange) {
        const isAvailable = expandedRange.some((date) => {
          return bookingDates.some((booking) => {
            const checkIn = booking[0];
            const checkOut = booking[1];
            return date >= checkIn && date < checkOut;
          });
        });

        if (isAvailable) {
          throw new Error("The date is already booked!")
        } else {
          res.status(201).json({ message: "Available" })
        }
      } else {
        throw new Error("Something went wrong")
      }

    } catch (error) {
      console.log(error.message);
      res.status(404).json({ message: error.message })
    }
  }),

  searchBar: asyncHandler(async (req, res) => {
    try {
      
      const { location, checkIn, checkOut } = req.body
      const properties = await Hotel.find({ pstate: location });

  
      const availableProperties = await Promise.all(properties.map(async (property) => {
        const bookings = await Booking.find({ propertyId: property._id });
        const available = !bookings.some((booking) => {
          const bookedCheckIn = new Date(booking.checkIn);
          const bookedCheckOut = new Date(booking.checkOut);
          const checkInDate = new Date(checkIn);
          const checkOutDate = new Date(checkOut);
          return (
            (bookedCheckIn <= checkInDate && bookedCheckOut >= checkInDate) ||
            (bookedCheckIn <= checkOutDate && bookedCheckOut >= checkOutDate) ||
            (bookedCheckIn >= checkInDate && bookedCheckOut <= checkOutDate)
          );
        });
        if (available) {
          return property;
        }
        return null;
      }));

      const finalProperties = availableProperties.filter((property) => property !== null);
      if (finalProperties.length!=0) {
        console.log(finalProperties);
        res.status(201).json({ final: finalProperties })
      }else{
        throw new Error("Cant Find Any Properties")
      }

    } catch (error) {
      console.log(error.message);
      res.status(404).json({ message: "Can't find Any Properties" })
    }
  })

}