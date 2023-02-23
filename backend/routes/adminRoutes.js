const express = require("express");
// const { listHotel } = require("../../frontend/src/actions/adminActions");
const {listUsers, listHosts, handleUser, handleHost, handleHotels,listHotels, viewHostDetails, viewHostProperty}= require('../controllers/adminController')
const router = express.Router();

router.get('/listusers', listUsers)
router.get('/listhosts', listHosts)
router.get('/listhotels', listHotels)
router.get('/view-hosts/:id', viewHostDetails)
router.post('/handleuser/:id', handleUser)
router.post('/handlehost/:id', handleHost)
router.post('/handlehotels/:id', handleHotels)
router.post('/view-property ', viewHostProperty)

module.exports = router;
