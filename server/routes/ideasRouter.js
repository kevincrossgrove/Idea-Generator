const router = require('express').Router();
const auth = require('../middleware/auth');
const Idea = require('../models/idea');

// Getting all
router.get('/get/all/:visible', async (req, res) => {
    try {
        const ideas = await Idea.find({'visible' : req.params.visible});
        res.json(ideas);
    } catch (err) {
        console.log(err.message);
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
router.get('/:category/:visible', async (req, res) => {
    try {
        const ideas = await Idea.find({'category': req.params.category, 'visible': req.params.visible});
        res.json(ideas);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message });
    }
});

// Creating one
router.post('/', async (req, res) => {
    const idea = new Idea({
        category: req.body.category,
        idea: req.body.idea,
        creationTime: new Date(),
        creatorId: req.body.creatorId
    });

    // Status 201 means successfully created an object
    // Status 400 means there is something wrong with user input (didn't fill out all required params)
    try {
        const newIdea = await idea.save()
        res.status(201).json(newIdea);
    } catch (err) {
        console.log(err.message);
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
        console.log(err.message);
        res.status(400).json({message: err.message});
    }
});

// Deleting one
router.delete('/:id', auth, adminAuth, getIdea, async (req, res) => {
    try {
        await res.idea.remove()
        res.json({ message: `Deleted Idea: ${res.idea.idea}`});
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message });
    }
});

// Updated all fields
router.post('/update/all', auth, adminAuth, async (req, res) => {
    try {
        // const response =  await Idea.updateMany({}, { $set: {'visible': false}});
        res.json({message: 'nothing changed'});
    } catch (err) {
        console.log(err.message);
        res.json(err.message);
    }
});

// Accept an idea
router.patch('/accept/:id', auth, adminAuth, getIdea, async (req, res) => {
    try {
        res.idea.visible = true;
        const updatedIdea = await res.idea.save();
        res.json(updatedIdea);
    } catch (err) {
        console.log(err.message);
        res.status(400).json({message: err.message}); 
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
        console.log(err.message);
        return res.status(500).json({ message: err.message });
    }

    res.idea = idea;
    next();
}

// Middleware that ensures that the user is admin before they complete the next task
function adminAuth(req, res, next) {
    try {
        if (req.user !== process.env.ADMIN) 
            return res.status(401).json({errorMessage: "Unauthorized"});
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: err.message });
    }
    next();
}

module.exports = router;