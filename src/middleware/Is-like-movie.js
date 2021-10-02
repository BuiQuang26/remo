const user = require('../model/user')

function isLikeMovie(req,res,next){
    var username = res.locals.username;

    user.findOne({username: username})
        .then(data=>{
            var likedMovie = data.movieLike;
            for(var i=0; i<likedMovie.length;i++)
            {
                if(likedMovie[i] == req.body.movieId){
                   return res.json({
                        access: true,
                        message: 'movie đã có trong danh sách yêu thích !!!'
                    })
                }
            }
            next();
        })
        .catch(()=>{
            res.status(500);
        })
}

module.exports = isLikeMovie;