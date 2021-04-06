require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const express = require("express");
var history = require("connect-history-api-fallback");
const serveStatic = require("serve-static");
const path = require("path");
const app = express();

app.use(
  history({
    verbose: true,
  })
);

app.use(serveStatic(path.join(__dirname, "dist")));
const port = process.env.PORT || 7777;

app.listen(port, () => {
  console.log(`Server.js listening at port ${port}`);
});
