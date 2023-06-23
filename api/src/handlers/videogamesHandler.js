const { getVideogames, createVideogame, getVideogamesByName, getVideogamesById, deleteVideogameById } = require("../controllers/videogamesController");

const getVideogamesHandler = async (req, res) => {
    const { name } = req.query;
    let videogames = [];
    try {
        if (name) {
            videogames = await getVideogamesByName(name);

            if (videogames.length === 0) {
                res.status(404).json({ respuesta: `There are no video games with the name ${name}` });
                return;
            }
        } else {
            videogames = await getVideogames();
        }
        res.status(200).json(videogames);
    } catch ({ message }) {
        res.status(400).json({ error: message });
    }
};


const getVideogamesByIdHandler = async (req, res) => {
    const { id } = req.params;
    const source = isNaN(id) ? 'database' : 'api';
    try {
        const videogame = await getVideogamesById(id, source);

        res.status(200).json(videogame);
    } catch ({ message }) {
        res.status(400).json({ error: message });
    }
};


const createVideogamehandler = async (req, res) => {
    const { name, description, platforms, image, released, rating, genres } = req.body;

    try {
        const newVideogame = await createVideogame(name, description, platforms, image, released, rating, genres);
        res.status(201).json({ message: 'The game has been created successfully!' });
    } catch ({ message }) {
        res.status(400).json({
            error: message
        });
    }
}

const deleteVideogameHandler = async (req, res) => {
    const { id } = req.params;

    if (isNaN(id)) {
        try {
            const resp = await deleteVideogameById(id);
            res.status(200).json({ message: resp });
        } catch ({ message }) {
            res.status(400).json({ error: message });
        }
    }
    // res.status(404).json({ message: `Can't delete this video game.` });
};


module.exports = {
    getVideogamesHandler,
    createVideogamehandler,
    getVideogamesByIdHandler,
    deleteVideogameHandler
};