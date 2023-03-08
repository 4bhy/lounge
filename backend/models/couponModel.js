const mongoose = require("mongoose")

const couponSchema = mongoose.Schema({
    couponName: {
        type: String
    },
    validFrom: {
        type: Date
    },
    validTo: {
        type: Date
    },
    discount: {
        type: Number
    },
    usedBy: {
        type: [mongoose.Schema.Types.ObjectId],
        ref:'User'
      },

    status:{
        type:String,
        default:"active"
    }
})

const Coupon= mongoose.model('Coupon', couponSchema);

module.exports=Coupon