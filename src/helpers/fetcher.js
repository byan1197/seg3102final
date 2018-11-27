var config = require('../uiConfig.json')[process.env.NODE_ENV || "development"];

const Fetch = {

    postLogin: function (data) {
        return fetch(config.url + '/u/login', {
            method: "POST",
            body: data,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(res => {
                if (res.uid)
                    localStorage.setItem("uid", res.uid)
                if (res.token)
                    localStorage.setItem("token", res.token)
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
    addProperty: function(data) {

        


        return fetch(config.url + "/p", {
            method: "POST",
            body: data,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

}