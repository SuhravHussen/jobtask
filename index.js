const express = require("express");
const app = express();
// const bodyParser = require("body-parser");
const cors = require("cors");
const request = require('request')
require("dotenv").config();
const port = process.env.PORT || 4000;
app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
  
  app.get('/jobs', (req, res) => {
    request(
      { url: 'https://jobs.github.com/positions.json?' },
      (error, response, body) => {
        if (error || response.statusCode !== 200) {
          return res.status(500).json({ type: 'error', message: err.message });
        }
  
        res.json(JSON.parse(body));
      }
    )
  });

  app.get('/', (req, res) => {
   res.send('welcome to server')
  });

  app.post('/search', (req, res) => {
      const search = req.body
   
      
    request(
      { url: `https://jobs.github.com/positions.json?search=${search.search}` },
      (error, response, body) => {
        if (error || response.statusCode !== 200) {
          return res.status(500).json({ type: 'error', message: err.message });
        }
  
        res.json(JSON.parse(body));
      }
    )


  });
  app.listen(port, () => console.log(`listening on ${port}`));