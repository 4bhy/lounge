const express=require("express")
const {registerUser, authUser, viewIndividualProperty, getForgotPasswordLink, resetPassword, payment, bookings, cancelBooking, submitReview}= require('../controllers/userController')

const router= express.Router()

router.get("/individual-property/:id", viewIndividualProperty )
router.get("/list-bookings/:id", bookings )
router.get("/cancel-booking/:id", cancelBooking )
router.post("/get-link", getForgotPasswordLink)
router.post("/reset-password", resetPassword)
router.post("/payment", payment)
router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.post("/submit-review", submitReview)

module.exports=router