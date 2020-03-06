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

router.get("/getCollections/:db", function(req, res) {
  mu.collectionsDb(req.params.db)
    .then(col => {
      return res.json(col);
    })
    .catch(err => console.log(err));
});

router.get("/getDocs/:db/:col", function(req, res) {
  console.log(req.params.db);
  mu.docsCollectionDb(req.params.db, req.params.col)
    .then(docs => {
      return res.json(docs);
    })
    .catch(err => console.log(err));
});

router.get("/getNewest/:db/:col/", function(req, res) {
  mu.lastRecordCollectionDb(req.params.db, req.params.col)
    .then(docs => {
      return res.json(docs);
    })
    .catch(err => console.log(err));
});

module.exports = router;
