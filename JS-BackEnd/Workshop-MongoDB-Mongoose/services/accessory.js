const Accessory = require("../models/Accessory");
const { accessoryViewModel } = require('./util')

async function createAccessory(accessory) {
  await Accessory.create(accessory);
}
async function getAllAccessory() {
    const data = await Accessory.find({});
    return data.map(accessoryViewModel);
}
async function getAllAccessoryById(id) {
  const accessory = Accessory.find({ id });
}
module.exports = () => (req, res, next) => {
  req.accessory = {
    getAllAccessory,
    createAccessory,
  };
  next();
};
