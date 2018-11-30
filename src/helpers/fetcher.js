var config = require('../uiConfig.json')[process.env.NODE_ENV || "development"];

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
    addProperty: function (data) {
        return fetch(config.url + "/p", {
            method: "POST",
            body: data,
            headers: {
                'Content-Type': 'application/json'
            }
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
    }

}

export default Fetcher