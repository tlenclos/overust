import Sequelize from 'sequelize';

export default {
    from: Sequelize.DATE,
    to: Sequelize.DATE,
    serverName: Sequelize.STRING,
    serverUrl: Sequelize.STRING
}