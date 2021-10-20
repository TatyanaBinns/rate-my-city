const express = require('express')
const bodyParser = require("body-parser");


const app = express()
let port = process.env.PORT;
if (port == null || port == "")
  port = 8080;

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));






app.get('/', (req, res) => {
    res.json({ message: "Welcome to a simple hello-world application." });
})

app.listen(port, () => {
	  console.log(`Example app listening on port ${port}`)
})