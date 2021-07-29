const path = require('path')
const express = require('express')
const hbs = require('hbs')
require('dotenv').config()

// console.log(process.env)

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
// the default folder for express is 'views', if I change the name by 'templates', I must create a new path for it
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs') //<-- setup engine
app.set('views', viewsPath)  //<-- setup dynamic path
hbs.registerPartials(partialsPath)

//setup static directoru to serve
app.use(express.static(publicDirectoryPath))


//request
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        formtitle: 'Get your weather forecast !!',
        mylocation: 'Please input your location',
        name: 'Sylvain',
        lastname: ' Carlier'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Sylvain',
        lastname: ' Carlier'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helptext: 'Liens utiles',
        urlone: 'https://docs.mapbox.com/api/search/geocoding/',
        linkone: 'MapBox Geocoding API',
        urltwo: 'https://weatherstack.com/',
        linktwo: 'WeatherStack API',
        urlthree: 'https://handlebarsjs.com/',
        linkthree: 'Handlebars',
        title: 'Help',
        name: 'Sylvain',
        lastname: ' Carlier'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })

    }
    // add empty object default values ={}
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address,
            })
        })
    })
})


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    else {
        console.log(req.query.search)
        res.send({
            products: []
        })
    }

})


//error pages 

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sylvain',
        errorMessage: 'Help article not exist'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sylvain',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('server is up on port' + port)
})

