/*
============================================
 Title: macias-composer-routes.js
 Author: Andres Macias
 Date:   9/4/22
 Description: composer API - routes for composer
===========================================
*/

let express = require('express');
let Composer = require('../models/macias-composer');
let router = express.Router();


router.get('/api/composers', async (req, res) => {
    try {
        Composer.find({}, function (err, composers) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                });
            } else {
                console.log(composers);
                res.status(200).send({
                    'message': `Array of composer documents`
                });
                res.json(composers);
            };
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            'message': `Server Exception: ${error.message}`
        });
    };
});

router.get('/api/composers/:id', async (req, res) => {
    try {
        Composer.findOne({'_id': req.params.id}, function (err, composer) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                });
            } else {
                console.log(composer);
                res.status(200).send({
                    'message': `Composer document`
                });
                res.json(composer);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            'message': `Server Exception: ${error.message}`
        });
    };
});

router.post('/api/composers/:id', async (req, res) => {
    try {
        let newComposer = {
            firstName: req.body.firstName,
            lastName: req.body.lastName
        }
      await Composer.create(newComposer, function (err, composer) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                });
            } else {
                console.log(composer);
                res.status(200).send({
                    'message': `Composer document`
                });
                res.json(composer);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            'message': `Server Exception: ${error.message}`
        });
    };
});

