import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Course from './CourseModel.js';

const CoursePart = sequelize.define(
  'CoursePart',
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    video_url: {
      type: DataTypes.STRING,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  },
);
CoursePart.belongsTo(Course, { foreignKey: 'course_id' });

export default CoursePart;
