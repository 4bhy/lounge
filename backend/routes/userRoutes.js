const express = require("express")
const protect = require("../middlewares/authMiddleware");
const { registerUser, authUser, viewIndividualProperty, getForgotPasswordLink, resetPassword, payment, bookings, cancelBooking, submitReview, editProfile, checkAvailability, searchBar } = require('../controllers/userController')

const router = express.Router()

router.get("/individual-property/:id", viewIndividualProperty)
router.get("/list-bookings/:id", bookings)
router.get("/cancel-booking/:id", cancelBooking)
router.post("/get-link", getForgotPasswordLink)
router.post("/reset-password", resetPassword)
router.post("/payment", payment)
router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.post("/submit-review", protect, submitReview)
router.post("/edit-profile", protect, editProfile)
router.post("/check-availability", checkAvailability)
router.post("/search-bar", searchBar)

module.exports = router