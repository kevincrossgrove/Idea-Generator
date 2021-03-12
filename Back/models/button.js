const mongoose = require('mongoose');

const buttonSchema = new mongoose.Schema({
    userId: {type: mongoose.Types.ObjectId, required: true},
    buttonName: {type: String, required: true},
    contentArray: {type: Array, required: false},
    color: {type: String, required: false}
});

module.exports = mongoose.model('Button', buttonSchema);