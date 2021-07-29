const request = require('postman-request')


//weather stack

//destructuring code 

// const forecast = (latitude,longitude,callback) => {
//     const url = 'http://api.weatherstack.com/current?access_key=95bffb7846985ae9d9486b87d43bd668&query=' + latitude + ',' +longitude

//     request({ url: url, json: true }, (error, response) => {
//         //handler for low-level errors
//         if (error) {
//             callback('unable to connect to weather service ',undefined)
//         } else if (response.body.error) {
//             callback('unable to find location',undefined)
//         } else {
//             callback(undefined,{
//             weatherDescription : response.body.current.weather_descriptions[0],
//             temperature : response.body.current.temperature,
//             tempFeellike : response.body.current.feelslike,
//             })

//         }
//     })
// }

// destructuring code 

const accessKey = process.env.W_KEY;

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${accessKey}&query=` + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        //handler for low-level errors
        if (error) {
            callback('unable to connect to weather service ', undefined)
        } else if (body.error) {
            callback('unable to find location', undefined)
        } else {
            callback(undefined,
                'At ' + body.location.localtime + ', the weather is ' + body.current.weather_descriptions[0] + ' it currently ' +
                + body.current.temperature + ' degrees out.There is a ' + body.current.feelslike + ' degrees for the feelslike temp. ' +
                ' The wind direction is ' + body.current.wind_dir + ', and wind speed is ' + body.current.wind_speed + ' Km/h.' +
                ' The precipitation rate is, ' + body.current.precip + ' %, ' + ' the humidity rate is ' + body.current.humidity + ' %' + ' and the uv index is ' + body.current.uv_index + '.'
            )
        }
    })
}

module.exports = forecast