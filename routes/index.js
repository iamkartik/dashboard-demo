const express = require('express');
const router = express.Router();

const models = require('../models');
const {sequelize,Sequelize} = models;

const authController = require('../controllers/authController');
const mainController = require('../controllers/mainController');


router.get('/heartbeat',(req,res)=>{
    models.Users.findOne({
        where:{
            username:'admin'
        }
    }).then((d)=>{
        console.log('all working');
        res.send('all working');
    }).catch(err=>{
        console.log(err);
        res.status(500).send({err})
    })
    
});

router.post('/login',authController.login);
router.get('/logout',authController.logout);

router.get('/user/current',authController.currentUser);

router.get('/analytics/country/sum',authController.isLoggedIn,mainController.getCountrySum);

router.get('/analytics/total/:area/:no',authController.isLoggedIn,mainController.getTotalData);

router.get('/analytics/agg/:main/:sub/:no',authController.isLoggedIn,mainController.getAggregateData);

module.exports=router;
