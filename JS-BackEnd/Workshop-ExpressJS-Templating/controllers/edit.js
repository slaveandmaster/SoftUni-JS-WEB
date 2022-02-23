module.exports = {
   async get(req,res) {
        const id = req.params.id;
        const product = await req.storage.getById(id);
        res.render('edit', {product, title: "Edit Product"})
    },
    async post(req,res) {
        const id = req.params.id;
        
        const product = {
            name: req.body.name,
            price:req.body.price
        }
        await req.storage.update(id, product);
        res.redirect('/');
    }
}