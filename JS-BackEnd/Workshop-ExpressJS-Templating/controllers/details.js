module.exports = {
    async details(req, res) {
        const product = await req.storage.getById(req.params.id);
        if (product) {
            
            res.render('details', {product, title: "Details for product"});
        }
        else {
            res.redirect('404');
        }
    }
}