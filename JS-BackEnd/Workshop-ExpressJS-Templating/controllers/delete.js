module.exports = {
    async get(req, res) {
        const product = await req.storage.getById(req.params.id);
        //console.log(product) 
        if (product) {
            
            res.render('delete', {product, title: `Delete product - ${product.name}`});
        }
        else {
            res.redirect('404');
        }
    },
    async post(req,res) {
        const id = req.params.id;
        try {
            req.storage.deleteProduct(id);
            res.redirect('/');
        } catch (error) {
            
            res.redirect('/404');
        }
    }
}