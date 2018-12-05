const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Property = require('../api/models/property');
const User = require('../api/models/user');
var env = process.env.NODE_ENV || "development";
var config = require('./config.json')[env];

const Seeder = {
    properties: function (uid) {
        var promiseArr = [];
        mongoose.connect(config.mongo.url, { useNewUrlParser: true })

        var imgur = [
            "https://i.imgur.com/1S6QQj7.jpg",
            "https://i.imgur.com/SUk3FQK.jpg",
            "https://i.imgur.com/pP1a1xT.jpg",
            "https://i.imgur.com/PydX2sh.jpg",
            "https://i.imgur.com/1JsS7n9.jpg"
        ];

        for (var i = 0; i < 50; i++) {

            promiseArr.push(new Promise((resolve, reject) => {
                const imgurCutOff = Math.round(Math.random() * 5);
                const property = new Property({
                    _id: new mongoose.Types.ObjectId(),
                    owner: uid,
                    address: i.toString() + ' Random Street',
                    createdAt: new Date().toString(),
                    images: imgur.slice(imgurCutOff, imgur.length).concat(imgur.slice(0, imgurCutOff)),
                    deleted: false,
                    rent: Math.floor(Math.random() * 5000),
                    numWashrooms: Math.floor(Math.random() * 10),
                    isAvailable: true,
                    numBedrooms: Math.floor(Math.random() * 10),
                    numOtherRooms: Math.floor(Math.random() * 10),
                    type: (['HOUSE', 'APPARTMENT'])[Math.round(Math.random())], //one of : HOUSE, APPARTMENT,
                    location: (['TORONTO, ON', 'MONTREAL, QC', 'OTTAWA, ON'])[Math.round(Math.random() * 2)]
                });

                property.save()
                    .then(result => {
                        resolve()
                    })
                    .catch(err => {
                        reject()
                    });
            }))
        }

        Promise.all(promiseArr).then(
            () => { console.log('success') }
        )

    },
    users: function () {

        mongoose.connect(config.mongo.url, { useNewUrlParser: true })

        var promiseArr = [];
        var usernames = ['owner', 'agent', 'customer'];

        usernames.forEach(uname => {

            promiseArr.push(
                new Promise((resolve, reject) => {
                    User.find({ username: uname }, (err, users) => {
                        if (err)
                            console.log('e', err)

                        console.log('user', users)

                        if (!users.length === 0)
                            resolve();
                        const hash = bcrypt.hash('pass', 10, (err, hash) => {
                            if (err)
                                console.log('err during hash')
                            else {
                                const user = new User({
                                    _id: new mongoose.Types.ObjectId(),
                                    email: uname + '@opr.com',
                                    password: hash,
                                    type: uname.toUpperCase(),
                                    name: 'John',
                                    lastName: 'Doe',
                                    username: uname,
                                    maxRent: 600
                                });
                                console.log(user);
                                user.save()
                                    .then(() => {
                                        console.log('saved');
                                        resolve()
                                    })
                                    .catch(() => console.log('ERROR'));
                            }
                        });
                    })
                })
            );
        })

        console.log(promiseArr);

        Promise.all(promiseArr).then(() => { console.log('success') }).catch(() => { console.log("ERROR") })

    }
}

module.exports = Seeder;