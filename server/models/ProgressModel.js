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
    },
  },
  {
    timestamps: true,
  },
);
Progress.belongsTo(User, { foreignKey: 'user_id' });
Progress.belongsTo(Course, { foreignKey: 'course_id' });

export default Progress;
