require('dotenv').config();
const { API_KEY } = process.env;

const axios = require('axios');
const { Op } = require('sequelize');
const { Videogame } = require('../db');

const getVideogames = async () => {
    const videogames = (await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)).data;

    return videogames;
};

const createVideogame = async (name, description, platforms, image, released, rating) =>

    await Videogame.create({ name, description, platforms, image, released, rating });




module.exports = {
    getVideogames,
    createVideogame
};