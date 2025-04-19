import * as tagService from '../services/tagService.js';

export const createTag = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Имя тега обязательно' });
  }

  try {
    const tag = await tagService.addTag(name);

    return res.status(200).json(tag);
  } catch (error) {
    console.error('Ошибка при создании тега:', error);
    return res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
};
