'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('transaksi', {
      id_transaksi: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_oprator: {
        type: Sequelize.INTEGER,
        references: {
          model: "oprator",
          key: "id_oprator"
        }
      },
      id_member: {
        type: Sequelize.INTEGER,
        references: {
          model: "member",
          key: "id_member"
        }
      },
      tgl: {
        type: Sequelize.DATE
      },
      batas_waktu: {
        type: Sequelize.DATE
      },
      tgl_bayar: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.ENUM('baru', 'proses', 'selesai', 'diambil')
      },
      dibayar: {
        type: Sequelize.ENUM('dibayar', 'belum_dibayar')
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
    await queryInterface.dropTable('transaksi');
  }
};