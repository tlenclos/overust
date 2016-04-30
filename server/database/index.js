import Sequelize from 'sequelize';
import userSchema from './models/user';
import wipeSchema from './models/wipe';

let sequelize = new Sequelize('overust', 'thibz', 'toto', {host: 'localhost', dialect: 'postgres'});

// models
let User = sequelize.define('user', userSchema);
let Wipe = sequelize.define('wipe', wipeSchema);

// associations
User.belongsToMany(Wipe, {through: 'UserWipe'});
Wipe.belongsToMany(User, {through: 'UserWipe'});
// TODO Link UserWipe with the steamId so that we can associate not existing steam user on our app
// Also add usefull meta like name and picture on the relation

// create
sequelize.sync({ force: true });

export { sequelize, User, Wipe }
