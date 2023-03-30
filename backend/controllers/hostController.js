const Host = require("../models/hostModel");
const User = require("../models/userModel")
const mongoose = require('mongoose');
const Hotel = require('../models/hotelModel')
const Booking = require('../models/bookingModel')
const asyncHandler = require("express-async-handler");
const generateToken = require('../utils/generateToken');


module.exports = {
    registerHost: (async (req, res) => {

        const { fname, lname, newid, zip, id, email,
            dob, phone, address, apart, cstate, idState, url } = req.body;

        console.log(newid);

        const hostExists = await Host.findOne({ hostId: newid })
        if (hostExists) {
            res.status(400).json({
                message: "Account Already Exists"
            })
            throw new Error("Account Already Exists");
        }

        const host = await Host.create({
            fname,
            lname,
            email: email,
            id,
            zip,
            dob,
            phone,
            address,
            apart,
            cstate,
            idState,
            URL: url
        });

        const userInfo = await User.find({ _id: newid })

        userInfo.role = 'Host';

        if (mongoose.Types.ObjectId.isValid(newid)) {

            host.userId = newid;
            await host.save();
        }


        if (host) {
            res.status(201).json({
                _id: host._id,
                fname: host.fname,
                lname: host.lname,
                zip: host.zip,
                hostAccess: host.hostAccess,
                token: generateToken(host._id)
            })
        } else {
            res.status(400);
            throw new Error("Error Occured")
        }
    }),

    addProperty: asyncHandler(async (req, res) => {
        try {

            const { pname, pstate, city, pin, description, hostID, url, type, value, amenities } = req.body;

            const hotel = await Hotel.create({
                pname: pname,
                pstate: pstate,
                city: city,
                pin: pin,
                description: description,
                hostID: hostID,
                pic: url,
                type: type,
                rooms: value,
                amenities: amenities
            })
            const hotelInfo = await hotel.save();
            if (hotelInfo) {
                console.log("info");
            }
            res.status(201).json({
                hostId: hotel.hostId
            })

        } catch (error) {
            res.status(404)
            throw new Error("Error while adding Hotels")
        }

    }),


    bookingsHost: asyncHandler(async (req, res) => {

        try {
            const bookingData = await Booking.find({ hostId: req.params.id }).populate('propertyId').populate('userId')

            if (bookingData) {
                res.status(201).json({
                    bookingData
                })
            }
        } catch (error) {
            throw new Error("Something went wrong!")
        }

    }),

    handleBooking: asyncHandler(async (req, res) => {
        try {

            console.log(req.params.id);
            const bookingData = await Booking.findById({ _id: req.params.id })
            bookingData.status = "Approved"
            const newdata = await bookingData.save()
            if (newdata) {
                res.status(201).json({
                    message: "Booking Approved!"
                })
            }
        } catch (error) {
            console.log(error.message);
            throw new Error("Something went wrong!")
        }
    }),

    approveCancellation: asyncHandler(async (req, res) => {
        try {
            const bookingData = await Booking.findById({ _id: req.body.id })
            bookingData.status = "Cancelled"
            const data = await bookingData.save()
            if (data) {
                res.status(201).json({ message: "Sucesss" })
            }
        } catch (error) {
            console.log(error);
            throw new Error("Cancelling booking failed!")
        }
    }),

    listingHostProperties: asyncHandler(async (req, res) => {
        try {
            const hostProperties = await Hotel.find({ hostID: req.params.id })
            if (hostProperties) {
                res.status(201).json({ hostProperties })
            } else {
                res.status(404).json({ message: "No Properites to Display" })
            }
        } catch (error) {
            console.log(error);
            throw new Error("Cant find properties!")
        }
    }),

    getReport: asyncHandler(async (req, res) => {
        try {
            console.log("in");
            const bookings = await Booking.find({
                hostId: req.params.id,
                isCancelled: "false"
            }).populate('propertyId');

            const earningsByProperty = {};

            for (let i = 0; i < bookings.length; i++) {
                const booking = bookings[i];
                const property = booking.propertyId;
                const amount = parseFloat(booking.amount);
                if (!earningsByProperty[property.pname]) {
                    earningsByProperty[property.pname] = 0;
                }
                earningsByProperty[property.pname] += amount;
            }

            const report = [];

            for (let pname in earningsByProperty) {
                report.push({
                    pname: pname,
                    totalAmount: earningsByProperty[pname]
                });
            }

            Booking.find({ hostId: req.params.id, isCancelled: "false" })
                .exec(function (err, bookings) {
                    if (err) {
                        console.log(err);
                    } else {
                        // Map the bookings to an array of objects that contain the hotel information and booking amount
                        const bookingsByHotel = bookings.map(function (booking) {
                            return {
                                hotel: booking.propertyId,
                                amount: parseFloat(booking.amount)
                            };
                        });

                        // Reduce the array of bookings by hotel, calculating the total earnings and total number of bookings for the host
                        const totals = bookingsByHotel.reduce(function (totals, booking) {
                            const hotelId = booking.hotel._id;

                            // Calculate the total earnings for the host
                            totals.earnings += booking.amount;

                            // Calculate the total number of bookings for each hotel
                            if (!totals.bookings[hotelId]) {
                                totals.bookings[hotelId] = 0;
                            }
                            totals.bookings[hotelId] += 1;

                            return totals;
                        }, { earnings: 0, bookings: {} });
                        if(report && totals)
                            res.status(201).json({ report: report, totals:totals })
            
                    }
                });

        } catch (error) {
            console.log(error);
        }
    }),

    getCardStats: asyncHandler(async (req, res) => {
        try {

        } catch (error) {
            console.log(error);
        }
    })


}