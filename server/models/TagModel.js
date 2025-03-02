import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Tag = sequelize.define(
  'Tag',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);

export default Tag;
