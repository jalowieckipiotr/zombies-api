const Zombie = require("../models/Zombie.js");
const Item = require("../models/Item.js");

// Create and Save a new Zombie
exports.create = async (req, res) => {
  try {
    const zombie = new Zombie({
      name: req.body.name,
      creationDate: Date.now(),
      items: []
    });
    await zombie.save();
    res.send({
      id: zombie._id,
      name: zombie.name,
      creationDate: zombie.creationDate
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Zombie."
    });
  }
};

// Retrieve all zombies from the database.
exports.findAll = async (req, res) => {
  try {
    const zombies = (await Zombie.find()) || [];
    const zombiesMapped = zombies.map((z) => {
      return {
        id: z._id,
        name: z.name,
        creationDate: z.creationDate
      };
    });
    return res.send(zombiesMapped);
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Some error occurred while retrieving zombies."
    });
  }
};

// Find a single zombie with a zombieId
exports.findOne = async (req, res) => {
  try {
    const zombieId = req.params.zombieId;
    const zombie = await Zombie.findById(req.params.zombieId);
    if (!zombie) {
      throw new Error(`Zombie with id ${zombieId} not found.`, { cause: "NotFound" });
    }
    let sumPLN = 0;
    const itemsDb = await Item.find({ _id: { $in: zombie.items } });
    const items = [];
    zombie.items.forEach((item) => {
      const itemDb = itemsDb.find((i) => i._id === item);
      if (itemDb) {
        sumPLN += itemDb.price;
        items.push({
          id: itemDb._id,
          name: itemDb.name,
          price: itemDb.price
        });
      }
    });
    sumPLN = sumPLN.toFixed(2);
    sumEUR = (parseFloat(sumPLN) / parseFloat(EXCHANGE_RATE_EUR)).toFixed(2);
    sumUSD = (parseFloat(sumPLN) / parseFloat(EXCHANGE_RATE_USD)).toFixed(2);
    const response = {
      id: zombie._id,
      name: zombie.name,
      sumPLN,
      sumEUR,
      sumUSD,
      items
    };
    return res.send(response);
  } catch (err) {
    if (err.cause === "NotFound") {
      return res.status(404).send({
        message: err.message
      });
    }
    return res.status(500).send({
      message: err.message
    });
  }
};

exports.findAllItems = async (req, res) => {
  try {
    const items = (await Item.find()) || [];
    const itemsMapped = items.map((i) => {
      return {
        id: i._id,
        name: i.name,
        price: i.price
      };
    });
    return res.send(itemsMapped);
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Some error occurred while retrieving items."
    });
  }
};
exports.update = async (req, res) => {
  try {
    const zombieId = req.params.zombieId;
    const zombie = await Zombie.findByIdAndUpdate(
      zombieId,
      {
        name: req.body.name
      },
      { new: true }
    );
    if (!zombie) {
      throw new Error(`Zombie with id ${zombieId} not found.`, { cause: "NotFound" });
    }
    return res.send({
      id: zombieId,
      name: zombie.name,
      creationDate: zombie.creationDate
    });
  } catch (err) {
    if (err.cause === "NotFound") {
      return res.status(404).send({
        message: err.message
      });
    }
    return res.status(500).send({
      message: err.message
    });
  }
};
exports.delete = async (req, res) => {
  try {
    const zombieId = req.params.zombieId;
    if (!zombieId) {
      throw new Error("Wrong params");
    }
    const zombie = await Zombie.findByIdAndRemove(zombieId);
    if (!zombie) {
      throw new Error(`Zombie with id ${zombieId} not found.`, { cause: "NotFound" });
    }
    res.send({ message: "Zombie deleted successfully!" });
  } catch (err) {
    if (err.cause === "NotFound") {
      return res.status(404).send({
        message: err.message
      });
    }
    return res.status(500).send({
      message: err.message
    });
  }
};

exports.addItem = async (req, res) => {
  try {
    const zombieId = req.params.zombieId;
    const itemId = req.body.itemId;
    const zombie = await Zombie.findById(zombieId);
    if (!zombie) {
      throw new Error(`Zombie with id: [${zombieId}] not found.`, { cause: "NotFound" });
    }
    if (zombie.items && zombie.items.length > 4) {
      throw new Error("Zombie can have a maximum of 5 items.");
    }
    const item = await Item.findById(itemId);
    if (!item) {
      throw new Error(`Item with id: [${itemId}] not found.`, { cause: "NotFound" });
    }
    const existingItem = zombie.items.find((i) => i === itemId);
    if (existingItem) {
      throw new Error(`Item with id: [${itemId}] already exists.`);
    }
    zombie.items.push(itemId);
    await zombie.save();
    return res.send({ message: `Item [${item.name}] with id: [${itemId}] succesfully added` });
  } catch (err) {
    if (err.cause === "NotFound") {
      return res.status(404).send({
        message: err.message
      });
    }
    return res.status(500).send({
      message: err.message
    });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const zombieId = req.params.zombieId;
    const itemId = req.body.itemId;

    const zombie = await Zombie.findById(zombieId);
    if (!zombie) {
      throw new Error(`Zombie with id: [${zombieId}] not found.`, { cause: "NotFound" });
    }
    const itemIndex = zombie.items.findIndex((i) => i === itemId);
    if (itemIndex === -1) {
      throw new Error(`Zombie don't have item with id: [${itemId}].`, { cause: "NotFound" });
    }
    zombie.items.splice(itemIndex, 1);
    await zombie.save();
    return res.send({ message: `Item with id: [${itemId}] succesfully removed` });
  } catch (err) {
    if (err.cause === "NotFound") {
      return res.status(404).send({
        message: err.message
      });
    }
    return res.status(500).send({
      message: err.message
    });
  }
};
