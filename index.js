// Setup express and ejs
var express = require ('express')
var ejs = require('ejs')

// Create the express application object
const app = express()
const port = 8000

// Define our application-specific data
// app.locals.appData = {appName: "FitApp"}

// Tell Express that we want to use EJS as the templating engine
app.set('view engine', 'ejs');

// Set up public folder (for css and static js)
app.use(express.static('public'))

//Load the route handlers
const mainRoutes = require("./routes/main");  
app.use('/', mainRoutes);

// Start the web app listening
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
