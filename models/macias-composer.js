/*
============================================
 Title: macias-composer.js
 Author: Andres Macias
 Date:   9/4/22
 Description: contains schema for composer
===========================================
*/

let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let composerSchema = new Schema({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true}
});

module.exports = mongoose.model('Composer', composerSchema);