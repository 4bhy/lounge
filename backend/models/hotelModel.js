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
    },
    isApproved: {
        type: String,
        default: false
    },
    booking: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        bookedAt: {
            type: Date,
            immutable: true,
            default: () => Date.now()
        },
        checkIn: {
            type: Date,
        },
        checkOut: {
            type: Date,
        },
        guests: {
            type: Number
        }
    }],
    // reviews: [{
    //     user: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'User'
    //     },
    //     title: {
    //         type: String
    //     },
    //     description: {
    //         type: String
    //     },
    //     createdAt: {
    //         type: Date,
    //         immutable: true,
    //         default: () => Date.now()
    //     }
    // }]
},

    {
        timestamps: true
    })

const Hotel = mongoose.model("Hotel", hotelSchema)

module.exports = Hotel