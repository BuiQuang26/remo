const jwt = require('jsonwebtoken');

module.exports = function(req,res,next){
    const tokenAdmin = req.query.token;
    jwt.verify(tokenAdmin,process.env.SECRET_KEY,(err,data)=>{
        if(err){
            res.redirect('/admin/login')
        }
        next();
    })
}