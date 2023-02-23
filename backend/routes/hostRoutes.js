const express = require("express")

const { registerHost, addProperty } = require("../controllers/hostController")

const router = express.Router()

router.route("/register").post(registerHost);

router.post("/add-property", addProperty)

module.exports = router

