const server = require('./server.js');
const { sequelize } = require('./models/index.js');

// make sure our tables are created, start up the HTTP server.
sequelize.sync()
  .then(() => {
    server.listen(3000, () => console.log(`server up on 3000`));
  }).catch(e => {
    console.error('Could not start server', e.message);
  });