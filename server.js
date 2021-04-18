// server.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204


// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/", (req, res) => {
  const { date } = req.params;
  const utcTime = new Date(Date.now())
  res.json({unix: Date.now(), utc: utcTime.toUTCString()})
});

app.get("/api/:date", (req, res) => {
  const { date } = req.params;
  if(isNaN(date)) {
    var valid = (new Date(date)).getTime() > 0;
    if (valid) {
      const unixTime = new Date(date)
      const utcTime = new Date(date);
      res.json({unix: unixTime.getTime(), utc: utcTime.toUTCString()})
    } else {
      res.json({error: "Invalid Date"})
    }
  } else {
    const unixTime = new Date(Number(date))
    res.json({unix : date, utc: unixTime.toUTCString()})
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});

