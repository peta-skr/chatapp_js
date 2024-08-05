const {Sequelize, DataTypes} = require("sequelize");
const {sequelize, connect} = require("./connect");

const User = sequelize.define("chat_users", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    timestamps: false
});


async function createUser() {
    const user = await User.create({
        user_id: "123",
        name: "test"
    });
}

async function selectUser() {
    let users = await User.findAll();
    console.log(users);
    
}

connect();
selectUser();