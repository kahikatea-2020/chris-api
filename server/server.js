const path = require('path')
const express = require('express')
const server = express()
const request = require('superagent')


server.use(express.json())
server.use(express.static(path.join(__dirname, './public')))


const api_key = 'FgVNcneIRma0cMl5yMNQbqTcDVf92gBBECmwGdpM'

server.get('/api/getPictures', (req, res) => {

    const url = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000'

    console.log("testing 1");

    request.get(url)
        .query({ api_key: api_key })
        .then(apiRes => {


            res.json(apiRes.text)
        })
})

module.exports = server
