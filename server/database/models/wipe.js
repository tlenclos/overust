import Sequelize from 'sequelize';

export default {
    from: {type: Sequelize.DATE, allowNull: false},
    to: {type: Sequelize.DATE, allowNull: false},
    serverName: {type: Sequelize.STRING, allowNull: false},
    serverUrl: Sequelize.STRING,
    // TODO Add createdBy
}