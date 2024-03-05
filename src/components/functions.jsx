export function sortPresentationHour(array) {
  return array?.sort((a, b) => Number(a.presentation_hour[0]?.split(":")[0]) - Number(b.presentation_hour[0]?.split(":")[0]));
}

export function getValueById(id, key, array) {
  if (!id) {
    return "";
  }
  const item = array?.filter((item) => item.id === Number(id))[0];
  return item ? item[key] : "";
}
