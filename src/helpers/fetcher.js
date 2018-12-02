var config = require('../uiConfig.json')[process.env.NODE_ENV || "development"];


const imgurUpload = function(fields){
    var promiseArr = [];
    fields.forEach(i => {
        promiseArr.push(
            new Promise((resolve, reject) => {

                console.log('Setting up the promise...')

                var data = {
                    image: i
                }
                // fetch('https://api.imgur.com/oauth2/authorize?client_id=' + config.imgur.cId + '&response_type=token')
                fetch('https://api.imgur.com/3/image', {
                    method: "POST",
                    body: JSON.stringify(data.image.substring(data.image.indexOf(',')+1)),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Client-ID ' + config.imgur.clientId
                    }
                })
                    .then(res => res.json())
                    .then(res => {
                        console.log('res.data.link', res.data.link)
                        resolve(res.data.link)
                    })
                    .catch(error => reject());
            })
        )
    })
    return Promise.all(promiseArr)
}


const Fetcher = {

    postLogin: function (data) {
        return fetch(config.url + '/u/login', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(res => {
                if (!(res.uid && res.token && res.type))
                    throw new Error("Could not retrieve user data");

                localStorage.setItem("uid", res.uid)
                localStorage.setItem("token", res.token)
                localStorage.setItem("type", res.type)

                return {
                    success: "Logged in"
                };
            })
            .catch(e => {
                console.log(e)
                localStorage.clear();
                return { message: "Error: invalid credentials" }
            })

    },
    signup: function (data) {
        return fetch(config.url + '/u/login', {
            method: "POST",
            body: data,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then();
    },
    patchProperty: function(fields, cb){
        let imgurLinks = fields.imgurArr;
        let files = fields.base64Arr;
        imgurUpload(files)
            .then((res) =>{
                imgurLinks = imgurLinks.concat(res.map(x => x));

                const data = {
                    address : fields.address,
                    location: fields.location,
                    rent: fields.rent,
                    numWashrooms: fields.numWashrooms,
                    numBedrooms: fields.numBedrooms,
                    numOtherRooms: fields.numOtherRooms,
                    images: imgurLinks,
                    type: fields.type
                }
                return fetch(config.url + "/p/" + fields.pid, {
                    method: "PATCH",
                    body: JSON.stringify(data),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'token': localStorage.getItem('token')

                    }
                }).then(res => res.json())
                .then(res => {

                    if (!res.status(201))
                        cb('error',"Could not create account");


                        else{
                            cb('success', ("Property successfully created"))
                        }

                })
                    .catch(e => {
                        return { error: e }
                    })
            })
    },
    addProperty: function (fields, cb) {
        console.log("hello");
        // var data = {};
        //images [base64 strings]
        var promiseArr = [];
        fields.images.forEach(i => {
            promiseArr.push(
                new Promise((resolve, reject) => {

                    var data = {
                        image: i
                    }
                    // fetch('https://api.imgur.com/oauth2/authorize?client_id=' + config.imgur.cId + '&response_type=token')
                    fetch('https://api.imgur.com/3/image', {
                        method: "POST",
                        body: JSON.stringify(data.image.substring(data.image.indexOf(',')+1)),
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Client-ID ' + config.imgur.clientId
                        }
                    })
                        .then(res => res.json())
                        .then(res => {
                            resolve(res.data.link)
                        })
                        .catch(error => reject());
                })
            )
        })


        Promise.all(promiseArr)
            .then((results) => {
                fields.images = results;
                console.log(fields);

                return fetch(config.url + "/p", {
                    method: "POST",
                    body: JSON.stringify(fields),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'token': localStorage.getItem('token')

                    }
                }).then(res => res.json())
                .then(res => {

                    console.log(res)
                    console.log(res)

                    if (!res.status(201))
                        cb('error',"Could not create property");

                    else{
                        cb('success', ("Property successfully created"))
                    }

                })
                    .catch(e => {
                        return cb('Error, could not create property')
                    })



            })
    },

    getUser: function () {
        //`${config.url}/u/&uid=${localStorage.getItem('uid')}`
        return fetch(config.url + '/u/&uid=' + localStorage.getItem('uid'), {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            }
        }).then(res => res.json())
    },

    updateAccount: function (data) {

        console.log(data);

        return fetch(config.url + '/u/uid=' + localStorage.getItem('uid'), {
            method: "PATCH",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            }
        }).then(res => res.json())
    },
    deleteAccount: function () {

        return fetch(config.url + '/u/' + localStorage.getItem('uid'), {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            }
        }).then(res => res.json())
    },
    createAccount: function (data) {

        console.log(data);

        return fetch(config.url + '/u/signup', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(res => {

                if (!res.success)
                    throw new Error("Could not create account");

                return {
                    success: "Account successfully created"
                };
            })
            .catch(e => {

                return { message: "Error: Username already exists" }
            })

    },
    getLocations: function () {
        return fetch(config.url + '/p/locations', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            }
        })
            .then(res => res.json())
            .then(res => {
                return [...(new Set(res))]
            })
    },
    getProperties: function (query) {
        var queryString = '';
        Object.keys(query).forEach(x => {
            queryString = query[x] ? queryString + x + '=' + query[x] + '&' : queryString
        })
        if (queryString.charAt(queryString.length - 1) === '&')
            queryString.slice(0, -1);
        queryString = queryString.replace(' ', '%20')
        console.log('queryString', queryString)
        return fetch(config.url + '/p/?' + queryString, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            }
        }).then(res => res.json())
    },
    postAddToVL: function (pid) {

        const reqBody = {
            propertyId: pid,
            userId: localStorage.getItem('uid')
        }

        console.log('heyhey', reqBody)

        return fetch(config.url + '/vl/', {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            }
        }).then(res => res.json())
            .catch(e => {
                return {
                    message: e
                }
            })
    },
    getVL: function () {
        return fetch(config.url + '/vl/' + localStorage.getItem('uid'), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            }
        }).then(res => res.json())
            .catch(e => {
                return {
                    message: e
                }
            })
    },
    getOwnerProperties: function () {
        return fetch(config.url + '/p/ownedby/' + localStorage.getItem('uid'), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            }
        }).then(res => res.json())
            .catch(e => {
                return {
                    message: e
                }
            })
    },
    deleteProperty: function (pid) {
        return fetch(config.url + '/p/del/', {
            method: 'PATCH',
            body: JSON.stringify({ pid: pid }),
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            }
        }).then(res => res.json())
            .catch(e => {
                return {
                    error: e,
                    message: e
                }
            })
    }
}

export default Fetcher
