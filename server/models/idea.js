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
        type: mongoose.Types.ObjectId,
        required: false,
    },
    creationTime: {
        type: Date,
        required: false,
    },
    source: {
        type: String,
        required: false
    },
    visible: {
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = mongoose.model('Idea', ideaSchema);