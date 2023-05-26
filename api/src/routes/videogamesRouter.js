const { Router } = require('express');
const { getVideogamesHandler, createVideogamehandler, getVideogamesByNameHandler, getVideogamesByIdHandler } = require('../handlers/videogamesHandler');

const videogamesRouter = Router();

videogamesRouter.get('/', getVideogamesHandler);
videogamesRouter.get('/:id', getVideogamesByIdHandler);
videogamesRouter.post('/', createVideogamehandler);

module.exports = videogamesRouter;