'use strict'
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('persons', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			firstName: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			lastName: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			deleted: {type: Sequelize.BOOLEAN},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		})
	},
	down: async queryInterface => {
		await queryInterface.dropTable('persons')
	},
}
