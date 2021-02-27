require('dotenv').config()
const express = require('express');
var request = require('request');
var mongoose = require('mongoose');

const app = express()
const PORT = process.env.PORT || 5000;

// Connect to the database
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json());

const ideasRouter = require('./routes/ideas');
app.use('/ideas', ideasRouter);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
})




// const weatherKey = 'd94e3753129c8e32f80283db4cb3469a';
// const weatherReq = 'https://api.openweathermap.org/data/2.5/weather?zip=13827&appid=' + weatherKey;
// app.get('/Home', (req, res) => res.send('Hello World!'));
// app.get('/Other', (req, res) => res.send(`It's working Kevbot.`));
// app.get('/Owego', (req, res) => {
//     request(weatherReq, (error, response, body) => {
//         if (!error && response.statusCode == 200)
//             var parsedBody = JSON.parse(body);
//             var temp = parsedBody['main']['temp'];
//             res.send({temp});
//     });
// });