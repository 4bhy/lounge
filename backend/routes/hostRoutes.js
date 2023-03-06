const express = require("express")

const { registerHost, addProperty, bookingsHost, handleBooking, approveCancellation } = require("../controllers/hostController")

const router = express.Router()

router.route("/register").post(registerHost);

router.post("/add-property", addProperty)

router.get("/list-bookings/:id", bookingsHost)
router.get("/handle-booking/:id", handleBooking)
router.patch("/approve-cancellation", approveCancellation)

module.exports = router

