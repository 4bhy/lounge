const express = require("express")

const { registerHost, addProperty, bookingsHost, handleBooking } = require("../controllers/hostController")

const router = express.Router()

router.route("/register").post(registerHost);

router.post("/add-property", addProperty)

router.get("/list-bookings/:id", bookingsHost)
router.get("/handle-booking/:id", handleBooking)

module.exports = router

