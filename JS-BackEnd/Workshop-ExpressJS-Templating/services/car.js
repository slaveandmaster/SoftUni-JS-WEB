const fs = require('fs').promises;

function productViewModel(product) {
    return {
        id: product.id,
        name: product.name,
        imageUrl: product.imageUrl || "noImage.jpg",
        price: product.price
    }
}

async function read() {
    try {
        const data = (await fs.readFile('./services/data.json'));
        return JSON.parse(data);
        
    } catch (error) {
        console.log('Error reading file');
        process.exit(1);
    }
}

async function write(data) {
    //const data = await read();
    try {
        await fs.writeFile('./services/data.json', JSON.stringify(data, null, 2));
        
    } catch (error) {
        console.log('Error write to file');
        process.exit(1)
    }

}

async function getAll(query) {
    
    const data = await read();
    let products = Object.entries(data).map(([id, item]) => Object.assign({}, item, { id } ));
    if (query.search) {
        
        products = products.filter(p => p.name.toLocaleLowerCase().includes(query.search.toLocaleLowerCase()))
    }
    if (query.from) {
        products = products.filter(p => p.price >= Number(query.from));
    }
    if (query.to) {
        products = products.filter(p => p.price <= Number(query.to));
        
    }
   return products;
}

async function getById(id){
    const data = await read();
    let product = Object.entries(data).map(([id, item]) => Object.assign({}, item, {id}) );
    product = product.filter(p => p.id == id);
    return productViewModel(product[0]);
}

async function addProduct(product){
    const data = await read();
    let id;

    // do {
        id = nextId();

    // } while(data.hasOwnProperty(id));

    data[id] = product;
    await write(data); 

    
}

async function update(id,product) {
    const data = await read();
    data[id] = product;

    await write(data);
}

async function deleteProduct(id) {
    const products = await read();

    if (products.hasOwnProperty(id)) {
        console.log(products[id]);
        delete products[id];
        await write(products);    
    }
    else {
        throw new ReferenceError('No such Id in database!');
    }
}

function nextId() {
    return 'xxxxxx'.replace(/x/g, () => (Math.random() * 16 | 0).toString(16));
}
module.exports = () => (req,res,next) => {
    req.storage = {
        getAll,
        getById,
        addProduct,
        update,
        deleteProduct
    };
    next();
}