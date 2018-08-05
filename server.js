const Koa = require("koa");
const next = require("next");
const Router = require("koa-router");
const bodyParser = require("koa-body");
const jwt = require("koa-jwt");
const mongo = require("./server/lib/mongo");
const config = require("./server/config");

const api = require("./server/modules/user");
const auth = require("./server/modules/auth");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dir: "./src", dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();
  server.proxy = true;

  server.use(
    bodyParser({
      formidable: { uploadDir: "./uploads" },
      multipart: true,
      urlencoded: true
    })
  );

  //SSR Pages
  router.get("/", async ctx => {
    await app.render(ctx.req, ctx.res, "/main", ctx.query);
    ctx.respond = false;
  });
  router.get("/dragDrop", async ctx => {
    await app.render(ctx.req, ctx.res, "/dragDrop", ctx.query);
    ctx.respond = false;
  });
  router.get("/signup", async ctx => {
    await app.render(ctx.req, ctx.res, "/signUp", ctx.query);
    ctx.respond = false;
  });

  router.get("*", async ctx => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  router.use(auth.routes(), auth.allowedMethods());

  router.use(
    jwt({
      secret: config.get("jwt:secret")
    })
  );
  router.use(api.routes(), api.allowedMethods());
  server.use(router.routes());

  server.use(function(ctx, next) {
    return next().catch(err => {
      if (401 == err.status) {
        ctx.status = 401;
        ctx.body =
          "Protected resource, use Authorization header to get access\n";
      } else {
        throw err;
      }
    });
  });

  server.listen(config.get("port"), () => {
    console.log(`> Ready on http://localhost:${config.get("port")}`);
  });
});
