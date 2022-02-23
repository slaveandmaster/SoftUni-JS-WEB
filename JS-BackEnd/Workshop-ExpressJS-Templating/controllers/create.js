module.exports = {
    get(req, res) {
        res.render('create', {title: "Add new product"});
    },
    post(req,res) {
        
        const product = {
            name: req.body.name,
            price: req.body.price,
            imageUrl: req.body.imageUrl || "noImage.jpg"
        }
        req.storage.addProduct(product);
        res.redirect('/');
    }
}