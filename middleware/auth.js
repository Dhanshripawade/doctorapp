
const jwt = require('jsonwebtoken')

exports.authenticateUser = (req, res, next) => {
    const token = req.headers.authorization;

    if(!token){
        return res.status(401).json({message:'token not available'})
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decodeToken) => {
        if(err){
            return res.status(401).json({message: 'Invalid token', error:err});
        }
        req.user = decodeToken;
        next();
    })
}
