const { getVideogames, createVideogame } = require("../controllers/videogamesController");


const getVideogamesHandler = async (req, res) => {

    try {
        const videogames = await getVideogames();
        res.status(200).json(videogames);
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
};