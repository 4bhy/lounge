const mongoose = require('mongoose')

const bookingSchema = mongoose.Schema(
    {
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    payment: {
        type: String
    },
    status: {
        type: String,
        deafult: 'Pending',
        required:true
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
    propertyId: {
        type: mongoose.Types.ObjectId,
        ref: 'Hotel'
    },
    totalprice: {
        type: Number
    },
    guests: {
        type: Number,
    },
    checkIn:{
        type:String
    },
    checkOut:{
        type:String
    }
}
);

const Booking = mongoose.model('Booking', bookingSchema);

module.exports= Booking