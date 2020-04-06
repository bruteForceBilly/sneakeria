const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const SERVER_PORT = 3000;

server.use(middlewares);

// Search
server.get("/api/products/:key/", (req, res) => {
  res.redirect(`/api/products?q=${Object.values(req.params)[0]}`);
});

// // Section
// server.get("/api/products/section/:section", (req, res) => {
//   res.redirect(`/api/products?section=${req.params.section}`);
// });

// server.get(
//   "/api/products/section/:section/campaigns/:campaigns",
//   (req, res) => {
//     res.redirect(
//       `/api/products?section=${req.params.section}&campaigns=${req.params.campaigns}`
//     );
//   }
// );

// server.get(
//   "/api/products/section/:section/campaigns/:campaigns/look/:look",
//   (req, res) => {
//     res.redirect(
//       `/api/products?section=${req.params.section}&campaigns=${req.params.campaigns}&look=${req.params.look}`
//     );
//   }
// );

// server.get(
//   "/api/products/section/:section/campaigns/:campaigns/look/:look/brand/:brand",
//   (req, res) => {
//     res.redirect(
//       `/api/products?section=${req.params.section}&campaigns=${req.params.campaigns}&look=${req.params.look}&brand=${req.params.brand}`
//     );
//   }
// );

server.use("/api", router);

server.listen(SERVER_PORT, () => {
  console.log(`JSON Server is running on port ${SERVER_PORT}`);
});
