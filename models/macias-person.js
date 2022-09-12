/*
============================================
 Title: macias-person.js
 Author: Andres Macias
 Date:   9/11/22
 Description: contains schema for person
===========================================
*/

let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let roleSchema = new Schema({
    text: { type: String}
});

let dependentSchema = new Schema({
    firstName: { type: String},
    lastName: { type: String}
});

let personSchema = new Schema({
    firstName: { type: String},
    lastName: { type: String},
    roles: [roleSchema],
    dependents: [dependentSchema],
    birthDate: {type: String}
});
module.exports = mongoose.model('Person', personSchema);