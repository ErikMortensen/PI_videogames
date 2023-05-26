require('dotenv').config();
const { API_KEY } = process.env;

const axios = require('axios');
const { Op } = require('sequelize');
const { Videogame } = require('../db');

const cleanData = (data) => {
    if (Array.isArray(data)) {
        return data.map(element => {
            return {
                id: element.id,
                name: element.name,
                description: element.description,
                platforms: element.platforms.map(p => p.platform.name),
                image: element.background_image,
                released: element.released,
                rating: element.rating
            };
        });
    } else {
        return {
            id: data.id,
            name: data.name,
            description: data.description,
            platforms: data.platforms.map(p => p.platform.name),
            image: data.background_image,
            released: data.released,
            rating: data.rating
        };
    }
};

const getVideogames = async () => {
    const videogamesApi = (await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)).data.results;

    const cleanVideogamesApi = cleanData(videogamesApi);
    const videogamesDB = await Videogame.findAll();

    return [...cleanVideogamesApi, ...videogamesDB];
};

const getVideogamesById = async (id, source) => {
    const videogame = source === 'database'
        ? await Videogame.findByPk(id)
        : (await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)).data

    return cleanData(videogame);
    // return videogame;
};

const getVideogamesByName = async (name) => {
    const videogamesApi = (await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)).data.results;
    const cleanVideogamesApi = cleanData(videogamesApi);

    const videogamesDB = await Videogame.findAll({
        where: {
            name: {
                [Op.iLike]: `%${name}%`
            }
        }
    });
    // console.log([...cleanVideogamesApi, ...videogamesDB]);
    return [...videogamesDB, ...cleanVideogamesApi].slice(0, 15);
};

const createVideogame = async (name, description, platforms, image, released, rating) => {
    const game = (await getVideogamesByName(name)).find(game => game.name === name);
    if (!game) {
        return await Videogame.create({ name, description, platforms, image, released, rating });
    }
    throw Error(`The game with the name '${name}' already exists!`);
};





module.exports = {
    getVideogames,
    getVideogamesById,
    getVideogamesByName,
    createVideogame
};