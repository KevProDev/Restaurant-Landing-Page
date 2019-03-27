const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')
/// Creating my express app

const app = express() 


//create middleware to handle the serving of the app
app.use('/', serveStatic(path.join(__dirname, '/dist')))


//create default pport to serve the app
const port = process.env.Port || 5000
app.listen(port)

console.log("server started on port" + port);
console.log(__dirname)