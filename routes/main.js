// Create a new router
const express = require("express");
const router = express.Router();
//Define our data
var appData = {appName: "FitApp"};

// Handle the main routes
router.get("/", (req, res) => {
    res.render("index.ejs", appData)
}); 

router.get("/about", (req, res) => {
    res.render("about.ejs")
})

// Export the router object so index.js can access it
module.exports = router;