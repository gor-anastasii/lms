import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Course from './CourseModel.js';
import Tag from './TagModel.js';

const CourseTag = sequelize.define(
  'CourseTag',
  {
    courseId: {
      type: DataTypes.UUID,
      references: {
        model: Course,
        key: 'id',
      },
      allowNull: false,
    },
    tagId: {
      type: DataTypes.UUID,
      references: {
        model: Tag,
        key: 'id',
      },
      allowNull: false,
    },
  },
  {
    timestamps: false,
    primaryKey: ['courseId', 'tagId'],
  },
);

export default CourseTag;
