const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.headers.authorization; // Get token from request headers

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        // Verify token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user data to request object
        next(); // Proceed to next middleware
    } catch (error) {
        res.status(400).json({ error: 'Invalid token. Please log in again.' });
    }
};

module.exports = authenticate;
