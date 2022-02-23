const routes = {};

function main(req, res) {
  console.log(">>>", req.method, req.url);

  const url = new URL(req.url, `http://${req.headers.host}`);
  req.url = url;

  let action = routes[url.pathname];

  let handler;
  if (action) {
    handler = action[req.method];
  }
  if (typeof handler == "function") {
    handler(req, res);
  } else {
    defaultPage(req, res);
  }
}

function register(method, pathname, handler) {
  if (routes[pathname] == undefined) {
    routes[pathname] = {};
  }
  routes[pathname][method] = handler;
}

function get(pathname, handler) {
  register("GET", pathname, handler);
}

function post(pathname, handler) {
  register("GET", pathname, handler);
}

function defaultPage(req, res) {
  res.statusCode = 404
  res.write("Page not exist!");
  res.end();
}

module.exports = {
  register,
  get,
  post,
  main,
};
