const express = require('express');
const bodyParser = require('body-parser');
const compress = require("compression");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(compress());
app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/ping',  (req, res) => {
  console.log("pong");
  return res.send('pong'); 
});

app.post('/api/subscribe', (req, res) => {
  const { email  } = req.body;
  const random = Math.floor((Math.random() * 3) +1 );
  
  if (random == 1){  
    // Success
    return res.status(200).send({message: 'OK'})
  }else if (random == 2){
    // Email exists
    return res.status(409).send({message: "Email already exists"});
  }else{
    return res.status(500).send({message: "Internal error"});
  }
  //console.dir(req)
  return res.send({message:'subscribe '+random}); 
});


app.get('/', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header('Cache-Control', 'no-cache');
  res.sendFile(path.join(path.dirname(__dirname), 'build', 'index.html'));
});



app.listen(8000, () => { console.log("server ready listening on port 8000")});

