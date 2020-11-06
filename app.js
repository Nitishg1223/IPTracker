const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const https=require("https");
const api=require(__dirname+"/apikey.js");
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const apiKey=api.getApi();

var ipa="";
app.get("/",function(req,res){

    var apiUrl="https://geo.ipify.org/api/v1?apiKey="+apiKey+"&ipAddress="+ipa;

    https.get(apiUrl,function(response){

      if(response.statusCode==200){
      response.on("data",function(data){
        const w=JSON.parse(data);
        var ipadd,location,timezone,isp,long,lat;
        res.render("index",{
          ipadd:w.ip,
          location:w.location.city+", "+w.location.region+", "+ w.location.country,
          timezone:w.location.timezone,
          isp:w.isp,
          long:w.location.lng,
          lat:w.location.lat
        });
      });}
      else
      {

        res.redirect("/");
      }
});
});

app.post("/",function(req,res){

   ipa=req.body.address;

res.redirect("/");


});

app.listen(3000,function(){
  console.log("server started on port 3000");
});
