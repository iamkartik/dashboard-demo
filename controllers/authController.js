const passport = require('passport');
const models = require('../models');

exports.login = (req,res,next)=>{
    passport.authenticate('local',function(err,user,message){
        // error while retriving data 
        if(err){
            return res.status(500).send({err})
        }
        // incorrect username/password
        if(!user){
           return res.send({err:message})
        }
        // login into session
        req.login(user,function(err){
            if(err){
                return res.send({err:'Something broke we are working to fix it'});
            }
            // all ok send name, username in response
            return res.send({username:user.username,name:user.name});
        });
    })(req,res,next);
};


exports.logout=(req,res)=>{
    req.logout();
    res.send({auth:false})
}

exports.isLoggedIn = (req,res,next)=>{
    if(req.isAuthenticated()){
        next();
        return;
    }
    res.status(401).send({auth:false,err:'You must be logged in to view the data'});
}

exports.currentUser = (req,res)=>{
    if(req.user){
        res.send(req.user);
    }else{
        res.send({err:'Not logged in'});
    }
}