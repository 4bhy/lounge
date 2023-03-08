const express = require("express");

const {listUsers, listHosts, handleUser, handleHost, handleHotels,listHotels, viewHostDetails, viewHostProperty, listApprovals, handleApproval, hotelApproval, getCoupons, addCoupon}= require('../controllers/adminController')
const router = express.Router();

router.get('/listusers', listUsers)
router.get('/listhosts', listHosts)
router.get('/list-approvals', listApprovals)
router.get('/listhotels', listHotels)
router.get('/view-hosts/:id', viewHostDetails)
router.post('/handleuser/:id', handleUser)
router.post('/handlehost/:id', handleHost)
router.post('/handlehotels/:id', handleHotels)
router.post('/view-property ', viewHostProperty)
router.post('/handle-approval', handleApproval)
router.get('/hotel-approval/:id', hotelApproval)
router.get('/get-coupons', getCoupons)
router.post('/add-coupon', addCoupon)

module.exports = router;
