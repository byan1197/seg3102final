var express = require('express');
var http = require('http')
var bodyParser = require('body-parser');
var env = process.env.NODE_ENV || "development";
var config = require('./config/config.json')[env];

// ROUTES
var authAPI = require('./api/auth');
// var userAPI = require('./api/user');
// var propertyAPI = require('./api/property');

// FIREBASE STUFF
var globalConf = require('./config/config.json')["global"];
var firebase = require('firebase');
var admin = require('firebase-admin')
var serviceAccount = require('./config/seg3102final-firebase-adminsdk-uaey7-1fec4eba6b.json');

var firebaseAdmin = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://seg3102final.firebaseio.com"
});
firebase.initializeApp(globalConf.firebase);
// END OF FIREBASE STUFF

app = express();

// EXPRESS USE
app.use(express.static('build'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/auth', authAPI)

// END OF EXPRESS USE

/* ACTUAL SERVER STUFFS */
http.createServer(app).listen(config.port ,function() {
    console.log('Our project is running! ', (new Date()).toString());
    console.log('running on port is runing on port 3000');
}).on('error', function (err) {
    console.error(JSON.stringify(err));
});
