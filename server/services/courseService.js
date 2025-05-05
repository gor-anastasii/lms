import { Op, Sequelize } from 'sequelize';
import Course from '../models/CourseModel.js';
import Tag from '../models/TagModel.js';
import User from '../models/UserModel.js';
import Progress from '../models/ProgressModel.js';
import CoursePart from '../models/CoursePartModel.js';
import CourseTag from '../models/CourseTagsModel.js';
import Review from '../models/ReviewModel.js';

export const getAllCourses = async (userId, limit, offset) => {
  return await Course.findAll({
    where: { status: 'public' },
    include: [
      { model: Tag, through: { attributes: [] } },
      { model: User, attributes: ['username'] },
      {
        model: Progress,
        where: { userId },
        required: false,
        attributes: ['progress'],
      },
      {
        model: CoursePart,
        where: { status: 'active' },
        required: false,
        order: [['order', 'ASC']],
      },
    ],
    limit,
    offset,
    order: [
      ['averageRating', 'DESC'],
      ['createdAt', 'DESC'],
    ],
  });
};

export const getCourseById = async (courseId, userId) => {
  return await Course.findOne({
    where: {
      id: courseId,
      status: 'public',
    },
    include: [
      { model: Tag, through: { attributes: [] } },
      { model: User, attributes: ['username'] },
      {
        model: Progress,
        where: { userId },
        required: false,
        attributes: ['progress'],
      },
      {
        model: CoursePart,
        where: { status: 'active' },
        required: false,
        order: [['order', 'ASC']],
      },
    ],
  });
};

export const deleteCourse = async (id) => {
  return await Course.destroy({ where: { id } });
};

export const getCourseDetails = async (courseId, userId) => {
  const progressEntry = await Progress.findOne({
    where: { userId, courseId },
    attributes: ['progress', 'completedParts'],
  });

  const course = await Course.findOne({
    where: { id: courseId },
    include: [{ model: CoursePart, where: { status: 'active' }, order: [['order', 'ASC']] }],
  });

  return { course, progressEntry };
};

export const getCoursesByTeacher = async (teacherId, offset, limit, search) => {
  return await Course.findAll({
    where: {
      teacherId,
      title: {
        [Op.iLike]: `%${search}%`,
      },
    },
    include: [
      { model: Tag, through: { attributes: [] } },
      { model: User, attributes: ['username'] },
      { model: CoursePart, order: [['order', 'ASC']] },
    ],
    order: [
      [
        Sequelize.literal(`
        CASE
          WHEN "Course"."published" = 'draft' THEN 1
          WHEN "Course"."published" = 'unpublished' THEN 2
          WHEN "Course"."published" = 'published' THEN 3
          WHEN "Course"."published" = 'blocked' THEN 4
          ELSE 5
        END
      `),
        'ASC',
      ],
      ['createdAt', 'ASC'],
    ],
    limit: limit,
    offset: offset,
  });
};

export const getCoursesByTeacherForAnalytic = async (teacherId) => {
  return await Course.findAll({
    where: {
      teacherId,
    },
    include: [
      { model: Tag, through: { attributes: [] } },
      { model: User, attributes: ['username'] },
      { model: CoursePart, order: [['order', 'ASC']] },
    ],
  });
};

export const countPartsByCourseId = async (courseId) => {
  try {
    const count = await CoursePart.count({
      where: {
        courseId: courseId,
        status: 'active',
      },
    });
    return count;
  } catch (error) {
    console.error('Ошибка при подсчете частей курса:', error);
    throw error;
  }
};

export const getProgressByCourseId = async (courseId) => {
  try {
    const progress = await Progress.findAll({
      where: {
        courseId: courseId,
      },
    });
    return progress;
  } catch (error) {
    console.error('Ошибка при получении прогресса по курсу:', error);
    throw error;
  }
};

export const countSubscribersForCourses = async (courses) => {
  return Promise.all(
    courses.map(async (course) => {
      const subscriberCount = await Progress.count({
        where: { courseId: course.id },
      });

      return {
        ...course.toJSON(),
        subscriberCount,
      };
    }),
  );
};

export const getCoursesByTeacherAfterUpdate = async (teacherId, id) => {
  return await Course.findOne({
    where: { teacherId, id },
    include: [
      { model: Tag, through: { attributes: [] } },
      { model: User, attributes: ['username'] },
      { model: CoursePart, order: [['order', 'ASC']] },
    ],
  });
};

export const createTeacherCourse = async (teacherId, title) => {
  return await Course.create({
    teacherId,
    title,
    description: '',
    price: 0,
    topic: '',
    status: 'private',
    published: 'draft',
    imageUrl: null,
    averageRating: 0,
  });
};

export const updateTextFields = async (id, teacherId, data) => {
  const course = await Course.findByPk(id);
  if (!course) return null;

  if (course.teacherId !== teacherId) throw new Error('У вас нет доступа');

  if (data.title) course.title = data.title;
  if (data.description) course.description = data.description;
  if (data.topic) course.topic = data.topic;

  await course.save();

  return course;
};

export const linkTagsToCourse = async (courseId, teacherId, tagIds) => {
  const course = await Course.findOne({
    where: { id: courseId, teacherId },
  });

  if (!course) {
    throw new Error('Курс не найден или у вас нет доступа к его изменению');
  }

  const existingTags = await course.getTags();
  const existingTagIds = existingTags.map((tag) => tag.id);

  const newTagIds = tagIds.filter((tagId) => !existingTagIds.includes(tagId));
  for (const tagId of newTagIds) {
    await CourseTag.findOrCreate({
      where: {
        courseId,
        tagId,
      },
    });
  }

  const tagsToRemove = existingTagIds.filter((tagId) => !tagIds.includes(tagId));
  for (const tagId of tagsToRemove) {
    await CourseTag.destroy({
      where: {
        courseId,
        tagId,
      },
    });
  }

  return course;
};

export const findCourseByIdAndUser = async (courseId, teacherId) => {
  return await Course.findOne({ where: { id: courseId, teacherId } });
};

export const updateCourseImageUrl = async (course, imageUrl) => {
  course.imageUrl = imageUrl;
  await course.save();
  return course.imageUrl;
};

export const deleteCourseImageUrl = async (course) => {
  course.imageUrl = null;
  await course.save();
  return course.imageUrl;
};

export const findCourseById = async (id) => {
  return await Course.findOne({ where: { id } });
};

export const deleteCourseAndRelatedData = async (courseId) => {
  await CoursePart.destroy({ where: { courseId } });
  await Progress.destroy({ where: { courseId } });
  await CourseTag.destroy({ where: { courseId } });
  await Review.destroy({ where: { courseId } });

  await Course.destroy({ where: { id: courseId } });
};

export const updatePublishedStatus = async (course, value) => {
  course.published = value;
  await course.save();
};

export const updateStatus = async (course, value) => {
  course.status = value;
  await course.save();
};

export const countProgressByCourseId = async (courseId) => {
  return await Progress.count({
    where: {
      courseId: courseId,
    },
  });
};

export const countCompletedStudentsByCourseId = async (courseId) => {
  return await Progress.count({
    where: {
      courseId,
      progress: 100,
    },
  });
};

export const countReviewsByCourseId = async (courseId) => {
  return await Review.count({ where: { courseId } });
};
