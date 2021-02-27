'use strict'
const {Model} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class posts extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}

	posts.associate = function (models) {
		posts.belongsTo(models.users, {foreignKey: 'userId'})
	}

	posts.init(
		{
			text: DataTypes.STRING,
			userId: DataTypes.INTEGER,
			deleted: {type: DataTypes.BOOLEAN},
			createdAt: {
				allowNull: false,
				type: DataTypes.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: DataTypes.DATE,
			},
		},
		{
			sequelize,
			modelName: 'posts',
		}
	)
	return posts
}
