const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const web = require('path');

const app = express();
const PORT = process.env.PORT;

// app.use(morgan("combined"));
// app.use(express.static(web.join(__dirname, "/public/")));

app.set("views","./src/views");
app.set("view engine", "ejs");

app.get("/", (req,res) => {
    res.render('index',{username: "Niwiar"});
})

app.listen(PORT, () => {
    console.log("Listening on port: " + chalk.green(PORT));
})