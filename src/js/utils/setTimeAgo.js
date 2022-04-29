const setTimeAgo = (daysAgo = 0) => {
  const date = new Date();

  date.setDate(date.getDate() - daysAgo);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
};
export default setTimeAgo;
