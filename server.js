const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const port = 9000;

const login = require("./Files/login");
const index = require("./Files/index");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(login);
app.use(index);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
