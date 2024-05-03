const http = require('http');
const express = require('express');
const data = require('./data.json');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use (cors());

let timer = 0;
let url = "";
let query = "";
let groupID = "...";
let isPlay = false;

app.get('/', (req, res) => {
    if(req.query['groupID'] === groupID) {
        console.log("yes");
        return res.send({timer, url, isPlay});
    } else {
        console.log(req.query);
        console.log(groupID);
    };
})


app.post('/', (req, res) => {
    timer = req.body.key;
    url = req.body.url;
    groupID = req.body.groupID;
    isPlay = req.body.isPlay;
    console.log(req.body);
    res.sendStatus(200); // something like this does!
})

app.listen (8000, () => {
  console.log('Server running on port 8004');  
})