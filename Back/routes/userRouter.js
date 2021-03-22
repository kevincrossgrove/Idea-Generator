const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Creating a new account, as well as logging that account in.
router.post("/", async (req, res) => {
    try {
        const {email, password, passwordVerify} = req.body;

        // Validation ( Most of this should be added to Client side, like requiring fields. )
        if (!email || !password || !passwordVerify) 
            return res.status(400).json({errorMessage: "Please enter all required fields.", code: 1});

        if (password.length < 8) 
            return res.status(400).json({errorMessage: "Password must be 8 characters or greater.", code: 2});

        if (password.length !== passwordVerify.length) 
            return res.status(400).json({errorMessage: "Password's did not match up.", code: 3});

        // Verify that the new account's email, does not already exist in the DB.
        const existingUser = await User.findOne({email: email});
        
        if (existingUser)
            return res.status(400).json({errorMessage: "An account with this email already exists.", code: 4});

        // Hash the password
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        // Save the new user account to the DB
        const newUser = new User({ 
            email: email, 
            passwordHash: passwordHash,
            creationTime: new Date() });
        const savedUser = await newUser.save();

        // Sign the token. Here we are creating a token with the user's ID. This token then becomes a cookie for the website
        const token = jwt.sign({
            user: savedUser._id
        }, process.env.JWT_SECRET);

        // Send the token in an HTTP-Only cookie
        res.cookie("token", token, { httpOnly: true }).send();
        
    } catch(err) {
        // Don't send the error as a response. This response can be used by hackers to exploit server.
        console.log(err);
        res.status(500).send();
    }
});

// Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (!existingUser)
            return res.status(400).json({errorMessage: "Invalid username or password."});

        const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash);
        if (!passwordCorrect)
            return res.status(400).json({errorMessage: "Invalid username or password."});

            // Sign the token
        const token = jwt.sign({
            user: existingUser._id
        }, process.env.JWT_SECRET);

        // Send the token in an HTTP-Only cookie
        res.cookie("token", token, { httpOnly: true }).send();
    

    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
});

// Logout
router.get("/logout", (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0)
    })
    .send();
})

// Check if the user is logged in or not.
router.get("/loggedin", (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) res.json(false);

        jwt.verify(token, process.env.JWT_SECRET);

        res.send(true);
    } catch(err) {
        res.json(false);
    }
});

// Get the logged in user data
router.get("/user", async (req, res) => {
    try {
        const token = req.cookies.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const userData = await User.findOne({_id: decoded.user});
        res.send(userData);
    } catch(err) {
        res.status(401).json({errorMessage: "Unauthorized"});
    }
});

module.exports = router;