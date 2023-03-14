const express = require("express")

const { registerHost, addProperty, bookingsHost, handleBooking, approveCancellation, listingHostProperties } = require("../controllers/hostController")

const router = express.Router()

router.route("/register").post(registerHost);

router.post("/add-property", addProperty)

router.get("/list-bookings/:id", bookingsHost)
router.get("/handle-booking/:id", handleBooking)
router.patch("/approve-cancellation", approveCancellation)
router.get("/list-properties/:id", listingHostProperties)

module.exports = router

