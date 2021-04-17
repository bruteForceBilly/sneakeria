const jsonServer = require('json-server')
const app = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const cors = require("cors");
var db = require("./db.json");
const PORT = 3000;

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

app.use('/api', router)

app.use(middlewares)
app.use(router)

app.listen(PORT, () => {
  console.log('JSON Server is running on port:', PORT)
})