const router = require('express').Router();
const auth = require('../middleware/auth');
const Idea = require('../models/idea');
const SavedIdea = require('../models/savedIdea');

// Getting all
router.get('/', async (req, res) => {
    try {
        const ideas = await Idea.find();
        res.json(ideas);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Getting all categories
router.get('/get/categories', async (req, res) => {
    try {
        const categories = await Idea.distinct('category');
        res.json(categories);
    } catch (err) {
        console.log(err.message);
    }
});

// Get Category
router.get('/:category', async (req, res) => {
    try {
        const ideas = await Idea.find({'category': req.params.category})
        res.json(ideas);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Creating one
router.post('/', async (req, res) => {
    const idea = new Idea({
        category: req.body.category,
        idea: req.body.idea,
        creationTime: new Date()
    });

    // Status 201 means successfully created an object
    // Status 400 means there is something wrong with user input (didn't fill out all required params)
    try {
        const newIdea = await idea.save()
        res.status(201).json(newIdea);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Updating one
router.patch('/:id', getIdea, async (req, res) => {
    if (req.body.idea !== null) {
        res.idea.idea = req.body.idea;
    }
    if (req.body.category !== null) {
        res.idea.category = req.body.category;
    }

    try {
        const updatedIdea = await res.idea.save();
        res.json(updatedIdea);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

// Deleting one
router.delete('/:id', getIdea, async (req, res) => {
    try {
        await res.idea.remove()
        res.json({ message: `Deleted Idea: ${res.idea.idea}`});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Saving an idea to a user's account
router.patch('/save/content', auth, async (req, res) => {
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
router.get('/saved/content', auth, async (req, res) => {
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
router.delete('/saved/content/:id', auth, async (req, res) => {
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

// Status 404 means that you could not find the request
async function getIdea(req, res, next) {
    let idea;
    try {
        idea = await Idea.findById(req.params.id)
        if (idea == null) {
            return res.status(404).json({ message: 'Cannot find Idea' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.idea = idea;
    next();
}

module.exports = router;