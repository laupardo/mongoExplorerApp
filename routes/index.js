var express = require("express");
var router = express.Router();
const mu = require("../db/MongoUtils.js");

/* GET home page. */
//router.get("/hey", function(req, res, next) {
//  res.render("index", { title: "Express" });
//});

router.get("/", function(req, res) {
  mu.dbs()
    .then(dbs => {
      const databases = dbs.databases;
      return res.render("index", { dbs: databases });
    })
    .catch(err => console.log(err));
});

router.get("/getCollections/:query", function(req, res) {
  console.log("params", req.params.query);
  mu.collectionsDb(req.params.query)
    .then(col => {
      return res.json(col);
    })
    .catch(err => console.log(err));
});

module.exports = router;
