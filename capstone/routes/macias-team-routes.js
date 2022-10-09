/*
============================================
 Title: macias-team-routes.js
 Author: Andres Macias
 Date:   10/9/22
 Description: team API - routes for team
===========================================
*/

let express = require('express');
let router = express.Router();
let Teams = require('../models/macias-team');

/**
* openapi: 3.0.0
* @openapi
* /api/teams:
*     get:
*       summary: returns a list of all teams
*       description: API for returning a list of teams from MongoDB Atlas
*       operationId: findAllTeams
*       responses:
*         '200':
*           description: Array of team documents
*         '500':
*           description: Server Exception
*         '501':
*           description: MongoDB Exception
*/
router.get('/teams', async (req, res) => {
    try {
        Teams.find({}, function (err, teams) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                });
            } else {
                console.log(teams);
                res.json(teams);
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
* /api/teams/{id}/players:
*   post:
*       summary: add a player to a team
*       Description: Api for adding a player to a team by using the team id
*       operationId: assignPlayerToTeam
*       parameters:
*           - name: id
*             description: the id of the team
*             in: path
*             schema:
*               type: string
*             required: true
*       requestBody:
*               description: player information
*               content:
*                   application/json:
*                       schema:
*                           type: object
*                           required:
*                               - firstName
*                               - lastName
*                               - salary
*                           properties:
*                               firstName:
*                                   type: string
*                               lastName:
*                                   type: string
*                               salary:
*                                   type: number
*       responses:
*           '200':
*               description: player document
*           '401':
*               description: Invalid teamId
*           '500':
*               description: Server Exception
*           '501':
*               description: MongoDB Exception
*/
router.post('/teams/:id/players', async (req, res) => {
    try {
        Teams.findOne({ _id: req.params.id }, async (err, team) => {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                });
            } else {
               
                let newPlayer = {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    salary: req.body.salary
                };

                team.players.push(newPlayer);
                team.save();
                console.log(team);
                res.json(team.players);
                
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
* /api/teams/{id}/players:
*     get:
*       summary: returns an array of all players in a team
*       description: API for returning all players in a team
*       operationId: findAllPlayersByTeamId
*       parameters:
*         - name: id
*           description: The teamId requested by the user
*           in: path
*           schema:
*             type: string
*       responses:
*         '200':
*           description: array of player documents
*         '401':
*           description: Invalid teamId
*         '500':
*           description: Server Exception
*         '501':
*           description: MongoDB Exception
*/
router.get('/teams/:id/players', async (req, res) => {
    try {
        Teams.findOne({ _id: req.params.id }, function (err, team) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                });
            } else {
                console.log(team.players);
                res.json(team.players);
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
* /api/teams/{id}:
*     delete:
*       summary: removes a team from mongoDB
*       description: API for deleting a single team document from MongoDB
*       operationId: deleteTeamByID
*       parameters:
*         - name: id
*           in: path
*           required: true
*           description: id of the document to remove
*           schema:
*             type: string
*       responses:
*         '200':
*           description: Team document
*         '401':
*           description: Invalid teamId
*         '500':
*           description: Server Exception
*         '501':
*           description: MongoDB Exception
*/

router.delete('/teams/:id', async (req, res) => {
    try {
        const teamId = req.params.id;

        Teams.findByIdAndDelete({ _id: teamId }, function (err, composer) {
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
