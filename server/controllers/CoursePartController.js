import CoursePart from '../models/CoursePartModel.js';

export const getCourseParts = async (req, res) => {
  const { courseId } = req.query;

  try {
    const courseParts = await CoursePart.findAll({
      where: { courseId },
      order: [['order', 'ASC']],
    });

    if (!courseParts.length) {
      return res.status(404).json({ message: 'Части курса не найдены.' });
    }

    return res.status(200).json(courseParts);
  } catch (error) {
    console.error('Ошибка при получении частей курса:', error);
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
};
