require('dotenv').config();
const basePath = process.env.HEALTH_BASE_PATH || '';

const express = require("express");
const router = express.Router();

//Define our data
var appData = {appName: "FitApp",
    categories:["Home", "About", "Add activities"]
};

const redirectLogin = (req, res, next) => {
    if (!req.session.userID ) {
      res.redirect(basePath + '/users/login') // redirect to the login page
    } else { 
        next (); // move to the next middleware function
    } 
}

router.get('/login', function (req, res){
    res.render('login.ejs', appData);
})

router.post('/loggedin', function (req, res){
    const username = req.body.username;
    const password = req.body.password;

    const sqlquery = `
    SELECT * FROM users
    WHERE username = ? AND password = ?`;

    db.query(sqlquery, [username,password], function (err, results){
        if (err){
            return res.send("Database error");
        }
        if (results.length === 1 ){
            req.session.userID = results[0].username;
            console.log("Login session:", req.session)
            res.redirect(basePath + '/activities')

        }else{
            res.send("Login failed: Invalid Username or Password");
        }
    })
})

router.get('/logout', function(req,res){
    req.session.destroy(err => {
        if (err) {
          return res.redirect('./')
        }
        res.send('you are now logged out. <a href='+'./'+'>Home</a>');
    })
})

// Export the router object so index.js can access it
module.exports = router;