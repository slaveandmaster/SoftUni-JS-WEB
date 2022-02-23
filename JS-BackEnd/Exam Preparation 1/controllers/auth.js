const router = require("express").Router();
const { isGuest, isUser } = require("../middleware/guard");
const { register, login } = require("../services/user");
const {mapError} = require("../util/mapper");

router.get("/register", isGuest(), (req, res) => {
  res.render("register");
});
router.post("/register", isGuest(), async (req, res) => {
  try {
    if (req.body.password.trim() == "") {
      throw new Error("Password is required");
    } else if (req.body.password != req.body.repeatPassword) {
      throw new Error("Password don`t match");
    }

    const user = await register(
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.password
    );
    req.session.user = user;
    res.redirect("/");
  } catch (error) {
    const errors = mapError(error);
    data = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    };
    res.render("register", { title: "Register Page", data, errors });
  }
});
router.get("/login", isGuest(), (req, res) => {
  res.render("login");
});
router.post("/login", isGuest(), async (req, res) => {
  try {
    if (req.body.password.trim() == "" || req.body.email.trim() == "") {
        throw new Error("Email and Password is required"); 
    } else {
        const user = await login(req.body.email, req.body.password);
        req.session.user = user;
        res.redirect("/");

    }
  } catch (error) {
    const errors = mapError(error);
    res.render("login", {
      title: "Login Page",
      data: { email: req.body.email },
      errors,
    });
  }
});

router.get("/logout", isUser(), (req, res) => {
  delete req.session.user;
  res.redirect("/");
});
module.exports = router;
