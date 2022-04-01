const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

var items = ['First Item'];
var workItems = [];





app.get("/",function(req,res){
    let today = new Date();
    let options = {
        weekday:"long",
        day:"numeric",
        month:"long"
    };
    let day = today.toLocaleDateString("en-US",options);
    res.render("list",{listTitle:day,newList:items});
});

app.get("/work",function(req,res){
    res.render("list",{listTitle:"Work List",newList:workItems})
})

app.post("/",function(req,res){
    var item = req.body.newItem;
    console.log(req.body);
    if(req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    }else{
    items.push(item);
    res.redirect("/");
    }
})

app.listen(3000,function(){
    console.log("Listening to the server");
})