require('dotenv').load();
const jwt = require('jsonwebtoken');

// fn to make sure user is logged in - authentication
exports.loginRequired = function(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];   //Bearer dajfkldagjlka;jkdla
        //decode the token 
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
            if(decoded) {
                next();
            } else {
                return next({
                    status: 401,  //unauthorized
                    message: 'Please log in first'
                });
            }
        });
    } catch (err) {
        return next({
            status: 401,  //unauthorized
            message: 'Please log in first'
        })
    }
}

// fn to make sure we get the correct user - authorization
exports.ensureCorrectUser = function(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
            if(decoded && decoded.id === req.params.id) {
                return next();
            } else {
                return next({
                    status: 401,
                    message: 'Unauthorized'
                });
            }
        });
    } catch(err) {
        return next({
            status: 401,
            message: 'Unauthorized'
        });
    }
}