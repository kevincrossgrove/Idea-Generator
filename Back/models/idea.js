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
        require: true,
        default: 0
    }
});

module.exports = mongoose.model('Idea', ideaSchema);