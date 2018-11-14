/**
 * This file contains the authentication parameters and strategy to 
 * login a user.
 * All the configurations for passport js are done here , and finally 
 * the exposed passport object is added inside app.js
 */
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const models = require('../models');
const bcrypt = require('bcrypt');


// using local strategy to find user with the user name
// using bcypt to compare passwords
passport.use(new LocalStrategy(
    function(username,password,done){
        models.Users.findOne({
            where:{
                username
            }
        }).then((user)=>{
            // checking if username exists
            if(!user){
                // user not found invalid login
                return done(null,false,{message:'Incorrect Username'});
            }
            // if username exists then compare passwords
            const login = bcrypt.compareSync(password,user.password);
            // passwords match return user data
            if(login){
                return done(null,user)
            }else{
                // passwords mismatch
                return done(null,false,{message:'Invalid Password'})
            }
        })// catcing errors for then
        .catch((err)=>{
            return done(err);
        })
    }
))

// Serializing user to add data(id) inside the session
passport.serializeUser(function(user,done){
    return done(null,user.id);
});

/// deserializing user finding the data from the userid
passport.deserializeUser(function(id,done){
    models.Users.findOne({
        where:{
            id
        }
    }).then((user)=>{
        return done(null,user);
    }).catch((err)=>{
        return done(err,null);
    })
})