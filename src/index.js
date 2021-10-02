// envairoment
require('dotenv').config();

const express = require('express');
const path = require('path');
const exphbs  = require('express-handlebars');
const router  = require('./router');
const connect = require('./config/db');
var methodOverride = require('method-override');

const app = express();
const port = process.env.PORT || 3000;

app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, 'public')));

app.engine('.hbs', exphbs({
    extname: '.hbs',
    helpers: {
      sum: (a,b) => {return a + b },
      isMax: (a,b) => {
        if( a < b){
          return true;
        }
        else{
          return false;
        }
      },
      
      isMovie:   (movie)=>{
            var tg;
            if (tg != movie){
              tg = movie;
              return true;
            }
            else return false;
          }
      
  }
}));
app.set('view engine', '.hbs');
app.set('views', './src/views');

app.use(
  express.urlencoded({
      extended: true,
  }),
  express.json()
);

// router 
router(app);

// connection mongodb
connect();

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})