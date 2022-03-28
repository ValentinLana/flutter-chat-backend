
const { response } = require('express');
const Usuarios = require('../models/usuario');
const getUsuarios = async (req, res = response) => {

    const desde = Number(req.query.desde) || 0;

    //traemos todos los usuarios menos el que crea la solicitud
    // para eso es el ne
    // desde se usar para traer a partir de tal usuario
    //limit : limita la cantidad de usuarios que trae
    const usuarios = await Usuarios.find(
        { _id: { $ne: req.uid } }
    )
        .sort('-online').skip(desde).limit(20).lean();

    res.json({
        ok: true,
        usuarios,
        desde
    })

}


module.exports = {
    getUsuarios
}