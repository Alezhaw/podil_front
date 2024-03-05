export const getFormatTime = (item) => {
  return Number(item?.time?.split(":")[0]);
};

export const getFormatTimeByTime = (time) => {
  return Number(time?.split(":")[0]);
};

export const getFormatDate = (item) => {
  const date = new Date(item);
  if (date == "Invalid Date") {
    return item;
  }
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day < 10 ? `0${day}` : day}.${month < 10 ? `0${month}` : month}.${year}`;
};

export const colors = {
  blue: "#9FC5E9",
  skyColor: "#00FFFF",
  purple: "#BD90A7",
  greenLight: "#D8EAD2",
  greenDark: "#69A84F",
  green: "#00FF00",
  red: "#FF0000",
  pink: "#E99998",
  orange: "#FFD967",
  yellow: "#FFE59A",
};

export const timeColors = [colors.blue, colors.orange, colors.purple];
export const contractStatusColors = ["whire", colors.orange, colors.skyColor];
export const cityStatusColors = [];
export const regimentColors = ["white", colors.blue, colors.orange, colors.green, "white", colors.purple];
export const reservationStatusColumnColors = ["white", colors.orange, colors.green, colors.greenLight, colors.pink];
export const reservationStatusColors = ["white", colors.orange, colors.greenLight, colors.greenDark, colors.red];
