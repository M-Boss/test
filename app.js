var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var multer  = require('multer');
var cors = require('cors');
const fileUpload = require('express-fileupload');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
app.use(cors());
app.use(fileUpload());
// var upload = multer({ dest: '/Users/guy/Desktop/workspace/nikahku/public/user/' });


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use( express.static( `${__dirname}/client/build` ) );


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);

//At the end
app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, './client/build/index.html'));
})

// app.post('/api/upload', upload.single('file'), function (req, res, next) {
//     // req.file is the `avatar` file
//     // req.body will hold the text fields, if there were any
//     console.log("File: ", req.file, req.body);
//     res.json({});
// })

app.post('/api/upload', function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    console.log("File: ", req.files);
    res.json({});
})



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
