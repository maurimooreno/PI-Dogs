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
      defaultValue: DataTypes.UUIDV4,
      validate: {
        isUUID: 4,
        notNull: { msg: "Cannot be null" },
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Cannot be null" },
        notEmpty: true,
      }
    },
    height: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        notNull: { msg: "Cannot be null" },
      }
    },
    weight: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        notNull: { msg: "Cannot be null" },
      }
    },
    yearsOfLife: {
      type: DataTypes.JSON
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ('Img not found'),
      validate: {
        isUrl: true,
      }
    },
    createdInDB: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });
};
