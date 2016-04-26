import Sequelize from 'sequelize';
import userSchema from './models/user';
import wipeSchema from './models/wipe';

let sequelize = new Sequelize('mydb', 'postgres', 'toto', {host: 'localhost', dialect: 'postgres'});

// models
let User = sequelize.define('user', userSchema);
let Wipe = sequelize.define('wipe', wipeSchema);

// associations
User.belongsToMany(Wipe, {through: 'UserWipe'});
Wipe.belongsToMany(User, {through: 'UserWipe'});

// create
sequelize.sync({ force: true });

export { sequelize, User, Wipe }
