const express = require("express");
const Lugar = require("../models/lugar.model.js");
const router = express.Router();
const {
  getLugares,
  getLugar,
  getCantCate,
  getOrderPorIDasc,
  getDosBarrios,
  getLugaresCerca,
  createLugar,
  updateLugar,
  deleteLugar,
} = require("../controllers/lugar.controller.js");

//GET
router.get("/buscar",getLugaresCerca)
router.get("/barrio", getDosBarrios)
router.get("/cant", getCantCate)
router.get("/orden", getOrderPorIDasc);
router.get("/", getLugares);
router.get("/:id", getLugar);


//POST
router.post("/", createLugar);

//PUT
router.put("/:id", updateLugar);

//DELETE

router.delete("/:id", deleteLugar);

module.exports = router;
