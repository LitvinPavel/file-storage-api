const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (_req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Origin');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next();
});

app.use(
    cors({
        credentials: true,
        origin: true
    })
);
app.options('*', cors());

mongoose.connect('mongodb+srv://PVLitvin:fiddleroff@file-storage-api.wxo2q.mongodb.net/test',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

require("./controllers/file-controller")(app);

app.listen(process.env.PORT || 3000, () =>
    console.log("Server is running @3000 ...")
);