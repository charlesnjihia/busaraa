const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const session=require('express-session');
const MongoStore=require('connect-mongo')(session);
const app=express();
//connect to mongo db
mongoose.connect('mongodb://localhost:27017/busara',{ useMongoClient: true});
const db=mongoose.connection;
db.on('error',error=>{
   
  console.error('errror:',error);  
    
});
//use session /store sessions in the mongo db
app.use(session({
  secret:'charles loves you',
  resave:true,
  saveUninitialized:false ,
 store:new MongoStore({
  mongooseConnection:db
 }) 
}));
app.use((req,res,next)=>{
 res.locals.currenctUser=req.session.userId;   
 next();   
});
//import routes
const routes=require('./routes/routes');
//body parser middleware to parse request body and any json requests
app.use(bodyParser.urlencoded({extended:false}));
app.use (bodyParser.json());

// serve static files from /public
app.use(express.static(__dirname + '/public'));
app.set('view engine','pug');

app.use('/',routes);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function(err, req, res, next) {

  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
const port=process.env.PORT || 3001;
app.listen(port,()=>{console.log('listening at:',port)});