const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const routes = require('./routes')
const path = require('path');

// importing passport authentication straategy
require('./handlers/passport');

// express app
const app = express();

// for form post requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// populate cookies into the req object
app.use(cookieParser());

// session info
app.use(session({
    secret:'BsdjgpamYqzGBrdxFh90DS9myQNtkZP3dYKtp9Hn',
    key:'MQsATziZydPf37HrORbr',
    resave:true,
    saveUninitialized:true,
    cookie:{maxAge:24*60*60}
}));

// for logging in
app.use(passport.initialize());
app.use(passport.session());

app.use('/',routes);

// for production build
if(process.env.NODE_ENV=='production'){
    // serve static files from client/build
    app.use(express.static('client/build'));
    // if all routes have been matched and none matches
    // serve index.html from the client build
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
};

// Global Error handling
app.use(function(err,req,res,next){
    console.log(err);
    res.status(500).send({err:'something broke we are working to resolve it'});
})

module.exports=app;