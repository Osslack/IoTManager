var express = require('express');

var app = express();
let router = new express.Router();

router.get('/', (req,res) => {
  console.log("test");
  res.send('Test');
})

router.get('/date', (req,res) => {
  console.log(Date.now())
  res.send(Date.now());
})

router.post('/', (req,res) => {
  console.log('POST');
  res.send('POST');
})

app.use('', router);
app.listen(1337);
console.log("App running on port 1337")
module.exports = app;
