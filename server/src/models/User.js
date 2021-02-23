module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            unique: true,
            required: true
        },
        password:{
            type: DataTypes.STRING,
            required: true
        }, 
        name: {
            type: DataTypes.STRING,
            required: true
        },
        accType: {
            type: DataTypes.STRING,
            required: true
        }
    })

    return User;
}
