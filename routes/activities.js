// Create a new router
const express = require("express")
const router = express.Router()

//makes sures user is logged in
const redirectLogin = (req, res, next) => {
    if(!req.session.userID) {
        return res.redirect('/users/login');
    }
    next();
    
};

router.get('/', redirectLogin, (req,res) => {
    const sql =`
    SELECT * FROM activities
    WHERE username = ?
    ORDER BY activity_date DESC`;

    db.query(sql, [req.session.userID], (err,results) =>{
        if(err){
            console.error(err);
            return res.send("Database Error")
        }

        res.render('activities.ejs', {
            appName: 'FitApp',
            activities:results,
            username: req.session.userID
        })
    })
})

router.get('/add', redirectLogin, (req, res) =>{
    res.render('add_activity.ejs',{
        appName: 'FitApp',
        username: req.session.userID
    });
});

router.post('/added', redirectLogin, (req,res) => {

    if(!req.session.userID){
        return res.redirect('/users/login');
    }
    
    const {activity, duration, activity_date, notes} = req.body;
    const username = req.session.userID;

    const sql = `
    INSERT INTO activities
    (username, activity, duration, activity_date, notes)
    VALUES (?,?,?,?,?)`;

    db.query(
        sql,[username, activity, duration, activity_date, notes],
        (err, result)=>{
            if(err){
                console.error(err);
                return res.send("Database error")
            }
            res.send(`
                <h1>Activity Added</h1>
                <p>${activity} saved successfully.</p>
                <a href="/activities/add"> Add another Activity</a>`);
        }
    )
});

// router.get('/search', redirectLogin, (req,res) =>{
//     res.render('search.ejs',{
//         appName:'FitApp'
//     })
// })

router.get('/search', redirectLogin, (req,res) =>{
    const keyword = req.query.keyword;
    const username = req.session.userID;

    if (!keyword){
        return res.render('search.ejs',{
            appName:'FitApp'
        })
    }

    const sql = `
    SELECT *
    FROM activities
    WHERE username = ?
    AND (activity LIKE ? OR notes LIKE ?)`;

    const searchTerm = `%${keyword}%`;

    db.query(sql, [username, searchTerm, searchTerm], (err, results) =>{
        if(err){
            console.error(err)
            return res.send("Database error")
        }
        res.render('activities.ejs', {
            appName: 'FitApp',
            activities: results,
            username: username
        });
    });
});
// Export the router object so index.js can access it
module.exports = router