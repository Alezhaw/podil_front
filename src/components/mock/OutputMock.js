export const validateCreditCard = (item) => {
  const itemReplace = item.replaceAll(" ", "");
  const checkLength = itemReplace.length === 16;
  const checkNumber = /^[0-9]+$/.test(itemReplace);
  return checkLength && checkNumber;
};

export const validateYandexMoney = (item) => {
  const checkLength = item.length === 12;
  const checkNumber = /^[0-9]+$/.test(item);
  return checkLength && checkNumber;
};

export const validateWebmoney = (item) => {
  const item1 = item.slice(0, 1);
  const item2 = item.slice(1);
  const checkItem1 = /^[a-zA-Z]$/.test(item1);
  const checkItem2 = validateYandexMoney(item2);
  return checkItem1 && checkItem2;
};

export const adminChatStatusMock = ["Виден пользователю", "Удалён для пользователя"];
export const adminChatNewMessageMock = ["Новое сообщение", "Новых сообщений нет"];
export const userPath = ["/", "/deal", "/systemmessages", "/payments", "/output", "/howitwork", "/deals", "/sertificates", "/makedeal", "/rules", "/disputes"];
export const userPathForAdmin = {
  "/": "Домашняя страница",
  "/deal": "Сделка",
  "/systemmessages": "Системное сообщение",
  "/payments": "Пополнения",
  "/output": "Мой счет",
  "/howitwork": "Помощь",
  "/deals": "Мои сделки",
  "/sertificates": "Сертификаты",
  "/makedeal": "Создание сделки",
  "/rules": "Правила",
  "/disputes": "Решение споров",
};
export const outputMock = ["История пополнений", "Перевод по реквизитам", "Перевод пользователю"];
