const express = require('express');
const methodOverride = require('method-override');

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


app.set('view engine', 'handlebars');
app.set('port', 3200);
app.set('mysql', mysql);
app.use(express.static('public'));

//home page
app.get('/', function(req, res) {
    res.render('home');
});

//route devices page
app.use('/devices', require('./devices'));

//hardcoded routing
app.get('/login', (req, res) => {
    res.render('login');
})

app.get('/faq', (req, res) => {
    res.render('faq');
})

app.get('/setting', (req, res) => {
    res.render('setting');
})

app.get('/logout', (req, res) => {
    res.render('logout');
})

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
app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});