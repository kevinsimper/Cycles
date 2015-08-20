var User = require('../models/User')
var Promise = require('bluebird')
var bcrypt = Promise.promisifyAll(require('bcrypt'))

exports.getLogin = function (req, res) {
  res.render('admin/login')
}

exports.postLogin = function (req, res) {
  var email = req.body.email
  var password = req.body.password

  User.findOne({
    email: email
  }).then(function (user) {
    return bcrypt.compareAsync(password, user.password)
  }).then(function (valid) {
    if(valid) {
      res.send('ok')
    } else {
      res.send('invalid')
    }
  }).catch(function (err) {
    console.log(err)
    res.sendStatus(500)
  })
}

exports.createUser = function (req, res) {
  var salt = bcrypt.genSaltAsync(10).then(function (salt) {
    return bcrypt.hashAsync(req.body.password, salt)
  }).then(function (hash) {
    return new User({
      email: req.body.email,
      password: hash
    }).save()
  }).then(function (user) {
    res.send('ok')
  })
}

exports.getCompanies = function (req, res) {
  Company.find().then(function(companies) {
    res.send(companies)
  }).catch(function () {
    res.sendStatus(500)
  })
}
