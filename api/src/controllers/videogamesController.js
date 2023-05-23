require('dotenv').config();
const { API_KEY } = process.env;

const axios = require('axios');
const { Op } = require('sequelize');
const { Videogame } = require('../db');

const cleanArray = (arr) =>
    arr.map(element => {
        return {
            id: element.id,
            name: element.name,
            description: element.description,
            platforms: element.platform,
            image: element.background_image,
            released: element.released,
            rating: element.rating
        };
    });


const getVideogames = async () => {
    const videogamesApi = (await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)).data.results;

    const cleanVideogamesApi = cleanArray(videogamesApi);
    const videogamesDB = await Videogame.findAll();

    return [...cleanVideogamesApi, ...videogamesDB];
};

const getVideogamesById = async (id, source) => {
    const videogame = source === 'database'
        ? await Videogame.findByPk(id)
        : (await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)).data

    return videogame;
};

const getVideogamesByName = async (name) => {
    const videogamesApi = (await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)).data.results;
    const cleanVideogamesApi = cleanArray(videogamesApi);

    const videogamesDB = await Videogame.findAll({
        where: {
            name: {
                [Op.iLike]: `%${name}%`
            }
        }
    });
    return [...cleanVideogamesApi, ...videogamesDB];
}

const createVideogame = async (name, description, platforms, image, released, rating) =>

    await Videogame.create({ name, description, platforms, image, released, rating });




module.exports = {
    getVideogames,
    getVideogamesById,
    getVideogamesByName,
    createVideogame
};