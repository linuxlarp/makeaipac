const express = require("express");
const path = require("path");

const app = express();
const serverPort = 4700;

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res) => {
  res.status(404);
});

app.use((req, res) => {
  res.status(503);
});

app.listen(serverPort, () => {
  console.log(`Static delivery server is up and running, port: ${serverPort}`);
});
