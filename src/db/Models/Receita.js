const Sequelize = require('sequelize');
const database = require('./../db.js');

const Receita = database.define('receita', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    instrucoes: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tempoPreparo: {
        type: Sequelize.TIME,
        allowNull: true
    },
    rendimento: {
        type: Sequelize.DOUBLE,
        allowNull: true
    }
})

module.exports = Receita;