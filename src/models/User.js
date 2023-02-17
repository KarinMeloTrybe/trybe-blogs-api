const BlogPost = require("./BlogPost");

const User= (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: { type: DataTypes.STRING, defaultValue: null },
    }, { timestamps: false, tablename: 'users', underscored: true, modelName: 'User', });
   
    User.associate = (models) => {
      User.hasMany(models.BlogPost, { foreignKey: 'userId', as: 'posts' });
    };
   
    return User;
  };

 
  
  module.exports = User;