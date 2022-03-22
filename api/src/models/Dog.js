const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo

  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: {
      type: DataTypes.JSON,
      allowNull: false
    },
    weight: {
      type: DataTypes.JSON,
      allowNull: false
    },
    yearsOfLife: {
      type: DataTypes.INTEGER
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ('Img not found')
    },
    createdInDB: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });
};
