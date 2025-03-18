export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return date.toLocaleDateString('ru-RU', options).replace(/\//g, '.');
};

export const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  const optionsDate = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit' };

  const formattedDate = date.toLocaleDateString('ru-RU', optionsDate).replace(/\//g, '.');
  const formattedTime = date.toLocaleTimeString('ru-RU', optionsTime);

  return `${formattedDate}, ${formattedTime}`;
};
