require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const { Genre } = require('../db');

const getGenres = async () => {

    let genres = await Genre.findAll();
    if (genres.length === 0) {
        genres = (await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)).data.results;
        const genresArray = genres.map(genre => (
            {
                'id': genre.id,
                'name': genre.name
            }
        ));

        genres = saveGenres(genresArray);
    }


    return genres;

}

const saveGenres = async (genres) => {

    const newGenres = await Genre.bulkCreate(genres);
    return newGenres;
}
module.exports = {
    getGenres
}