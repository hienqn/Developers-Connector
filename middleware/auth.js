const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    // get token from header 
    const token = req.header('x-auth-token');
    console.log(token);
    // check if not token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied'});
    }

    // verify token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        console.log(req.user, decoded)
        req.user = decoded.user;
        console.log(req.user, decoded)
        next();
    } catch(err) {
        res.status(401).json({msg: 'Token is not valid'});
    }
}