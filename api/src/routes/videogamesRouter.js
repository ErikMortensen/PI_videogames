const { Router } = require('express');
const { getVideogamesHandler, createVideogamehandler } = require('../handlers/videogamesHandler');

const videogamesRouter = Router();

videogamesRouter.get('/', getVideogamesHandler);

// videogamesRouter.get('/:idVideogames',);

// videogamesRouter.get('/name?')

videogamesRouter.post('/', createVideogamehandler);

module.exports = videogamesRouter;