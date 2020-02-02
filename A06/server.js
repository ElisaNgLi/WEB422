var express = require("express");
var app = express();

var HTTP_PORT = process.env.PORT || 8080;



// setup the static folder 
app.use(express.static("dist/A05")); 

// handle "404" errors
app.use((req, res) => {
    res.sendFile(path.join(__dirname + "/dist/A05/index.html"));
});

// Start the server
app.listen(HTTP_PORT, function(){
    console.log("Server listening on port: " + HTTP_PORT);
});