'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class kasir extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.transaksi, {
        foreignKey: "id_kasir",
        as: "transaksi"
      })

      this.belongsTo(models.outlet, {
        foreignKey: "id_outlet",
        as: "outlet"
      })
    }
  };
  kasir.init({
    id_kasir: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nama: DataTypes.STRING,
    img_profil: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    id_outlet: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'kasir',
    tableName: 'kasir'
  });
  return kasir;
};