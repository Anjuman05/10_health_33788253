// Create a new router
const express = require("express");
const router = express.Router();

//Define our data
var appData = {appName: "FitApp",
    categories:["Home", "About", "Add activities"]
};

// Handle the main routes
router.get("/", (req, res) => {
    res.render("index.ejs", appData)
}); 

router.get("/about", (req, res) => {
    res.render("about.ejs", appData)
})

// router.get('/search', function(req, res, next){
//     res.render("search.ejs");
// });

// router.get('/search_result', function (req, res, next) {
//     //searching in the database
//     res.send(req.query);
//     //res.send("You searched for: " + req.query.keyword)
// });

// Export the router object so index.js can access it
module.exports = router;