//  require packages
var express         = require('express');
var request         = require('request');
var User            = require('../models/user');

//  setup
var router          = express.Router();

//  router api/bands
router.route('/bands')
    .get(function(req, res) {
        request("http://www.roskilde-festival.dk/api/artists/2016", function(err, req_res, body) {
            if (!err && req_res.statusCode === 200) {
                res.send(body);
            }
            else {
                res.send([]);
            }
        })
    });

//  router api/bands
router.route('/band/:name/like')
    .post(function(req, res) {
        if(req.session._id) {    
            User.findByIdAndUpdate(req.session._id, {
                $addToSet: {
                    bands: req.body
                }
            }, {safe: true, upsert: true}, function(err) {
                if(err) {
                    res.send({status: "error"});
                } 
                else {
                    res.send({status: ""})
                }
            });
        }
        else {
            res.send({status: "Not signed in"});
        }
    })

    .delete(function(req, res) {
        if(req.session._id) {    
            User.findByIdAndUpdate(req.session._id, {
                $pull: {
                    bands: {urlParam: req.params.name}
                }
            }, {safe: true, upsert: true}, function(err) {
                if(err) {
                    res.send({status: "error"});
                } 
                else {
                    res.send({status: ""})
                }
            });
        }
        else {
            res.send({status: "Not signed in"});
        }
    });

//  router api/bands
router.route('/user/likes')
    .get(function(req, res) {
        User.findOne({'_id': req.session._id}, 'username bands', function(err, user) {
            res.send(user ? user : {status: "Not signed in"});
        });
    });

//  make available for server.js
module.exports = router;
