//  require packages
var express         = require('express');
var bodyParser      = require('body-parser');
var cookieParser    = require('cookie-parser');
var session         = require('express-session');
var morgan          = require('morgan'); // DEBUG
var app             = express();

//  require routing
var api             = require('./routes/api');
var auth            = require('./routes/auth');

//  setup
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({secret: 'jørgen leth', saveUninitialized: false, resave: false}));
app.use(morgan('combined'));
app.use('/api', api);
app.use('/auth', auth);

//  start server
app.listen(80, function() {
    console.log('node init');
});
