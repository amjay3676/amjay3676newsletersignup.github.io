//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const { post } = require("request");
const { json } = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
  const firstname = req.body.fname;
  const lastname = req.body.lname;
  const email = req.body.email;
  //console.log(firstname, lastname, email);
  var data= {
    members: [
      {
        email_address : email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstname,
          LNAME: lastname,
        }
      }
    ]
  
  };
  var jsonData= JSON.stringify(data);
  
  
  var option = {
    url: "https://us2.api.mailchimp.com/3.0/lists/2f16abd6a1",
    method : "post",
    headers :{
      "authorization": "Manoj 18a3a4b23ac81e9446c0fc2008fdcedc-us2"
    },
    body: jsonData
   
  };
  
  
  
  request(option, function(error, response, body){
    if (error){
      res.sendFile(__dirname + "/failure.html");
    }
    else{
      if(response.statusCode ===  200){
        res.sendFile(__dirname + "/success.html");
      }
      else{
        res.sendFile(__dirname + "/failure.html");
      }
    }
    
  
  })
  app.post("/failure.html", function(req, res){
    res.redirect("/")
  })
});



app.listen(process.env.PORT || 3000, function () {
  console.log("server is running on port 3000");
});





//api key
//18a3a4b23ac81e9446c0fc2008fdcedc-us2
//list id
//2f16abd6a1