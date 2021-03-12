require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Routers
const ideasRouter = require('./routes/ideasRouter');
const userRouter = require('./routes/userRouter');
const buttonRouter = require('./routes/buttonRouter');

// The reason we use process.env.PORT is because whatever service host's this server, will set the port.
const PORT = process.env.PORT || 5000;

// Connect to the database
mongoose.connect(process.env.MDB_CONNECT, { useNewUrlParser: true }, (err) => {
  if (err) return console.log(err);
  console.log('Connected to Database');
});

// Will use this on all endpoints, regardless of the path.
app.use(express.json());
app.use(cookieParser());
// Set what domains can use this server, right now that is Localhost 3000.
app.use(cors({
  origin: ["http://localhost:3000"],
  credentials: true
}));

app.use('/ideas', ideasRouter);
app.use('/auth', userRouter);
app.use('/button', buttonRouter);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});