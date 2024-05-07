const Lugar = require("../models/lugar.model.js");

//Obtener varios lugares
const getLugares = async (req, res) => {
  try {
    const lugares = await Lugar.find({});
    res.status(200).json(lugares);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Obtener un solo lugar
const getLugar = async (req, res) => {
  try {
    const { id } = req.params;
    const lugar = await Lugar.findById(id);
    res.status(200).json(lugar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//Se traen los campos: id, nombre, telefono,mail, direccion completa y horarios, ordenado de forma ascendete por el id
const getOrderPorIDasc = async (req, res) => {
  try {
    
    const pipeline = [
      { $project: { _id: 0, id:1, nombre: 1, telefono:1, mail:1, direccion_completa:1, horario:1 }},
      {$sort:{id:1}}
    ];
    const Rest = await Lugar.aggregate(pipeline);
    res.json(Rest);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

//Obtener cantidad de tipos de lugares de comida, ordenados de forma descendente
const getCantCate = async (req, res) => {
  try {
    const pipeline = [{$group: { _id: "$categoria",  cantidad: { $sum: 1 }  }},{ $sort: { cantidad: -1 } }];
    const Rest = await Lugar.aggregate(pipeline);
    res.json(Rest);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

// Obtener los restaurantes de Paternal y Villa luro Ordenado por orden alfabetico
const getDosBarrios = async (req, res) => {
  try {
    const pipeline = [ { $match: { barrio: { $in: ["Paternal", "Villa Luro"] } } }, {$sort: {barrio: 1}} ]
    const Rest = await Lugar.aggregate(pipeline);
    res.json(Rest);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

const getLugaresCerca = async (req, res) => {
  try {
    const pipeline = [
      {
         $geoNear: {
            key: "ubicacion",
            near: { type: "Point", coordinates: [-34.6037, -58.3817] },
            spherical: true,
            query: { categoria:"RESTAURANTE" },
            distanceField: "calcDistance"
         }
      }
   ]
    const Rest = await Lugar.aggregate(pipeline);
    res.json(Rest);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}


//Crear Lugar
const createLugar = async (req, res) => {
  try {
    const lugar = await Lugar.create(req.body);
    res.status(200).json(lugar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Actualizar Lugar
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

//Eliminar Lugar
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
  getCantCate,
  getDosBarrios,
  getOrderPorIDasc,
  getLugaresCerca,
  createLugar,
  updateLugar,
  deleteLugar,
};