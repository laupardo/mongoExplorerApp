var express = require("express");
var router = express.Router();
const MongoUtils = require("../db/MongoUtils.js");
const mu = MongoUtils();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/getDbs", function(req, res) {
  mu.connect()
    .then(mu.dbs)
    .then(dbs => {
      res.json(users);
    })
    .catch(err => console.log(err));
});

module.exports = router;
