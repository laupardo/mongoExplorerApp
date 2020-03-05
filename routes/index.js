var express = require("express");
var router = express.Router();
const mu = require("../db/MongoUtils.js");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/getDbs", function(req, res) {
  mu.dbs()
    .then(dbs => {
      console.log(dbs.databases);
      return res.json(dbs.databases);
    })
    .catch(err => console.log(err));
});

router.get("/getCollections", function(req, res) {
  mu.collectionsDb("some-mongo")
    .then(col => {
      console.log(col);
      return res.json(col.Collections);
    })
    .catch(err => console.log(err));
});

module.exports = router;
