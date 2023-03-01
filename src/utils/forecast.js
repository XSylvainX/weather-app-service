const request = require('postman-request')


//weather stack


const accessKey = process.env.W_KEY;

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.weatherstack.com/current?access_key=${accessKey}&query=` + latitude + ',' + longitude

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
                ' The precipitation rate is ' + body.current.precip + ' %, ' + ' the humidity rate is ' + body.current.humidity + ' %' + ' and the uv index is ' + body.current.uv_index + '.'
            )
        }
    })
}

module.exports = forecast
