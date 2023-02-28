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
            Type: mongoose.Schema.Types.ObjectId
        },
        bookedAt:{  
            type:Date,
            immutable:true,
            default:()=>Date.now()
        },
        checkIn:{
            type:Date,  
        },
        checkOut:{
            type:Date,  
        },
        guests:{
            type:Number
        }
    }]

},
    {
        timestamps: true
    })

const Hotel = mongoose.model("Hotel", hotelSchema)

module.exports = Hotel