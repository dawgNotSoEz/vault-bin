export const formatDate = (date) => {
  // Implement date formatting logic
  return date;
};

export const truncate = (text, length) => {
  if (text.length > length) {
    return text.substring(0, length) + '...';
  }
  return text;
};

export const classnames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};