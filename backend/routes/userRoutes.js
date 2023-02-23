const express=require("express")
const {registerUser, authUser, viewIndividualProperty}= require('../controllers/userController')

const router= express.Router()

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.get("/individual-property/:id", viewIndividualProperty )


module.exports=router