const express = require("express");
const path = require("path");

const app = express();
const serverPort = 4700;

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res) => {
  res.status(404).send("404 - Not found");
});

app.use((err, req, res, next) => {
  res.status(500).send("500 - Internal server error");
});

app.listen(serverPort, () => {
  console.log(`Static delivery server is up and running, port: ${serverPort}`);
});
