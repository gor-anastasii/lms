import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './UserModel.js';
import Course from './CourseModel.js';

const Review = sequelize.define(
  'Review',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
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
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
        max: 5,
      },
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  },
);

Review.belongsTo(User, { foreignKey: 'userId' });
Review.belongsTo(Course, { foreignKey: 'courseId' });

Review.addHook('afterDestroy', async (review, options) => {
  const courseId = review.courseId;

  const remainingReviews = await Review.findAll({
    where: { courseId },
    attributes: ['rating'],
  });

  const totalRating = remainingReviews.reduce((sum, r) => sum + r.rating, 0);
  const averageRating = remainingReviews.length > 0 ? totalRating / remainingReviews.length : 0;

  await Course.update({ averageRating }, { where: { id: courseId } });
});

Review.addHook('afterCreate', async (review, options) => {
  const courseId = review.courseId;

  const reviews = await Review.findAll({
    where: { courseId },
    attributes: ['rating'],
  });

  const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
  const averageRating = totalRating / reviews.length;

  await Course.update({ averageRating }, { where: { id: courseId } });
});

export default Review;
