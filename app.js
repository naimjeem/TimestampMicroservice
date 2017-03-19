var express = require("express");
var app = express();
var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
var result = {unix: null, natural: null};
function getDate(unix){
   var d = new Date(unix * 1000),
    YY = d.getFullYear(),
    MM = monthNames[d.getMonth()],
    DD = ('0' + d.getDate()).slice(-2);
    var s = {};
    s.unix = parseInt(unix, 10),
    s.natural = MM+" "+DD+", "+YY;
    return s;
}

app.use('/', function (req, res) {
  var date = decodeURIComponent(req.url.slice(1));
  if(date === ""){
    res.sendFile( __dirname + "/index.html");
  }else{
    if(isNaN(date)==false){
      result = getDate(date);
    }else if(!isNaN(Date.parse(date))){
      result = getDate(Date.parse(date)/1000);
    }else{
      result = {unix: null, natural: null};
    }
    res.send(result);
  }
}).listen(3000);