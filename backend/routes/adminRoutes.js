const express = require("express");

const {listUsers, listHosts, handleUser, handleHost, handleHotels,listHotels, viewHostDetails, viewHostProperty, listApprovals, handleApproval, hotelApproval, getCoupons, addCoupon, statsLoader}= require('../controllers/adminController');
const adminProtect = require("../middlewares/adminAuth");
const router = express.Router();

router.get('/listusers',adminProtect, listUsers)
router.get('/listhosts',adminProtect, listHosts)
router.get('/list-approvals',adminProtect, listApprovals)
router.get('/listhotels',adminProtect, listHotels)
router.get('/view-hosts/:id',adminProtect, viewHostDetails)
router.post('/handleuser/:id',adminProtect, handleUser)
router.post('/handlehost/:id',adminProtect, handleHost)
router.post('/handlehotels/:id',adminProtect, handleHotels)
router.post('/view-property ',adminProtect, viewHostProperty) 
router.post('/handle-approval',adminProtect, handleApproval)
router.get('/hotel-approval/:id',adminProtect, hotelApproval)
router.get('/get-coupons',adminProtect, getCoupons)
router.post('/add-coupon',adminProtect, addCoupon)
router.get('/get-stats',adminProtect, statsLoader)

module.exports = router;
