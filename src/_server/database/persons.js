'use strict'
const {Model} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class persons extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	persons.init(
		{
			firstName: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			lastName: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			deleted: {
				type: DataTypes.BOOLEAN,
			},
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
			modelName: 'persons',
		}
	)
	return persons
}
