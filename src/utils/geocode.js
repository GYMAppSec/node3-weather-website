const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiamFtZXNnYW94dTIwMDQiLCJhIjoiY2t2Y3ljcG5qNnpsbDJ4cGduaHVxdWN6dSJ9.td2h6rmugaXyaYOZgNjpRQ&limit=1'
    
    request({url:url, json: true}, (error,response) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (response.body.features.length == 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            const latitude = response.body.features[0].center[0]
            const longtitude = response.body.features[0].center[1]
            const location = response.body.features[0].place_name
            callback(undefined, {latitude, longtitude, location})
            
         }
        
    })
}

module.exports = geocode