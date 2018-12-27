require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const logger = require('morgan');
const multer = require('multer');
const cors = require('cors');
const compression = require('compression');
const fileUpload = require('express-fileupload');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const container = require('./services');

var app = express();
app.use(cors());

const mailer = container.get('mailer');
const config = container.get('config');
const adminMail = config.get('app.email');
mailer.mail(adminMail , 'Test mail', 'Test mail.');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(session({
    secret: 'abcdefgood',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    function (username, password, done) {
        console.log("here");
        if (username == "sharon") {
            console.log("success");
            return done(null, {id: 1});
        }
        else {
            console.log("failure");
            return done("Invalid credentials");
        }
    }
));

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    done(null, {id});
});

app.post('/boss/login', (req, res, next) =>
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/boss/login'
    }, function (error, user, info) {
        req.login(user, (err) => {
            console.log('Inside req.login() callback')
            console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`);
            console.log(`req.user: ${JSON.stringify(req.user)}`)
            if(err){
                res.redirect('/boss/login')
            }
            else{
                res.redirect('/boss/users')
            }
        });

    })(req, res, next)
);

app.use('/api', usersRouter);
app.use('/api', require('./routes/contact'));
app.use('/api', require('./routes/publicWebsite'));
app.use('/api', require('./routes/publicGuestlist'));

//admin
app.use('/boss', require('./routes/admin/auth'));
app.use(function (req, res, next) {
    if (!req.path.startsWith('/boss')) {
        return next();
    }
    if (req.isAuthenticated()) {
        // req.user is available for use here
        return next();
    }

    // denied. redirect to login
    res.redirect('/boss/login')
});
app.use('/boss', require('./routes/admin/templates'));
app.use('/boss', require('./routes/admin/settings'));
app.use('/boss', require('./routes/admin/users'));
app.use('/boss', require('./routes/admin/index'));
app.use('/boss', require('./routes/admin/payments'));

app.use(compression());
app.use('/assets', express.static('public/uploads'));
app.use('/static/admin', express.static('public/admin'));
app.use(express.static(`${__dirname}/client/build`));
//At the end
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});

//authorized client routes
app.use(async function (req, res, next) {
    const db = container.get('db');
    // console.log(req.headers, req.headers['authorization']);
    const user = await db.User.findOne({
        where: {
            token: req.headers['authorization']
        }
    });

    if (!user) {
        return res.sendStatus(403);
    }
    req.user = user;
    // console.log("Req.user: ", req.user.id);
    next();
});
app.use(fileUpload());
app.use('/api/website', require('./routes/website'));
app.use('/api', require('./routes/loggedInUser'));
app.use('/api', require('./routes/checklist'));
app.use('/api', require('./routes/guestlist'));
app.use('/api', require('./routes/premium'));

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