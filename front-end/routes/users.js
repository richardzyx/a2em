var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get("/login", function (req, res) {
  res.sendfile("../startbootstrap-sb-admin-1.0.3/login.html", {root: __dirname});
});

module.exports = router;
