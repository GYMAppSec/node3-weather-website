const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app= express()

const sendError = (res, errorMsg) => {
    res.send({
        error: errorMsg
    })
}


app.use(express.static(path.join(__dirname,'../public')))

app.set('view engine','hbs')
app.set('views', path.join(__dirname,'../templates/views'))
hbs.registerPartials(path.join(__dirname,'../templates/partials'))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Andrew Mead',
        helptext: 'This is some hlepful text.'
    })
})




app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode (req.query.address, (error, {latitude,longtitude,location} = {}) => {
        if (error){
            return sendError (res, error);
        } else {
            forecast(latitude, longtitude, (error, forecastData) => {
                if (error){
                    return sendError (res, error);
                } else {
                    res.send ({
                        forecast: forecastData,
                        location: location
                    })
                }               
         })
        }  
        
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Help article not found',
        name: 'Andrew Mead'
    })    
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found',
        name: 'Andrew Mead'
    })    
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})