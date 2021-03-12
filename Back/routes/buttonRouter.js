const router = require('express').Router();
const Button = require('../models/button');
const auth = require('../middleware/auth');

// Creating a new button for a logged in user.
router.post("/", auth, async (req, res) => {
    try {
        const { buttonName, contentArray, color } = req.body;

        // Get the user that is creating this button. 
        const userId = req.user;

        const newButton = new Button({userId, buttonName, contentArray, color});
        const savedButton = await newButton.save();

        // Return the saved button
        res.json(savedButton);
    } catch(err) {
        console.log(err);
        res.status(500).send();
    }
});

// Getting the Button's a user has created.
router.get('/', auth, async (req, res) => {
    try {
        const buttons = await Button.find({'userId': req.user});
        res.json(buttons);
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
});

module.exports = router;