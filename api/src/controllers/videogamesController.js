require('dotenv').config();
const { API_KEY } = process.env;

const axios = require('axios');
const { Op } = require('sequelize');
const { Videogame, Genre } = require('../db');

const cleanData = (data, source = 'api') => {

    if (Array.isArray(data) && source === 'api') {
        return data.map(element => {
            return {
                id: element.id,
                name: element.name,
                description: element.description,
                platforms: element.platforms?.map(p => p.platform.name),
                image: element.background_image,
                released: element.released,
                rating: element.rating,
                genres: element.genres?.map(genre => genre.name)
            };
        });
    }
    if (!Array.isArray(data) && source === 'api') {
        return {
            id: data.id,
            name: data.name,
            description: data.description,
            platforms: data.platforms?.map(p => p.platform.name),
            image: data.background_image,
            released: data.released,
            rating: data.rating,
            genres: data.genres?.map(genre => genre.name)
        };
    }
    if (source === 'database' && Array.isArray(data)) {
        return data.map((game) => {
            return {
                id: game.id,
                name: game.name,
                platforms: game.platforms,
                image: game.image,
                released: game.released,
                rating: game.rating,
                genres: game.genres?.map((genre) => genre.name)
            };
        });
    }
    if (source === 'database') {
        return {
            id: data.id,
            name: data.name,
            description: data.description,
            platforms: data.platforms,
            image: data.image,
            released: data.released,
            rating: data.rating,
            genres: data.genres?.map(genre => genre.name)
        };
    }
};


const getVideogames = async () => {
    let videogamesApi = (await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)).data.results;

    videogamesApi = cleanData(videogamesApi);
    let videogamesDB = await Videogame.findAll({
        attributes: {
            exclude: ['description']
        },
        include: {
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: []
            }
        },
    });

    videogamesDB = cleanData(videogamesDB, 'database');

    return [...videogamesDB, ...videogamesApi];
};

const getVideogamesById = async (id, source) => {
    let videogame = source === 'database'
        ? (await Videogame.findOne({
            where: {
                id: id
            },
            include: {
                model: Genre,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        })).dataValues
        : (await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)).data;


    return cleanData(videogame, source);
};

const getVideogamesByName = async (name) => {
    let videogamesApi = (await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)).data.results;

    videogamesApi = cleanData(videogamesApi);



    videogamesApi.sort((a, b) => {
        // Obtenemos la longitud de la subcadena común más larga
        const commonLengthA = getCommonSubstringLength(a.name.toLowerCase(), name.toLowerCase());
        const commonLengthB = getCommonSubstringLength(b.name.toLowerCase(), name.toLowerCase());

        // Comparamos la longitud de la subcadena común
        return commonLengthB - commonLengthA;
    });

    videogamesApi.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();

        // Si `nameA` coincide exactamente con `name`, colocamos `a` antes que `b`
        if (nameA === name) {
            return -1;
        }
        // Si `nameB` coincide exactamente con `name`, colocamos `b` antes que `a`
        else if (nameB === name) {
            return 1;
        }
        // En cualquier otro caso, mantenemos el orden original
        else {
            return 0;
        }
    });
    // Función auxiliar para contar la cantidad de caracteres coincidentes


    const videogamesDB = await Videogame.findAll({
        where: {
            name: {
                [Op.iLike]: `%${name}%`
            }
        }
    });
    return [...videogamesDB, ...videogamesApi].slice(0, 15);
};

function getCommonSubstringLength(str, target) {
    let maxLength = 0;
    for (let i = 0; i < str.length; i++) {
        for (let j = i + 1; j <= str.length; j++) {
            const substring = str.slice(i, j);
            if (target.includes(substring)) {
                maxLength = Math.max(maxLength, substring.length);
            }
        }
    }
    return maxLength;
}

// const getVideogamesByName = async (name) => {
//     const videogamesApi = (await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)).data.results;

//     const cleanVideogamesApi = cleanData(videogamesApi);

//     const videogamesDB = await Videogame.findAll({
//         where: {
//             name: {
//                 [Op.iLike]: `%${name}%`
//             }
//         }
//     });
//     return [...videogamesDB, ...cleanVideogamesApi].slice(0, 15);
// };

const createVideogame = async (name, description, platforms, image, released, rating, genres) => {
    const game = (await getVideogamesByName(name)).find(game => game.name === name);

    if (!game) {
        const newVideogame = await Videogame.create({ name, description, platforms, image, released, rating });

        let genresId = await Genre.findAll({
            where: {
                name: genres
            }
        });
        genresId = genresId.map(genre => genre.id);

        await newVideogame.addGenres(genresId);
        return newVideogame;
    }
    throw Error(`The game with the name '${name}' already exists!`);


};

module.exports = {
    getVideogames,
    getVideogamesById,
    getVideogamesByName,
    createVideogame
};