const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check_auth');
const Property = require('../models/property');
const User = require('../models/user');
const VisitingList = require('../models/visitingList');
const mongoose = require('mongoose');

router.post('/add?:userid', checkAuth, (req, res, next) =>{
});

router.get('/get?:userid', checkAuth, (req, res, next) =>{
});

module.exports = router;