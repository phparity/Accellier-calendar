export const centerDate = (startDate) => {
  const screenWidth = window.innerWidth;

  if (screenWidth >= 1500) {
    startDate.setDate(startDate.getDate() - 3);
  } else if (screenWidth >= 1190) {
    startDate.setDate(startDate.getDate() - 2);
  } else if (screenWidth >= 770) {
    startDate.setDate(startDate.getDate() - 1);
  } else if (screenWidth >= 500) {
    startDate.setDate(startDate.getDate());
  } else {
    startDate.setDate(startDate.getDate());
  }
};
