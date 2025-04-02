import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './UserModel.js';
import Course from './CourseModel.js';

const Progress = sequelize.define(
  'Progress',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    progress: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      allowNull: false,
    },
    completedParts: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: 'id',
      },
      allowNull: false,
    },
    courseId: {
      type: DataTypes.UUID,
      references: {
        model: Course,
        key: 'id',
      },
      allowNull: false,
    },
  },
  {
    timestamps: true,
  },
);

export default Progress;
