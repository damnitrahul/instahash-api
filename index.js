// Require the framework and instantiate it
const fetch = require("node-fetch");
const app = require("fastify")({
  logger: true,
});

// CORS
app.register(require("fastify-cors"), (instance) => (req, callback) => {
  let corsOptions;
  if (/localhost/.test(req.origin)) {
    corsOptions = { origin: false };
  } else {
    corsOptions = { origin: true };
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
});

// Routes
app.get("/tags", async (req, reply) => {
  const { q } = req.query;
  if (!q) reply.callNotFound();
  fetch(
    `https://www.instagram.com/web/search/topsearch/?context=blended&count=10&query=%23${q}&rank_token=5&include_reel=true`
  )
    .then((res) => res.json())
    .then((res) => reply.send(res))
    .catch((e) => reply.callNotFound());
});

app.get("/search", async (req, reply) => {
  const { q } = req.query;
  if (!q) reply.callNotFound();
  fetch(
    `https://www.instagram.com/web/search/topsearch/?context=blended&count=10&query=${q}&rank_token=5&include_reel=true`
  )
    .then((res) => res.json())
    .then((res) => reply.send(res))
    .catch((e) => reply.callNotFound());
});

app.get("/profile", async (req, reply) => {
  const { q } = req.query;
  if (!q) reply.callNotFound();
  fetch(`https://www.instagram.com/${q}/?__a=1`)
    .then((res) => res.json())
    .then((res) => reply.send(res))
    .catch((e) => reply.callNotFound());
});

// Run the server!
app.listen(3000, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`server listening on ${address}`);
});
