const { getVideogames, createVideogame, getVideogamesByName, getVideogamesById } = require("../controllers/videogamesController");

// sacar el name de acá!!
const getVideogamesHandler = async (req, res) => {
    const { name } = req.query;
    console.log(name);
    try {
        let videogames = [];
        if (name) {
            videogames = await getVideogamesByName(name);
            console.log(videogames);
        } else {
            videogames = await getVideogames();
        }
        res.status(200).json(videogames);
    } catch ({ message }) {
        res.status(400).json({ error: message });
    }
};

const getVideogamesByNameHandler = async (req, res) => {
    const { name } = req.query;
    console.log(name);

    try {
        if (!name) throw Error('Debe especificar un name!');

        const videogames = await getVideogamesByName(name);

        res.status(200).json(videogames);
    } catch ({ message }) {
        res.status(400).json({ error: message });
    }
}

const getVideogamesByIdHandler = async (req, res) => {
    const { idVideogames } = req.params;
    console.log(`id: ${idVideogames}`);

    const source = isNaN(idVideogames) ? 'database' : 'api';

    console.log(source);
    try {
        const videogame = await getVideogamesById(idVideogames, source);

        res.status(200).json(videogame);
    } catch ({ message }) {
        res.status(400).json({ error: message });
    }
};


const createVideogamehandler = async (req, res) => {
    const { name, description, platforms, image, released, rating } = req.body;

    try {
        const newVideogame = await createVideogame(name, description, platforms, image, released, rating);
        res.status(201).json(newVideogame);
    } catch ({ message }) {
        res.status(400).json({
            error: message
        });
    }
}


module.exports = {
    getVideogamesHandler,
    createVideogamehandler,
    getVideogamesByNameHandler,
    getVideogamesByIdHandler
};