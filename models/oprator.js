'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class oprator extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.transaksi, {
        foreignKey: "id_oprator",
        as: "transaksi"
      })
      this.belongsTo(models.outlet, {
        foreignKey: "id_outlet",
        as: "outlet"
      })
    }
  };
  oprator.init({
    id_oprator: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nama: DataTypes.STRING,
    img_profil: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    no_tlp: DataTypes.STRING,
    level: DataTypes.ENUM('admin', 'owner', 'kasir'),
    id_outlet: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'oprator',
    tableName: 'oprator'
  });
  return oprator;
};