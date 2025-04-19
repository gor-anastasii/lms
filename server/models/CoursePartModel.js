import { DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

import sequelize from '../config/database.js';
import Course from './CourseModel.js';

const CoursePart = sequelize.define(
  'CoursePart',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    mediaUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      allowNull: false,
      defaultValue: 'active',
    },
  },
  {
    timestamps: true,
  },
);
CoursePart.belongsTo(Course, { foreignKey: 'courseId' });

export default CoursePart;
