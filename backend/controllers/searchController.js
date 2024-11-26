




async function getExercises(req, res) {
  const { bodyPart } = req.query;

  if (!bodyPart) {
    res.status(400).json({ error: 'Body part is required' });
    return;
  }

  const url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}?limit=10&offset=0`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': process.env.EXERCISEDB_KEY,
      'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch exercises' });
  }

  // try {
  //   const response = await fetch(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, {
  //     options
  //   }

  //   );

  //   const json = await response.json();
  //   console.log(json);
  //   res.status(200).json(response.data);
  // } catch (error) {
  //   res.status(500).json({ error: 'Failed to fetch exercises' });
  // }
}

module.exports = { getExercises }


