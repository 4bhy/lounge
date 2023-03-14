const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Host = require('../models/hostModel')
const Hotel = require('../models/hotelModel');
const Coupon = require("../models/couponModel");
module.exports = {
    listUsers: asyncHandler(async (req, res) => {
        console.log("2");
        const users = await User.find()
        res.json(users)
    }),

    listHosts: asyncHandler(async (req, res) => {
        console.log("33");
        const hosts = await Host.find()
        res.json(hosts)
    }),

    listHotels: asyncHandler(async (req, res) => {
        const hosts = await Hotel.find()
        res.json(hosts)
    }),

    listApprovals: asyncHandler(async (req, res) => {
        try {
            console.log("44");
            const hotels = await Hotel.find()
            const hosts = await Host.find()

            if (hotels && hosts) {

                res.status(201).json({ hosts, hotels })
            } else {

            }
        } catch (error) {

            res.status(404)
            throw new Error("Not Found")
        }

    }),

    handleUser: asyncHandler(async (req, res) => {
        const user = await User.findById(req.params.id)

        if (user) {
            user.blocked = req.body.blocked;
            const updatedUser = await user.save()
            if (updatedUser) {
                res.status(201).json({
                    _id: updatedUser._id,
                    name: updatedUser.name,
                    isAdmin: updatedUser.isAdmin,
                    blocked: updatedUser.blocked,
                });
            }
        } else {
            res.status(404)
            throw new Error("User not found!!");
        }
    }),

    handleHost: asyncHandler(async (req, res) => {

        const host = await Host.findById(req.params.id)
        const hotel = await Hotel.findOne({ hostID: host.userId })
        if (host) {
            host.blocked = req.body.blocked;
            const updatedHost = await host.save()

            if (updatedHost) {
                res.status(201).json({
                    host,
                    hotel

                });
            }
        } else {
            res.status(404)
            throw new Error("User not found!!");
        }
    }),

    viewHostDetails: asyncHandler(async (req, res) => {

        const host = await Host.findById(req.params.id)
        const hotel = await Hotel.find({ hostID: host._id })
        if (host) {
            res.status(201).json({
                host,
                hotel
            })
        } else {
            res.status(404)
            throw new Error("User not found!")
        }
    }),

    handleHotels: asyncHandler(async (req, res) => {

        const hotel = await Hotel.findById(req.params.id)

        if (hotel) {
            if (req.body.status == "true") {
                hotel.isApproved = "false";
            } else {
                hotel.isApproved = "true"
            }
            const updatedHotel = await hotel.save()

            if (updatedHotel) {
                res.status(201).json({
                    _id: updatedHotel._id,
                    pname: updatedHotel.pname,
                    city: updatedHotel.city,
                    isApproved: updatedHotel.isApproved,
                });
            }
        } else {
            res.status(404)
            throw new Error("Hotel not found!!");
        }
    }),

    viewHostProperty: asyncHandler(async (req, res) => {

        try {

            res.json({ message: "testing..." })
        } catch (error) {
            console.log(error);
        }
        //  console.log(req.body.id);
        //     const property = await Hotel.find({ hostID: req.body.id})
        //     console.log("property:", property);
        //     if (property) {
        //         res.status(201).json({
        //             property
        //         })
        //     } else {
        //         res.status(404)
        //         throw new Error("Property not found")
        //     }
    }),

    handleApproval: asyncHandler(async (req, res) => {
        console.log("RrrR");
        try {
            const hostData = await Host.findById({ _id: req.body.id })
            hostData.isApproved = true;
            const host = await hostData.save()

            res.status(201).json({ message: "201" })
        } catch (error) {
            res.status(404)
            throw new Error("Failed")
        }
    }),

    hotelApproval: asyncHandler(async (req, res) => {

        try {
            const hotelData = await Hotel.findOne({ _id: req.params.id })
            hotelData.isApproved = "true";
            const hotel = await hotelData.save();
            console.log(hotel);
            if (hotel) {
                res.status(201).json({ messsage: "Success" })
            }
        } catch (error) {
            res.status(404)
            throw new Error("Failed to update info")

        }

    }),

    getCoupons: asyncHandler(async (req, res) => {
        try {
            const coupons = await Coupon.find()
            if (coupons) {
                res.status(201).json({ coupons })
            }
        } catch (error) {
            console.error();
            res.status(404).json({ message: "Failed to list coupons" })
            throw new Error("Failed to list coupons")
        }

    }),

    addCoupon: asyncHandler(async (req, res) => {
        try {
            console.log(req.body);
            const find = await Coupon.findOne({ couponName: req.body.cname })
            if (find) {
                console.log(find);
                res.status(404).json({ message: "Copoun already exists!" })
            } else {
                console.log("201");
                const couponData = await Coupon.create({
                    couponName: req.body.cname,
                    validFrom: req.body.vfrom,
                    validTo: req.body.vto,
                    discount: req.body.discount
                })
                console.log(couponData);
                res.status(201).json({couponData})
            }
        } catch (error) {
            console.log("catch");
            console.log(error);
            res.status(404).json({ message: "Failed to add coupon" })
            throw new Error("Failed to add Coupon")
        }
    })
}
