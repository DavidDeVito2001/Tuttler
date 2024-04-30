const Lugar = require("../models/lugar.model.js");

const getLugares = async (req, res) => {
  try {
    const lugares = await Lugar.find({});
    res.status(200).json(lugares);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLugar = async (req, res) => {
  try {
    const { id } = req.params;
    const lugar = await Lugar.findById(id);
    res.status(200).json(lugar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createLugar = async (req, res) => {
  try {
    const lugar = await Lugar.create(req.body);
    res.status(200).json(lugar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateLugar = async (req, res) => {
  try {
    const { id } = req.params;
    const lugar = await Lugar.findByIdAndUpdate(id, req.body);

    if (!lugar) {
      return res.status(404).json({ message: "Lugar not found" });
    }

    const updateLugar = await Lugar.findById(id);
    res.status(200).json(updateLugar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteLugar = async (req, res) => {
  try {
    const { id } = req.params;
    const lugar = await Lugar.findByIdAndDelete(id, req.body);

    if (!lugar) {
      res.status(404).json({ mesagg: "lugar not found" });
    }

    res.status(200).json({ message: "Lugar deleted succesfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getLugares,
  getLugar,
  createLugar,
  updateLugar,
  deleteLugar,
};
