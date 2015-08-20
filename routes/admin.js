exports.getLogin = function (req, res) {
  res.render('admin/login')
}

exports.postLogin = function (req, res) {
  console.log(req.body)
  res.send('ok')
}

exports.getCompanies = function (req, res) {
  Company.find().then(function(companies) {
    res.send(companies)
  }).catch(function () {
    res.sendStatus(500)
  })
}
