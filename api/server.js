const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const SERVER_PORT = 3000;

server.use(middlewares);

server.use("/api", router);

server.listen(SERVER_PORT, () => {
  console.log(`JSON Server is running on port ${SERVER_PORT}`);
});
