const axios = require('axios');
const { Op } = require('sequelize');
const { Videogame } = require('../db');

// const getVideogames = async () => {
//     const videogames = (await axios.get('https://api.rawg.io/api/games?key=fe4d6c9720d442c7adf31d4908041f3e')).data;

//     return videogames;
// };

const createVideogame = async (name, description, platforms, image, released, rating) =>

    await Videogame.create({ name, description, platforms, image, released, rating });




module.exports = {
    // getVideogames,
    createVideogame
};