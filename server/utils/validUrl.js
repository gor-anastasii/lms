export const isValidYouTubeUrl = (url) => {
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
  return youtubeRegex.test(url);
};

// Преобразование ссылки на видео в формат для встраивания
export const convertToEmbedUrl = (url) => {
  const videoIdMatch = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=))([^&\n]{11})/,
  );
  if (videoIdMatch && videoIdMatch[1]) {
    return `https://www.youtube.com/embed/${videoIdMatch[1]}`;
  }
  throw new Error('Неверный формат ссылки на видео');
};

// Проверка, является ли ссылка на изображение
export const isValidImageUrl = (url) => {
  const validImageFormats = ['.jpg', '.jpeg', '.png', '.gif'];
  return validImageFormats.some((format) => url.endsWith(format));
};
