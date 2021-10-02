const movie = require('../model/movie');
const user = require('../model/user');
const comment = require('../model/comment');

class commentController {

    // [POST] /comment
    addComment(req,res,next){
        const userName = res.locals.username;
        const {slugMovie,commentText} = req.body;

        const newComment = new comment({
            userName,
            movieSlug: slugMovie,
            text: commentText,
        });

        (async function(){

            await newComment.save();

            comment.find({})
            .then(comments=>{
                let listComment = comments.filter(comment=>{
                    return comment.movieSlug === slugMovie;
                })
                res.json(listComment);
            })
        }());
    }

}

module.exports = new commentController();