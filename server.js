var express = require('express');
var http = require('http')
var bodyParser = require('body-parser');
var env = process.env.NODE_ENV || "development";
var config = require('./config/config.json')[env];
var globalConf = require('./config/config.json')['global'];

const app = express();
const userRoutes = require('./api/routes/users');
const propertyRoutes = require('./api/routes/properties');
const visitingList = require('./api/routes/visitingList');
const morgan = require('morgan');
const mongoose = require('mongoose');

// MONGO
mongoose.connect(config.mongo.url, { useNewUrlParser: true })
//Agent
// END MONGO

// EXPRESS USE

app.use(morgan('dev'));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
app.use(express.static('build'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if (env === "production")
    app.use(app.static("build"));

// END OF EXPRESS USE

//ROUTES
app.use('/u', userRoutes);
app.use('/p', propertyRoutes)
app.use('/vl', visitingList)
// END OF ROUTES

/* ACTUAL SERVER STUFFS */
http.createServer(app).listen(config.port, function () {
    console.log('Our project is running! ', (new Date()).toString());
    console.log('running on port is runing on port ', config.port);
}).on('error', function (err) {
    console.error(JSON.stringify(err));
});
