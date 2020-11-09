const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Group",
    {
      group_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(64),
        get() {
          return this.getDataValue("password") ? true : false;
        },
      },
      logo_filename: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      date_created: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      owner_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false,
      tableName: "Group",
    }
  );
};
