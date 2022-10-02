/*
============================================
 Title: macias-composer-routes.js
 Author: Andres Macias
 Date:   9/4/22
 Description: composer API - routes for composer
===========================================
*/

let express = require('express');
let router = express.Router();
let Composer = require('../models/macias-composer');

/**
* openapi: 3.0.0
* @openapi
* /api/composers:
*     get:
*       summary: returns a list of all composers
*       description: API for returning a list of composers from MongoDB Atlas
*       operationId: findAllComposers
*       responses:
*         '200':
*           description: Array of composer documents
*         '500':
*           description: Server Exception
*         '501':
*           description: MongoDB Exception
*/
router.get('/composers', async (req, res) => {
    try {
        Composer.find({}, function (err, composers) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                });
            } else {
                console.log(composers);
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


/**
* @openapi
* /api/composers/{id}:
*     get:
*       summary: returns a composer object
*       description: API for returning a single composer object from MongoDB
*       operationId: findComposerById
*       parameters:
*         - name: id
*           description: The composer requested by the user
*           in: path
*           schema:
*             type: string
*           required: true
*       responses:
*         '200':
*           description: Composer document
*         '500':
*           description: Server Exception
*         '501':
*           description: MongoDB Exception
*/
router.get('/composers/:id', async (req, res) => {
    try {
        Composer.findOne({ '_id': req.params.id }, function (err, composer) {
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

/**
* @openapi
* /api/composers:
*   post:
*       summary: Creates a new person object
*       Description: Api for adding person object
*       requestBody:
*               description: Persons information
*               content:
*                   application/json:
*                       schema:
*                           required:
*                               - firstName
*                               - lastName
*                           properties:
*                               firstName:
*                                   type: string
*                               lastName:
*                                   type: string
*       responses:
*           '200':
*               description: composer added
*           '500':
*               description: Server Exception
*           '501':
*               description: MongoDB Exception
*/
router.post('/composers', async (req, res) => {
    try {
        let newComposer = {
            firstName: req.body.firstName,
            lastName: req.body.lastName
        };

        await Composer.create(newComposer, function (err, composer) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                });
            } else {
                console.log(composer);
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

/**
* @openapi
* /api/composers/{id}:
*     put:
*       summary: updates the information of a composer
*       description: API for updating a single composer object from MongoDB
*       operationId: updateComposerById
*       parameters:
*         - name: id
*           in: path
*           description: The composer requested by the user
*           required: true
*           schema:
*             type: string
*       requestBody:
*           description: composer information
*           content:
*               application/json:
*                   schema:
*                       type: object
*                       required:
*                           - firstName
*                           - lastName
*                       properties:
*                           firstName:
*                               type: string
*                           lastName:
*                               type: string
*       responses:
*         '200':
*           description: Composer document
*         '500':
*           description: Server Exception
*         '501':
*           description: MongoDB Exception
*/
router.put('/composers/:id', async (req, res) => {
    try {
        const composerId = req.params.id;

        Composer.findOne({ '_id': composerId }, function (err, composer) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                });
            } else {
                console.log(req.body);
                if (composer) {
                    composer.set({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName
                    });

                    composer.save(function (err, updatedComposer) {
                        if (err) {
                            console.log(err);
                            res.json(updatedComposer);
                        } else {
                            console.log(updatedComposer);
                            res.json(updatedComposer);
                        }
                    });
                }

                if (!composer) {
                    res.status(401).send({
                        'message': `Invalid composerId`
                    });
                }
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            'message': `Server Exception: ${error.message}`
        });
    };
});

/**
* @openapi
* /api/composers/{id}:
*     delete:
*       summary: removes a document from mongoDB
*       description: API for deleting a single composer document from MongoDB
*       operationId: deleteComposerByID
*       parameters:
*         - name: id
*           in: path
*           required: true
*           description: id of the document to remove
*           schema:
*             type: string
*       responses:
*         '200':
*           description: document removed
*         '500':
*           description: Server Exception
*         '501':
*           description: MongoDB Exception
*/

router.delete('/composers/:id', async (req, res) => {
    try {
        const composerId = req.params.id;

        Composer.findByIdAndDelete({ '_id': composerId }, function (err, composer) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                });
            } else {
                console.log(composer);
                res.status(200).send({
                    'message': `Composer ${req.params.id} has been removed`
                });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            'message': `Server Exception: ${error.message}`
        });
    };
});


module.exports = router;

