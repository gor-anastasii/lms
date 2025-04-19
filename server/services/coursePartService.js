import CoursePart from '../models/CoursePartModel.js';
import Course from '../models/CourseModel.js';

export const createTeacherCoursePart = async (courseId, title, teacherId) => {
  const course = await Course.findOne({
    where: { id: courseId },
  });

  if (!course || course.teacherId !== teacherId) {
    throw new Error('Нет доступа к изменению курса.');
  }

  const existingParts = await CoursePart.findAll({
    where: { courseId },
  });

  const maxOrder = existingParts.reduce((max, part) => Math.max(max, part.order), 0);
  await CoursePart.create({
    courseId,
    title,
    content: '',
    videoUrl: '',
    order: maxOrder + 1,
    status: 'inactive',
  });
};

export const deleteCoursePart = async (coursePartId) => {
  const deletedCount = await CoursePart.destroy({ where: { id: coursePartId } });

  if (deletedCount === 0) {
    throw new Error('Раздел курса не найден');
  }
};

export const updateTextFields = async (id, teacherId, data) => {
  try {
    const coursePart = await CoursePart.findByPk(id);
    if (!coursePart) return null;

    const course = await Course.findByPk(coursePart.courseId);
    if (course.teacherId !== teacherId) throw new Error('У вас нет доступа');

    if (data.title) coursePart.title = data.title;
    if (data.description) coursePart.content = data.description;

    await coursePart.save();

    return coursePart;
  } catch (e) {
    console.error(e);
  }
};

export const updateCoursePartImageUrl = async (coursePart, imageUrl) => {
  coursePart.mediaUrl = imageUrl;
  await coursePart.save();
  return coursePart.mediaUrl;
};

export const findCoursePartById = async (coursePartId) => {
  return await CoursePart.findOne({ where: { id: coursePartId } });
};

export const deleteCoursePartMediaUrl = async (coursePart) => {
  coursePart.mediaUrl = null;
  await coursePart.save();
  return coursePart.mediaUrl;
};
