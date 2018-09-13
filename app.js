var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var multer = require('multer');
var cors = require('cors');
const fileUpload = require('express-fileupload');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const container = require('./services');

var app = express();
app.use(cors());
app.use(async function (req, res, next) {
    const db = container.get('db');
    const user = await db.User.findOne({
        where: {
            token: req.headers['X-TOKEN']
        }
    });

    if (!user) {
        return res.sendStatus(403);
    }
    req.user = user;
    console.log(req.headers, req.headers['X-TOKEN'], req.user.id);
    next();
});
app.use(fileUpload());
// var upload = multer({ dest: '/Users/guy/Desktop/workspace/nikahku/public/user/' });


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use( express.static( `${__dirname}/client/build` ) );

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/api', usersRouter);

app.use('/api/website', require('./routes/website'));

//At the end
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;