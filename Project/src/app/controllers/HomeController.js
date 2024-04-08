class HomeController {
  index(req, res) {
    res.send("HOME PAGE");
  }
}

module.exports = new HomeController();
