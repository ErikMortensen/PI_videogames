const { Router } = require('express');
const { getVideogamesHandler, createVideogamehandler, getVideogamesByIdHandler, deleteVideogameHandler } = require('../handlers/videogamesHandler');

const videogamesRouter = Router();

videogamesRouter.get('/', getVideogamesHandler);
videogamesRouter.get('/:id', getVideogamesByIdHandler);
videogamesRouter.post('/', createVideogamehandler);
videogamesRouter.delete('/:id', deleteVideogameHandler);

module.exports = videogamesRouter;