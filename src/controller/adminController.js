const movie = require('../model/movie');
const user = require('../model/user');
const comment = require('../model/comment');
const path = require('path');
const jwt = require('jsonwebtoken');
const admin = require('../model/admin');

class adminController{

    // [GET] admin/login
    loginForm(req,res,next){
        res.sendFile(path.join(__dirname, '../views', 'login-admin.html'));
    }


    checkAdmin(req,res,next){
        const pass = req.body.password;
        admin.findOne({name: 'administrator' })
            .then(data=>{
                if(pass === data.password){
                    const token = jwt.sign({name: admin.name},process.env.SECRET_KEY,{expiresIn: 60*30 });
                    res.json({login: true , token: token});
                }else{
                    res.status(400).json({login: false, message: "login không thành công"})
                }
            })
            .catch(()=>{
                res.status(500).json({login: false, message: 'lỗi server !!!'});
            })
    }

    // [GET] ./admin
    index(req, res, next){
        movie.find({})
            .then((movie)=>{
                res.render('admin', {
                    movie : movie.map((movie) => movie.toObject())
                }); 
            })
            .catch(next);
    }

    adminShowMovie(req, res, next){
        let slugMovie = req.params.slug;
        let movies = {};
        movie.findOne({slug: slugMovie})
            .then((movie)=>{
                movies = movie;
                return comment.find({movieSlug: slugMovie, })
            })
            .then(comments=>{
                res.render('admin-showMovie', {
                    movies : movies.toObject(),
                    comments: comments.map(comment=>comment.toObject()),
                })
            })
            .catch(next);
    }

    // [GET] ./admin/add-movie
    addMovie(req, res, next){
        res.render('add-movie'); 
    }

    // [POST] ./admin/add-movie/save
    save(req, res, next){
        var movies = new movie(req.body)
        movies.save({})
            .then(()=> res.redirect('back'))
            .catch(next);
    }

    // [GET] ./admin/update/:id
    update(req, res, next){
        movie.findOne({_id: req.params.id})
            .then((movie)=> res.render('update-movie', {movie : movie.toObject()}))
            .catch(next);
    }

    updateSave(req, res, next){
        movie.updateOne({_id: req.params.id}, req.body )
            .then(() => res.redirect('/admin'))
            .catch(next);
    }

    // [GET] ./admin/Garbage-box
    GarbageBox(req, res, next){
        movie.findDeleted({})
            .then((movie)=>{
                res.render('garbage-box', {
                    movie : movie.map((movie) => movie.toObject())
                }); 
            })
            .catch(next);
    }

    // [DELETE] /admin/comment
    deleComment(req,res){
        const commentID = req.body.commentId;

        (async function(){
             const com = await comment.findOne({_id: commentID});
             const slugMovie = com.movieSlug;

             comment.deleteOne({_id: commentID })
                 .then(()=>{
                     return comment.find({movieSlug : slugMovie })
                 })
                 .then(comments=>{
                     res.json(comments);
                 })
                 .catch(()=>{
                     res.status(400).json({message: 'delete false'});
                 })
        }())
    }
}

module.exports = new adminController();