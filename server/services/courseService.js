import { Op, Sequelize } from 'sequelize';
import Course from '../models/CourseModel.js';
import Tag from '../models/TagModel.js';
import User from '../models/UserModel.js';
import Progress from '../models/ProgressModel.js';
import CoursePart from '../models/CoursePartModel.js';
import CourseTag from '../models/CourseTagsModel.js';
import Review from '../models/ReviewModel.js';

export const getAllCourses = async (userId) => {
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

export const getCoursesWithSearchFilter = async (query, topic, userId) => {
  const whereConditions = {
    status: 'public',
    ...(topic && { topic }),
    ...(query && {
      [Op.or]: [
        {
          [Op.and]: [
            Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('title')), {
              [Op.like]: `%${query.toLowerCase()}%`,
            }),
          ],
        },
        {
          id: {
            [Op.in]: Sequelize.literal(`(
              SELECT "courseId" FROM "CourseTags" WHERE "tagId" IN (
                SELECT "id" FROM "Tags" WHERE LOWER(name) LIKE '%${query.toLowerCase()}%'
              )
            )`),
          },
        },
      ],
    }),
  };

  return await Course.findAll({
    where: whereConditions,
    include: [
      { model: Tag, through: { attributes: [] } },
      { model: User, attributes: ['username'] },
      {
        model: Progress,
        where: { userId },
        required: false,
        attributes: ['progress'],
      },
    ],
  });
};

export const getCoursesByTeacher = async (teacherId) => {
  return await Course.findAll({
    where: { teacherId },
    include: [
      { model: Tag, through: { attributes: [] } },
      { model: User, attributes: ['username'] },
      { model: CoursePart, order: [['order', 'ASC']] },
    ],
  });
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
