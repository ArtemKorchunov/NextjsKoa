const Koa = require("koa");
const next = require("next");
const Router = require("koa-router");
const bodyParser = require("koa-body");
const combineRouters = require("koa-combine-routers");
const mongoClient = require('mongodb').MongoClient;

const api = require("./server/controllers");

const port = parseInt(process.env.PORT, 10) || 3002;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dir: './src', dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();
  server.proxy = true;

  mongoClient.connect("mongodb://localhost:27017/", (err, client) => {

    const db = client.db("usersdb");
    const collection = db.collection("users");
    let user = { name: "Tom", age: 23 };
    collection.insertOne(user, function (err, result) {

      if (err) {
        return console.log(err);
      }
      console.log(result.ops);
      client.close();
    });
  });

  server.use(
    bodyParser({
      formidable: { uploadDir: "./uploads" },
      multipart: true,
      urlencoded: true
    })
  );
  router.get("/api/eee", (ctx, next) => {
    ctx.body = "Hello world!"
    next();
  })
  router.get("/", async ctx => {
    await app.render(ctx.req, ctx.res, "/main", ctx.query);
    ctx.respond = false;
  });
  router.get("/dragDrop", async ctx => {
    await app.render(ctx.req, ctx.res, "/dragDrop", ctx.query);
    ctx.respond = false;
  });



  router.use(api.routes(), api.allowedMethods());
  server.use(router.routes());

  router.get("*", async ctx => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200;
    await next();
  });



  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
