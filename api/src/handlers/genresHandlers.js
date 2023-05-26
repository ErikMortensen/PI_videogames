const { getGenres } = require('../controllers/gendersController');

const genresHandler = async (req, res) => {

    try {
        const genres = await getGenres();
        res.status(200).json(genres);
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
};

module.exports = {
    genresHandler
}