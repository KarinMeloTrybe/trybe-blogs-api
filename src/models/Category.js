const Category = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: DataTypes.STRING,
    }, {
        timestamps: false,
        underscored: true,
        tablename: 'categories',
        modelName: 'Category'
    });

    return Category;
};
module.exports = Category;