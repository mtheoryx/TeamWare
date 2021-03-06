//Andy Sandefer
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Team = require('../models/Team.js');

//All
router.get('/', function (req, res, next) {
    var qry = Team.find().sort({"name": 1})
    qry.exec(function (err, teams) {
        if (err) {
            return next(err);
        }
        else {
            res.json(teams);
        }
    });
});

router.get('/getdistbyteam/', function (req, res, next) {
    var query = Team.aggregate([
        {
            $group: {
                _id: '$state_code',
                totalTeams: { $sum: 1 }
            }
        }
    ]);

    query.exec(function (err, post) {
        if (err) {
            return next(err);
        }
        else {
            res.json(post);
        }
    });
});

//Get by Id
router.get('/:id', function (req, res, next) {
    Team.findById(req.params.id, function (err, post) {
        if (err) {
            return next(err);
        }
        else {
            res.json(post);
        }
    });
});

//Create
router.post('/', function (req, res, next) {
    Team.create(req.body, function (err, post) {
        if (err) {
            return next(err);
        }
        else {
            res.json(post);
        }
    });
});

//Update by Id
router.put('/:id', function (req, res, next) {
    Team.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) {
            return next(err);
        }
        else {
            res.json(post);
        }
    });
});

//Delete by Id
router.delete('/:id', function (req, res, next) {
    Team.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) {
            return next(err);
        }
        else {
            res.json(post);
        }
    });
});

module.exports = router;