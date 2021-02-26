const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema and Model
const MarioKartSchema = new Schema({
    name: String,
    weight: Number
});

// Everytime a MarioKart is created, it must follow MarioKartSchema
const MarioKart = mongoose.model('mariokart', MarioKartSchema)

module.exports = MarioKart;