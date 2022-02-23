module.exports = {
   async home(req, res) {
        const products = await req.storage.getAll(req.query);
        
        res.render('home', {products, title: 'Home page', query: req.query});
    }
}