'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class owner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.transaksi, {
        foreignKey: "id_owner",
        as: "transaksi"
      })
    }
  };
  owner.init({
    id_owner: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nama: DataTypes.STRING,
    img_profil: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    tlp: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'owner',
    tableName: 'owner'
  });
  return owner;
};