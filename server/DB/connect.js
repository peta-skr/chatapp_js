const {Sequelize} = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DB_URI);

async function connect () {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

exports.sequelize = sequelize;
exports.connect = connect;