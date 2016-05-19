var express = require('express');

var app = express();
let router = new express.Router();

router.get('/', (req,res) => {
  console.log("test");
  res.send('Test');
})

router.get('/date', (req,res) => {
  let timestamp = Date.now();
  console.log(timestamp);
  res.send("Timestamp " + timestamp.toString());
})

router.post('/', (req,res) => {
  console.log('POST');
  res.send('POST');
})

router.use('*', (req,res) => {
  console.log("You just got caught in the Catch All Route");	
  res.send("Catch All Route");
})

app.use('', router);
app.listen(1337);
console.log("App running on port 1337")
module.exports = app;
