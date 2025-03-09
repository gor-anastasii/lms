import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './UserModel.js';
import Course from './CourseModel.js';

const Progress = sequelize.define(
  'Progress',
  {
    progress: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  },
);
Progress.belongsTo(User, { foreignKey: 'userId' });
Progress.belongsTo(Course, { foreignKey: 'courseId' });

export default Progress;
