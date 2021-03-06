'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('oprator', {
      id_oprator: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama: {
        type: Sequelize.STRING
      },
      img_profil: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      no_tlp: {
        type: Sequelize.STRING
      },
      level: {
        type: Sequelize.ENUM('admin', 'owner', 'kasir')
      },
      id_outlet: {
        type: Sequelize.INTEGER,
        references: {
          model: "outlet",
          key: "id_outlet"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('oprator');
  }
};