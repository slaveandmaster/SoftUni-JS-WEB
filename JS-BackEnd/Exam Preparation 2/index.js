const express = require("express");
const expressConfig = require("./config/express");
const initDb = require('./config/database');
const routesConfig = require('./config/routes')

start();
async function start() {
  const app = express();
  expressConfig(app);
  await initDb(app);
  routesConfig(app);
 
  app.get('/', (req, res) => {
    console.log(req.session)   
    res.render('home', { layout: false });
});

  app.listen(3000, () => console.log("Server starded on port 3000!"));
}
