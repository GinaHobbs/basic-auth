const { sequelize, DataTypes } = require('./index.js');
const bcrypt = require('bcrypt');

// Create a Sequelize model
const Users = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

Users.authenticateUser = async function(username, password) {
  console.log('here');
  console.log(username);
  const user = await Users.findOne({ where: { username: username } });
  console.log(user);
  const valid = await bcrypt.compare(password, user.password);
  if (valid) {
    return user;
  } else {
    throw new Error('unable to authenticate user');
  }
}


module.exports = Users;