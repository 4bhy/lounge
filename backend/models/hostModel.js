const mongoose = require('mongoose')

const hostSchema = mongoose.Schema(
    {
        fname: {
            type: String,
        },
        lname: {
            type: String,
        },
        blocked: {
            type: Boolean,
            default: false
        },
        phone: {
            type: Number
        },
        address: {
            street: {
                type: String
            },
            apart: {
                type: String,
            },
            zip: {
                type: Number
            },
            cstate: {
                type: String
            }
        },
        dob: {
            type: Date
        },
        idState: {
            type: String
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users'
        },
        hostAccess:{
            type:Boolean,
            default:false
        },
        URL:{
            type:String
        },
        avatar:{
            type:String,
            default:"https://img.freepik.com/free-icon/user_318-219673.jpg"
        }

    },
    {
        timestamps: true
    }
);

const Host = mongoose.model("Host", hostSchema)

module.exports = Host