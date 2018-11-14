const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const mainController = require('../controllers/mainController');


router.get('/test',(req,res)=>{
    res.send('all working');
})

router.post('/login',authController.login);
router.get('/logout',authController.logout);

router.get('/user/current',authController.currentUser);

router.get('/analytics/country/sum',authController.isLoggedIn,mainController.getCountrySum);

router.get('/analytics/total/:area/:no',authController.isLoggedIn,mainController.getTotalData);

router.get('/analytics/agg/:main/:sub/:no',authController.isLoggedIn,mainController.getAggregateData);

module.exports=router;
