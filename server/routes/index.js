let express = require("express");
let router = express.Router();

/* GET /api/message */
router.get("/", function (req, res, next) {
  res.json("Hello from the API!");
});

module.exports = router;
