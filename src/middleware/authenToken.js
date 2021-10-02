const jwt = require('jsonwebtoken');


function authenToken(req,res,next){
    const authorizationHeader = req.headers['authorization'];
    const token = authorizationHeader.split(' ')[1];

    if(!token) {
        res.status(401)
    }

    jwt.verify(token, process.env.SECRET_KEY, (err,data)=>{
        if(err) {res.status(403).json({
                                        loginFalse: true,
                                        message: 'ket noi nay khong duoc uy quyen!!!',
                                    });
                }
        res.locals.username = data.username;
        next();
    })

}

module.exports = authenToken;