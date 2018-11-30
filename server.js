var express = require('express');
var http = require('http')
var bodyParser = require('body-parser');
var env = process.env.NODE_ENV || "development";
var config = require('./config/config.json')[env];
var globalConf = require('./config/config.json')['global'];
var cors = require('cors');

const app = express();
const userRoutes = require('./api/routes/users');
const propertyRoutes = require('./api/routes/properties');
const visitingList = require('./api/routes/visitingList');
const morgan = require('morgan');
const mongoose = require('mongoose');

// MONGO
mongoose.connect(config.mongo.url, { useNewUrlParser: true })
// END MONGO

// EXPRESS USE
app.use(cors())
app.use(morgan('dev'));
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization', 'token', 'content-type');
//     if (req.method == 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
//         return res.status(200).json({});
//     }
//     next();
// });

var corsOptions = {
    origin: 'http://localhost:3000',
    allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With', 'Accept', 'token', 'content-type'],
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS', 'PATCH'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));

// app.use((req, res, next) =>{
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//     if(req.method == 'OPTIONS'){
//         res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
//         return res.status(200).json({});
//     }
//     next();
// });
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

app.use((req,res,next)=> {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);

});

app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    res.json({
        error : {
            message : error.message
        }
    });
});


/* ACTUAL SERVER STUFFS */
http.createServer(app).listen(config.port, function () {
    console.log('Our project is running! ', (new Date()).toString());
    console.log('running on port is runing on port ', config.port);
}).on('error', function (err) {
    console.error(JSON.stringify(err));
});
