var config = require('../config/config.json')['global']
var moment = require('moment')

const ImgurHelper = {

    uploadImage: function (img) {

        data = {
            image: img,
            type: "file" //TODO: figure out how to actually upload lol
        }
        // fetch('https://api.imgur.com/oauth2/authorize?client_id=' + config.imgur.cId + '&response_type=token')
        fetch('https://api.imgur.com/3/image', {
            method: "POST",
            body: data,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Client-ID ' + config.imgur.clientId
            }
        })
            .then(res => res.json())
            .then(response => console.log('Success:', JSON.stringify(response)))
            .catch(error => console.error('Error:', error));
    },
    getImage: function (imgId) {
        return fetch(
            'https://api.imgur.com/3/image/' + imgId,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Client-ID ' + config.imgur.clientId
                }
            }
        )
            .then(res => res.json())
            .then(res => {

                if (res.status === 401 || res.status === 400)
                    return {
                        error: "Could not fetch"
                    };

                return res.link
            })
    }
}

module.exports = ImgurHelper;