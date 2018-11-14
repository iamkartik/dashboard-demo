/**
 * This file contains all the routes that the app is exposing
 */
const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const mainController = require('../controllers/mainController');

// to test the server and db connection
router.get('/heartbeat',);

// login ,logout routes
router.post('/login',authController.login);
router.get('/logout',authController.logout);
// to check if the session has been maintained
router.get('/user/current',authController.currentUser);

// analytics api's , checking if the user is logged in using isLoggedIn middleware
// before proceeding to db
 
router.get('/analytics/country/sum',authController.isLoggedIn,mainController.getCountrySum);

router.get('/analytics/total/:area/:no',authController.isLoggedIn,mainController.getTotalData);

router.get('/analytics/agg/:main/:sub/:no',authController.isLoggedIn,mainController.getAggregateData);

module.exports=router;
