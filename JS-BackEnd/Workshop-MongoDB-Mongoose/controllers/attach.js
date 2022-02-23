module.exports = {
  async   get(req, res){
        const id = req.params.id;

        try {
           const [ car, accessories ] = await Promise.all([
               req.storage.getById(id),
               req.accessory.getAllAccessory()
            ]);
        if (car.owner != req.session.user.id) {
            console.log('You are not owner');
            res.redirect('/login');
        }

           const existingIds = car.accessories.map(a => a.id.toString())
           const avaliableAccessories = accessories.filter(x => existingIds.includes(x.id.toString()) == false )
            res.render('attach', {title: 'Attach Accessory', car, accessories: avaliableAccessories})
        } catch (err) {
            res.redirect('404');
        }
    },
    async post(req, res){
        const carId = req.params.id;
        const accessoryId = req.body.accessory;
        try {
            await req.storage.attachAccessory(carId, accessoryId, req.session.user.id);
            res.redirect('/');
        } catch (err) {
           console.log('Error attaching accessories');
           console.log(err.message);
           res.redirect('/attach/'+ carId) 
        }
        // console.log(req.body, req.params.id);
    }
}