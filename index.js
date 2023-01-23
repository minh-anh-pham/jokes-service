const express = require('express');
const app = express();
const { Joke } = require('./db');
// documentation: https://sequelize.org/docs/v6/core-concepts/model-querying-basics/
// section: Applying WHERE clauses
const { Op } = require("sequelize");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/jokes', async (req, res, next) => {
  try {
    // TODO - filter the jokes by tags and content
    let where = {};

    const {content, tags} = req.query;

    if (content) {
      where.joke = {[Op.like]: '%' + content + '%'};
    }

    if (tags) {
      where.tags = {[Op.like]: '%' + tags + '%'};
    }

    const jokes = await Joke.findAll({ where });

    res.json(jokes);

  } catch (error) {
    console.error(error);
    next(error)
  }
});

app.post('/jokes', async (req, res, next) => {
  try {
    let where = {};

    const {content, tags} = req.query;

    if (content) {
      where.joke = content;
    }

    if (tags) {
      where.tags = tags;
    }

    const newJoke = await Joke.create({where});

    const findNewJoke = await Joke.findAll({where});

    res.json(findNewJoke);

  } catch (error) {
    console.error(error);
    next(error)
  }
});

// we export the app, not listening in here, so that we can run tests
module.exports = app;
