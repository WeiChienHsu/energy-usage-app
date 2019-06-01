const express = require('express');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash')

//mysql
let mysql = require('./dbcon.js');
const bodyParser = require('body-parser');

//express stuff
const app = express();

let handlebars = require('express-handlebars').create({
    defaultLayout: 'main'
});
let credentials = require('./credentials.js');
let request = require('request');

app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(session({
    secret: 'password',
    resave: false,
    saveUninitialized: false,
}));

app.use(flash())
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});
  

app.set('view engine', 'handlebars');
app.set('port', 3200);
app.set('mysql', mysql);
app.use(express.static('public'));

//home page
app.get('/', function(req, res) {
    /* Check if user login */
    if(req.session.email != null)
    {
        /* If user login was successful, setup the user session */
        req.session.cookie.maxAge = 60 * 60 * 1000;
        req.session.email = req.session.email;
        req.flash('success_msg', 'You are logged in.')

        return res.render('home', {
          title: 'Home',
          success: true,
          response: 'Login successful!',
          session: req.session,
        });
      }
      else
      {
        /* User did login */
        res.render('home');
      }
});

//hardcoded routing
app.get('/faq', (req, res) => {
    res.render('faq', {
        title: 'Home',
        success: true,
        response: 'Login successful!',
        session: req.session,
      });
})

//route devices and users page
app.use('/devices', require('./devices'));
app.use('/', require('./users'));


//error page handling
app.use(function(req, res) {
    res.status(404);
    res.render('404');
});
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.render('500');
});

module.exports = app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
