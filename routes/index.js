const express = require("express");
const router = express.Router();
const socket = require("socket.io");
const $ = require("jquery");

// Just used to testing purposes
router.get("/", (req, res) => {
    res.render("index");
});

module.exports = router;