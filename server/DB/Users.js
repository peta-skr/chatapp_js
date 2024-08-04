const {Sequelize, DataTypes} = require("sequelize");
const {sequelize} = require("./connect");

const User = sequelize.define("User", {
    user_id: {
        type: DataTypes.CHAR,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});


async function createUser() {
    const user = await User.create({
        user_id
    })
}

async function selectUser() {

}
