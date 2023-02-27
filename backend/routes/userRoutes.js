const express=require("express")
const {registerUser, authUser, viewIndividualProperty, getForgotPasswordLink, resetPassword}= require('../controllers/userController')

const router= express.Router()

router.get("/individual-property/:id", viewIndividualProperty )
router.post("/get-link", getForgotPasswordLink)
router.post("/reset-password", resetPassword)
router.route("/").post(registerUser);
router.route("/login").post(authUser);

module.exports=router