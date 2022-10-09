/*
============================================
 Title: macias-team.js
 Author: Andres Macias
 Date:   10/9/22
 Description: contains schema for team model
===========================================
*/

let mongoose = require('mongoose');

let Schema = mongoose.Schema;



let playerSchema = new Schema({
    firstName: { type: String},
    lastName: { type: String},
    salary: { type: Number}
});

let TeamSchema = new Schema({
    name: { type: String},
    mascot: { type: String},
    players: [playerSchema]
});
module.exports = mongoose.model('Team', TeamSchema);