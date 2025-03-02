import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Course from './CourseModel.js';
import Tag from './TagModel.js';

const CourseTag = sequelize.define(
  'CourseTag',
  {
    course_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Course,
        key: 'id',
      },
    },
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Tag,
        key: 'id',
      },
    },
  },
  {
    timestamps: false,
    primaryKey: ['course_id', 'tag_id'],
  },
);

export default CourseTag;
