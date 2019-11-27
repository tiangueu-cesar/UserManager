var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var userList =[];
  userList.push({name: 'Christian', nachname: 'Peter'});
  res.send(userList);
});

module.exports = router;
