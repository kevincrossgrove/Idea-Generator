const router = require('express').Router();
const Button = require('../models/button');

// Creating a new button for a logged in user.
router.post("/", async (req, res) => {
    try {
        const { userId, buttonName, contentArray, color } = req.body;

        const newButton = new Button({userId, buttonName, contentArray, color});
        const savedButton = await newButton.save();
    } catch(err) {
        console.log(err);
        res.status(500).send();
    }
});

module.exports = router;