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

// functions
const createUserIfNotExist = (steamUser) => {
    return new Promise((resolve, reject) => {
        User.findOne({ where: {steamId: steamUser.steamid} }).then(function (user) {
            if (user) {
                return resolve(user);
            } else {
                resolve(User.create({
                    steamId: steamUser.steamid,
                    username: steamUser.personaname,
                    avatar: steamUser.avatar,
                    avatarFull: steamUser.avatarfull
                }));
            }
        });
    })
};

export { sequelize, User, Wipe, createUserIfNotExist }
