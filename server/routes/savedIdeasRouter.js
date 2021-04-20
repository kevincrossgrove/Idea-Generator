const router = require('express').Router();
const auth = require('../middleware/auth');
const SavedIdea = require('../models/savedIdea');
const Idea = require('../models/idea');

// Saving an idea to a user's account
router.patch('/content', auth, async (req, res) => {
    try {
        const { userId, contentId } = req.body;

        // Check to see if this user already has saved ideas.
        var existingUserData = await SavedIdea.findOne({userId: userId});

        if (!existingUserData) {
            const newUser = new SavedIdea({userId: userId, savedIdeaArray: contentId});
            try {
                await newUser.save();
            } catch (err) {
                console.log(err.message);
            }
            return res.status(201).json({ message: 'Successful save'});
        }

        // Don't let them save the same content twice
        if (existingUserData.savedIdeaArray.includes(contentId)) 
            return res.status(400).send({error: 'User already saved this'});

        existingUserData.savedIdeaArray.push(contentId);
        existingUserData.save();
        return res.status(202).json({ message: 'Successful save'});

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}); 

// Getting a user's saved content
router.get('/content', auth, async (req, res) => {
    try {
        const data = await SavedIdea.findOne({userId: req.user});

        // Get the saved ids of the ideas
        const ids = data.savedIdeaArray;

        // Query for the actual ideas using the ids we just got
        const content = await Idea.find( {_id : { $in : ids}});

        res.json(content);
    } catch (err) {
        console.log(err.message);
    }
});

// Delete a saved idea for a user
router.delete('/content/:id', auth, async (req, res) => {
    try {
        var data = await SavedIdea.findOne({userId: req.user});
        var ids = data.savedIdeaArray;

        // Get the index of the idea that needs to be deleted
        const deleteIndex = ids.indexOf(req.params.id);

        ids.splice(deleteIndex, 1);
        data.savedIdeaArray = ids;
        data.save();

        // Query for the actual ideas using the ids we just got
        const content = await Idea.find( {_id : { $in : ids}});

        return res.json(content);
    } catch (err) {
        console.log(err.response);
    }
});

module.exports = router;