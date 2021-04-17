const express = require("express");
const cors = require("cors");
const app = express();
var db = require("./db.json");
const PORT = 5000;

const whitelist = [
  "http://localhost",
];

const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  },
  methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
  allowedHeaders: "accept, content-type",
};

app.use(cors(corsOptions));

app.use(express.json());

app.get("/", (req, res) => {
  res.header("Content-Type", "application/json");
  res.json(db);
});

app.listen(PORT, (err) => {
  console.log("Listening on port:", PORT);
});