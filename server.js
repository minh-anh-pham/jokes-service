const app = require('./index');
const { sequelize } = require('./db');

const { PORT = 4000 } = process.env;

app.get("/jokes", async (request, response) => {
  const {content, tag} = req.query;
})

app.listen(PORT, () => {
  sequelize.sync({ force: false });
  console.log(`Jokes are ready at http://localhost:${PORT}`);
});
