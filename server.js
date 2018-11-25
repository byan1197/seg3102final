var express = require('express');
var http = require('http')
var bodyParser = require('body-parser');
var env = process.env.NODE_ENV || "development";
var config = require('./config/config.json')[env];

const app = express();
const userRoutes = require('./api/routes/users');
const morgan = require('morgan');
const mongoose = require('mongoose');

// ROUTES
var authAPI = require('./api/auth');
// var userAPI = require('./api/user');
// var propertyAPI = require('./api/property');

// MONGO
mongoose.connect('mongodb://127.0.0.1:27017/seg', {
    useNewUrlParser : true
})
//Agent


// END MONGO

app.use(morgan('dev'));
app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method == 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// EXPRESS USE
app.use(express.static('build'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/auth', authAPI)
if(env === "production")
    app.use(app.static("build"));

// END OF EXPRESS USE


app.use('/users', userRoutes);
/* ACTUAL SERVER STUFFS */
http.createServer(app).listen(config.port ,function() {
    console.log('Our project is running! ', (new Date()).toString());
    console.log('running on port is runing on port ', config.port);
}).on('error', function (err) {
    console.error(JSON.stringify(err));
});
