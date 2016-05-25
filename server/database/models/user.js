import Sequelize from 'sequelize';

export default {
    steamId: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    username: Sequelize.STRING,
    avatar: Sequelize.STRING,
    avatarFull: Sequelize.STRING
}
