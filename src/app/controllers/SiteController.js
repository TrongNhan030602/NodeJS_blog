class SiteController {
    // [GET] /      --> homePage
    index(req, res) {
        res.render('home');
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController; // Tạo một obj và export ra