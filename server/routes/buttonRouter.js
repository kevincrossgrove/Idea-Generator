const router = require('express').Router();
const Button = require('../models/button');
const auth = require('../middleware/auth');

// Creating a new button for a logged in user.
router.post("/", auth, async (req, res) => {
    try {
        const userId = req.user;
        const { buttonName, contentArray } = req.body;

        const newButton = new Button({userId, buttonName, contentArray});
        const savedButton = await newButton.save();

        // Return the saved button
        res.json(savedButton);
    } catch(err) {
        console.log(err.message);
        res.status(500).send();
    }
});

// Upsert a existing button for a user.
router.patch('/:buttonId', auth, async (req, res) => {
    try {
        const buttonId = req.params.buttonId;
        const userId = req.user;
        const { buttonName, contentArray } = req.body;
        
        const updateDoc = {
            $set: {
                userId: userId,
                buttonName: buttonName,
                contentArray: contentArray
            }
        }

        const resultButton = await Button.updateOne( {_id: buttonId}, updateDoc, { upsert: true});
        res.json(resultButton);
    } catch (err) {
        console.log(err.message);
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

// Deleting the Button a user created.
router.delete('/:id', auth, getButton, async (req, res) => {
    try{
        res.button.remove();
        res.json({ message: `Deleted Button: ${res.button.Button}`});
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', auth, getButton, async (req, res) => {
    try {
        res.json(res.button);
    } catch (err) {
        console.log(err.message);
    }
});

// Get an individual Button a user created
async function getButton(req, res, next) {
    let button;

    try {
        button = await Button.findById(req.params.id);
        if (button == null) 
            return res.status(404).json({ message: "Cannot find button."})        
    } catch (err) {
        console.log(err);
    }

    res.button = button;
    next();
}

module.exports = router;