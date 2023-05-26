const { Router } = require('express');
const { genresHandler } = require('../handlers/genresHandlers');

const genresRouter = Router();

genresRouter.get('/', genresHandler);

module.exports = genresRouter;