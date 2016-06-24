// require packages
var express         = require('express');
var mongoose        = require('mongoose');
var bcrypt          = require('bcrypt-nodejs');
var User            = require('../models/user');

//  setup
var router          = express.Router();

//  connect to mongodb
mongoose.connect('mongodb://localhost/roskilde');

//  router auth/signup
router.route('/signup')
    .post(function(req, res) {
        //  input values
        var username = req.body.username;
        var password = req.body.password;
        //  check for empty
        if(username != "" && password != "") {
            //  hash password
            bcrypt.hash(password, null, null, function(err, hash) {
                // new user
                var user = new User({
                    username: username.toLowerCase(),
                    password: hash
                });
                //  save user to mongodb
                user.save(function(err) {
                    res.send({status: err ? "Username in use" : "User created", error: err ? true : false});
                });
            });
        }
        else {
            res.send({status: "Missing values"});
        }
    });

//  router auth/signin
router.route('/signin')
    .post(function(req, res) {
        //  input values
        var username = req.body.username;
        var password = req.body.password;
        //  check for empty
        if(username != "" && password != "") {
            //   query for user
            User.findOne({'username': username.toLowerCase()}, 'password bands', function(err, user) {
                //  if user found
                if(user) {
                    bcrypt.compare(password, user.password, function(err, auth) {
                        // if password match
                        if(auth) {
                            req.session._id = user._id;
                            res.send({user: username, error: false});
                        }
                        else {
                            res.send({status: "Unknown username or password", error: true});
                        }
                    });
                } 
                else {
                    res.send({status: "Unknown username or password", error: true});
                }
            });
        }
        else {
            res.send({status: "Missing values", error: true});
        }
    });

//  router auth/signout
router.route('/signout')
    .post(function(req, res) {
        req.session.destroy();
        res.send({auth: false});
    });

//  router auth/verify
router.route('/verify')
    .post(function(req, res) {
        res.send({auth: req.session._id ? true : false});
    });

//  make available for server.js
module.exports = router;
