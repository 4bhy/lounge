const mongoose = require('mongoose')

const hotelSchema = mongoose.Schema({
    pname: {
        type: String,
    },
    pic: [

    ],
    pstate: {
        type: String,
    },
    pin: {
        type: String,
    },
    description: {
        type: String,
    },
    city: {
        type: String
    },
    hostID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Host'
    },
    type: {
        type: String
    },
    blocked: {
        type: Boolean,
        default: true
    },
    amenities: [

    ],
    rooms: {
        type: String
    }
},
    {
        timestamps: true
    })

const Hotel = mongoose.model("Hotel", hotelSchema)

module.exports = Hotel