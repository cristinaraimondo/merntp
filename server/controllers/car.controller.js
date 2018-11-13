const Car = require('../models/car');
const carCtrl = {};

carCtrl.getCars = async (req, res, next) => {
  let cars = await Car.find();
  res.ok(cars);
};

carCtrl.createCar = async (req, res, next) => {
  try {
    const car = new Car({
      brand: req.body.brand,
      model: req.body.model,
      category: req.body.category,
      price: req.body.price,
      numDoors: req.body.numDoors
    });
    await car.save();
    res.created(car);
  } catch (exception) {
    res.internalServerError();
  }
};

carCtrl.getCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const car = await Car.findById(id);
    if (car) {
      res.ok(car);
    } else {
      res.notFound();
    }
  } catch (exception) {
    res.internalServerError();
  }
};

carCtrl.editCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const car = await Car.findById(id);
    if (car) {
      const { brand, model, category, price, numDoors } = req.body;
      const newCar = { brand, model, category, price, numDoors };
      await Car.findByIdAndUpdate(req.params.id, newCar);

      res.noContent();
    } else {
      res.notFound();
    }
  } catch (exception) {
    res.internalServerError();
  }
};

carCtrl.deleteCar = async (req, res, next) => {
  try {
    await Car.findByIdAndRemove(req.params.id);
    res.json('Eliminando Car');
  } catch {
    res.notFound();
  }
};

module.exports = carCtrl;
