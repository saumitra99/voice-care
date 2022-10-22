const express = require("express");
const router = express.Router();
var bodyParser = require("body-parser");

var jsonParser = bodyParser.json();

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
