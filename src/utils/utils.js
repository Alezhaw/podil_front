export const getFormatTime = (item) => {
  return Number(item?.godzina?.split(":")[0]);
};
