// [x] initialize and configure Express app
// [x] initialize templating lib
// [x] create home controller
// [x] bind routing
// [x] create layout
// create data service
// - [x] read all
// - [x] read one by Id
// - [x] create
// - [x] search
// - [x] edit
// - [x] delete
// implement controllers
// - [x] home (catalog)
// - [x] about
// - [x] details
// - [x] create
// - [x] improv ed home (search)
// - [x] edit
// - [x] delete
//[] create accessories
//[] attach accessories to car
//[] update details to include accessories
// [x] add front-end code
// [x] add database connection
// [] create Car model
// [x] upgrade car service to use car model
//[x] add validation rules to Car model
// [x] create accessories model
const express = require("express");
const hbs = require("express-handlebars");
const session = require("express-session");

const carsService = require("./services/cars");
const accessoryService = require("./services/accessory");
const authService = require("./services/auth");
const initDb = require("./models/index");

const { home } = require("./controllers/home");
const { about } = require("./controllers/about");
const create = require("./controllers/create");
const { details } = require("./controllers/details");
const edit = require("./controllers/edit");
const deleteCar = require("./controllers/delete");
const accessor = require("./controllers/accessory");
const attach = require("./controllers/attach");
const authController = require('./controllers/auth');

const { notFound } = require("./controllers/notFound");
const { isLoggedIn } = require('./services/util');
//const { application } = require("express");

start();

async function start() {
  await initDb();

  const app = express();

  app.engine(
    "hbs",
    hbs.create({
      extname: ".hbs",
    }).engine
  );
  app.set("view engine", "hbs");

  app.use(express.urlencoded({ extended: true }));
  app.use("/static", express.static("static"));
  app.use(carsService());
  app.use(accessoryService());

  app.use(
    session({
      secret: "my super duper secret",
      resave: false,
      saveUninitialized: true,
      cookie: { secure: "auto" },
    })
  );
  app.use(authService());

  app.get("/", home);
  app.get("/about", about);
  app.get("/details/:id", details);

  app.route("/create").get(isLoggedIn(),create.get).post(isLoggedIn(),create.post);

  app.route("/delete/:id").get(isLoggedIn(),deleteCar.get).post(isLoggedIn(),deleteCar.post);

  app.route("/edit/:id").get(isLoggedIn(),edit.get).post(isLoggedIn(),edit.post);
  app.route("/accessory").get(isLoggedIn(),accessor.get).post(isLoggedIn(),accessor.post);
  app.route("/attach/:id").get(isLoggedIn(),attach.get).post(isLoggedIn(),attach.post);
  app.use(authController);
  
  app.all("*", notFound);

  app.listen(3000, () => console.log("Server started on port 3000"));
}
