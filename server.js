var express = require('express');
var http = require('http')
var bodyParser = require('body-parser');
var env = process.env.NODE_ENV || "development";
var config = require('./config/config.json')[env];
const mongoose = require('mongoose');
// ROUTES
var authAPI = require('./api/auth');
// var userAPI = require('./api/user');
// var propertyAPI = require('./api/property');

// MONGO
mongoose.connect(config.mongo.url, {
    useNewUrlParser : true
})

// END MONGO

app = express();

// EXPRESS USE
app.use(express.static('build'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/auth', authAPI)
if(env === "production")
    app.use(app.static("build"));

// END OF EXPRESS USE

/* ACTUAL SERVER STUFFS */
http.createServer(app).listen(config.port ,function() {
    console.log('Our project is running! ', (new Date()).toString());
    console.log('running on port is runing on port ', config.port);
}).on('error', function (err) {
    console.error(JSON.stringify(err));
});
