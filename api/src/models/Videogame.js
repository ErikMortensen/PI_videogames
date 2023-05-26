const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: []
    },
    // platforms: {
    //   type: DataTypes.STRING,
    //   // type: DataTypes.ARRAY(DataTypes.JSONB),
    //   allowNull: false,
    //   // defaultValue: []
    // },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    released: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, { timestamps: false });

  sequelize.define('genre', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, { timestamps: false });
};
