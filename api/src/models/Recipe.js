const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    apiID: {
      type: DataTypes.INTEGER,
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: 'https://webstockreview.net/images/clipart-lunch-elegant-luncheon-10.png',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
      defaultValue: 50,
    },
    healthyScore: {
      type: DataTypes.INTEGER,
      defaultValue: 50,
    },
    steps: {
      type: DataTypes.TEXT,
      defaultValue: '[]',
      get: function(){
        let list = JSON.parse(this.getDataValue('steps'))
        if(list.length > 0) return list[0].steps
        return []
      }
    },
  });
};
