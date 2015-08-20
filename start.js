var app = require('./app')
var debug = require('debug')('Cycles:server')
var http = require('http')

var port = process.env.PORT || '3000'

app.listen(port, function () {
  console.log('Listening on ' + port)
})