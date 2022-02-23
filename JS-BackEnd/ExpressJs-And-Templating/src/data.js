const fs = require('fs').promises;

async function readFile() {
    const data = JSON.parse((await fs.readFile('./src/product.json')).toString());
    return data;
}

async function writeFile() {
   const data = readFile();
   await fs.writeFile('./src/product.json', JSON.stringify(data, null, 2));
   
}

async function getProducts() {
    const data = await readFile();
    return Object.entries(data).map(([id, item]) => Object.assign({}, item, { id }))
}
async function getProductById(id) {
    const data = await readFile();
    return data[id];
}

function nextId() {
    return 'xxxxxxxx'.replace(/x/g, () => (Math.random() * 16 | 0).toString(16));
}

async function createProduct(product){
    const data = await readFile();
    let id = nextId();
    data[id] = product;
    //writeFile(); 
    await fs.writeFile('./src/product.json', JSON.stringify(data, null, 2));

}

async function update(id,product) {
    const data = readFile();
    data[id] = product;
    await fs.writeFile('./product.json', JSON.stringify(data, null, 2));


}

async function deleteProduct(id) {
    const data = await readFile();
    if (data.hasOwnProperty(id)) {
        delete data[id];
        await writeFile();
    }
    else {
        return undefined
    }
    //delete data[id];
}

async function edit(id,product) {
    const data = readFile();
    data[id] = product;
    await writeFile();
}
module.exports = {
    getProducts,
    getProductById,
    createProduct,
    update,
    deleteProduct
}