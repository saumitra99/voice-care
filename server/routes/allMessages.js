const express = require("express");
const router = express.Router();
var bodyParser = require("body-parser");

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
// import controllers
const {
  getAllMessage,
  postUpdatedJson,
  postMarkSeen,
} = require("../controllers/messages");

// import middlewares

// api routes
router.get("/all-messages", getAllMessage);
router.post("/mark-seen", jsonParser, postMarkSeen);
router.post("/update-json", jsonParser, postUpdatedJson);

module.exports = router;
