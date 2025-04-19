import Tag from '../models/TagModel.js';

export const addTag = async (name) => {
  const existingTag = await Tag.findOne({ where: { name } });
  if (existingTag) {
    return existingTag;
  }

  const newTag = await Tag.create({ name });
  return newTag;
};
