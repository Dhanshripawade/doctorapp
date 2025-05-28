
exports.authorizer = (allowedUser) => (req, res, next) => {
    // console.log(req.user, req.user.role)
    if (req.user && allowedUser.includes(req.user.role)){
        // res.status(200).json({message:'you have access'})
        next();
    }
    else{
        return res.status(401).json({message:'forbidden. You do not have permission'})
    }
}