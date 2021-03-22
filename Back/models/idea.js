const mongoose = require('mongoose');

const ideaSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    idea: {
        type: String,
        required: true
    },
    creatorId: {
        type: Number,
        required: true,
        default: 0
    },
    creationTime: {
        type: Date,
        required: false,
    },
});

module.exports = mongoose.model('Idea', ideaSchema);