var Promise = require('bluebird')
var mongoose = Promise.promisifyAll(require('mongoose'))
var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

var routes = require('./routes/')
var adminRoutes = require('./routes/admin')

console.log('NODE_ENV', process.env.NODE_ENV)
if(process.env.NODE_ENV === 'production') {
  mongoose.connect(process.env.MONGOHOST, function() {
    console.log('mongoose connected on', process.env.MONGOHOST)
  })
} else {
  var uri = 'mongodb://' + process.env.DB_PORT_27017_TCP_ADDR + ':27017/cycles'
  mongoose.connect(uri, function() {
    console.log('mongoose connected on', uri)
  })
}

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser('thisismysecretcycles'))
app.use(express.static(path.join(__dirname, 'public')))

var checkAuthorization = function (req, res, next) {
  if(!req.signedCookies.user) {
    res.redirect('/login')
  } else {
    next()
  }
}

app.get('/', routes.getIndex)

app.get('/login', adminRoutes.getLogin)
app.post('/login', adminRoutes.postLogin)

app.get('/admin/', checkAuthorization, adminRoutes.getDashboard)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})


module.exports = app
