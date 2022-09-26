/*
============================================
 Title: macias-session-routes.js
 Author: Andres Macias
 Date:   9/18/22
 Description: session API - routes for user
===========================================
*/

let express = require('express');
let router = express.Router();
let User = require('../models/macias-user');
let bcrypt = require('bcryptjs');

let saltRounds = 10;

/**
* @openapi
* /api/signup:
*   post:
*       summary: Creates a new user object
*       Description: Api for adding user object
*       requestBody:
*               description: Users information
*               content:
*                   application/json:
*                       schema:
*                           required:
*                               - userName
*                               - password
*                               - emailAddress
*                           properties:
*                               userName:
*                                   type: string
*                               password:
*                                   type: string
*                               emailAddress:
*                                   type: string
*       responses:
*           '200':
*               description: Registered User
*           '401': 
*               description: Username is already in use
*           '500':
*               description: Server Exception
*           '501':
*               description: MongoDB Exception
*/
router.post('/signup', async (req, res) => {
    try {
        let hashedPassword = bcrypt.hashSync("user1password", saltRounds);
        let newRegisteredUser = {
            userName: "user1",
            password: hashedPassword,
            emailAddress: "test@gmail.com"
        };

        User.findOne({ 'userName': "user1" }, async (err, user) => {
            if (err) {
                res.status(500).send({
                    message: `MongoDB Exception ${err}`
                });
            }
            else if (!user) {
                await User.create(newRegisteredUser, function (err, user) {
                    if (err) {
                        console.log(err);
                        res.status(501).send({
                            'message': `MongoDB Exception: ${err}`
                        });
                    } else {
                        res.status(200).send({
                            'message': `Composer document`
                        });
                        res.json(user);
                    }
                });

            } else if (user) {
                res.status(401).send({
                    'message': `Username: ${user.userName} already exists`
                });
                res.json(user);
            } else {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
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

/**
* @openapi
* /api/login:
*   post:
*       summary: logs in
*       Description: Api for logging in
*       requestBody:
*               description: Users information
*               content:
*                   application/json:
*                       schema:
*                           required:
*                               - userName
*                               - password
*                           properties:
*                               userName:
*                                   type: string
*                               password:
*                                   type: string
*       responses:
*           '200':
*               description: User logged in
*           '401': 
*               description: Invalid username and/or password
*           '500':
*               description: Server Exception
*           '501':
*               description: MongoDB Exception
*/
router.post('/login', async (req, res) => {
    try {
        User.findOne({ 'userName': req.body.userName }, function (err, user) {
            if (err) {
                res.status(501) ({
                    message: `MongoDB Exception $(err)`
                });
            }
            else if (user) {
                let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

                if (passwordIsValid) {
                    res.status(200).send({
                        'message': `User logged in`
                    });
                } else if (passwordIsValid == false) {
                    res.status(401).send({
                        'message': `invalid username and/or password login`
                    });
                }
            }

            if (!user) {
                res.status(401).send({
                    'message': `invalid username and/or password`
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
