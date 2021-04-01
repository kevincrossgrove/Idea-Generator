const mongoose = require('mongoose');

const savedIdeaSchema = new mongoose.Schema({
    userId: {type: mongoose.Types.ObjectId, required: true},
    savedIdeaArray: {type: Array, required: false},
});

module.exports = mongoose.model('SavedIdea', savedIdeaSchema);