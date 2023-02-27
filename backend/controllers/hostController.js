const Host = require("../models/hostModel");
const User = require("../models/userModel")
const mongoose = require('mongoose');
const Hotel = require('../models/hotelModel')

const asyncHandler = require("express-async-handler");
const generateToken = require('../utils/generateToken')

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
            email:email,
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

        const userInfo = await User.find({ _id: newid})

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
            if(hotelInfo){
                console.log("info");
            }
            res.status(201).json({
                hostId: hotel.hostId
            })

        } catch (error) {
            res.status(404)
            throw new Error("Error while adding Hotels")
        }

    })
}