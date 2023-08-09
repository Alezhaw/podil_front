export const getFormatTime = (item) => {
  return Number(item?.time?.split(":")[0]);
};
