const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) res.status(401).json({errorMessage: "Unauthorized"});

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified.user;

        next();
    } catch(err) {
        console.log(err);
        res.status(401).json({errorMessage: "Unauthorized"});
    }
}

module.exports = auth;