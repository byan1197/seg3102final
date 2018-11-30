var config = require('../uiConfig.json')[process.env.NODE_ENV || "development"];

const Fetcher = {

    postLogin: function (data) {

        console.log(data);

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
    addProperty: function (data) {
        return fetch(config.url + "/p", {
            method: "POST",
            body: data,
            headers: {
                'Content-Type': 'application/json'
            }
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
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token' : localStorage.getItem('token')
            }
        }).then(res => res.json())
    },
    deleteAccount: function () {

        return fetch(config.url + '/u/' +  localStorage.getItem('uid'), {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token' : localStorage.getItem('token')
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


        

}

export default Fetcher