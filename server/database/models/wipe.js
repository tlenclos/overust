import Sequelize from 'sequelize';

export default {
    from: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {isDate: true}
    },
    to: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {isDate: true}
    },
    serverName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    serverUrl: {
        type: Sequelize.STRING
    }
}
