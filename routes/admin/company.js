var Company = require('../../models/company')

exports.getCreate = function (req, res) {
  res.render('admin/company/create')
}

exports.postCreate = function (req, res) {
  var name = req.body.name

  new Company({
    name: name
  }).saveAsync().then(function (company) {
    res.redirect('/admin/')
  }).catch(function (err) {
    console.log(err)
    res.sendStatus(500)
  })
}

exports.getList = function (req, res) {
  Company.find().then(function (companies) {
    res.render('admin/company/list', {
      companies: companies
    })
  }).catch(function (err) {
    console.log(err)
    res.sendStatus(500)
  })
}
