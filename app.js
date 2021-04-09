// Heroku server requires environment variable "process.env.PORT" to run on their server
const PORT = process.env.PORT || 3000;

// imports && dependencies
const express = require('express');
const app = express();

// bound socket to port
app.listen(PORT);
console.log("Server started at port " + PORT);

// declare root directory for static files
app.use(express.static('public'));
