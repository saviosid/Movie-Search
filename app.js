// 1- mkdir movie_search_app -- to make app directory
// 2- npm init after changing to app directory -- to create package.json
// 3- npm install --save express -- to install express
// 4- npm install --save request -- to install request


var express = require("express");
var app =express();

var request = require("request");
app.set("view engine", "ejs");


app.get("/", function(req, res){
    res.render("search");
});

app.get("/results", function(req,res){
    
    var query = req.query.search;
    
    var url = "http://www.omdbapi.com/?s="+ query +"&apikey=thewdb";
   request(url,function(error, response, body){
       if(!error && response.statusCode === 200){
           console.log(body);
           
           var parsedData = JSON.parse(body);
           //res.send(parsedData["Search"][0]["Title"]);
           res.render("results",{data: parsedData});
       }
       else{
           console.log(error);
       }
   });
});



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Listening");
})