const jwt = require('jsonwebtoken');

// Auth is Middleware, meaning endpoints can use Auth to test a request first before acting on it.
// Auth verifies that the user is logged in, if they are not they can't use this endpoint.
// Auth also sends along the user's id if they are logged in, inside of req.user.
const auth = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) res.status(401).json({errorMessage: "Unauthorized"});

        // Verify compares token with password, if it hasn't it will throw an error.
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        // Pass along the user id, so that the endpoint will have the user id.
        req.user = verified.user;

        // Exit out of the auth middleware, continue executing this endpoint
        next();
    } catch(err) {
        console.log(err.message);
        res.status(401).json({errorMessage: "Unauthorized"});
    }
}

module.exports = auth;