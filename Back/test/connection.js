const mongoose = require('mongoose');

// Connect to mongodb
mongoose.connect('mongodb://localhost/testaroo');

mongoose.connection.once('open', () => {
    console.log("Connection has been made, now make fireworks...");
}).on('error', (error) => {
    console.log('Connection error:', error);
});