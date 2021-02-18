const express = require('express');
var request = require('request');
const app = express()
const port = 5000

const weatherKey = 'd94e3753129c8e32f80283db4cb3469a';
const weatherReq = 'https://api.openweathermap.org/data/2.5/weather?zip=13827&appid=' + weatherKey;

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/Other', (req, res) => res.send(`It's working Kevbot.`));
app.get('/Owego', (req, res) => {
    request(weatherReq, function(error, response, body) {
        if (!error && response.statusCode == 200)
            var parsedBody = JSON.parse(body);
            var temp = parsedBody['main']['temp'];
            res.send({temp});
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})