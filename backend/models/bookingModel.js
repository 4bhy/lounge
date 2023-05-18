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
            deafult: 'Approved',
            required: true
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
        amount: {
            type: String
        },
        guests: {
            type: Number,
        },
        checkIn: {
            type: String
        },
        checkOut: {
            type: String
        },
        invoice: {
            type: Number,
        },
        hostId: {
            type: mongoose.Types.ObjectId,
            ref: 'Host'
        },
        isCancelled: {
            type: String,
            default: "false"
        }
    }
);

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking