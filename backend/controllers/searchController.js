const axios = require('axios');

const options = {
    method: 'GET',
    url: 'https://exercisedb.p.rapidapi.com/exercises/bodyPart/back',
    params: {
      limit: '10',
      offset: '0'
    },
    headers: {
      'x-rapidapi-key': process.env.EXERCISEDB_KEY,
      'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
    }
  };



 async function getExercises(req, res) {
    const { bodyPart } = req.query;

    if (!bodyPart) {
        res.status(400).json({ error: 'Body part is required' });
        return;
    }

    try {
        const response = await axios.request({
            ...options,
            url: `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`

        });

        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch exercises' });
    }
}

module.exports = {getExercises}


