import { IUser } from "../interfaces/users";
import axios from "./axios";
import jwt_decode from "jwt-decode";

export const axiosRegistration = async (email: string, password: string, nickname: string) => {
  try {
    const { data } = await axios.post("api/user/registration", { email, password, role: "ADMIN", nickname });
    localStorage.setItem("token", data.token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
    if (!data.token) return;
    return jwt_decode(data.token);
  } catch (error: any) {
    return error?.response?.data?.message;
  }
};

export const axiosLogin = async (email: string, password: string) => {
  const { data } = await axios.post("api/user/login", { email, password });
  localStorage.setItem("token", data.token);
  axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
  return jwt_decode(data.token);
};

export const check = async () => {
  if (!localStorage.getItem("token")) return;
  const { data } = await axios.get("api/user/auth");
  localStorage.setItem("token", data.token);
  axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
  return jwt_decode(data.token);
};

export const axiosChangeNickname = async (nickname: "string", id: number, password: "string") => {
  try {
    const { data } = await axios.post("api/user/nickname", { nickname, id, password });

    return data;
  } catch (e: any) {
    return e?.response?.data?.message;
  }
};

export const axiosChangePassword = async (newPassword: "string", id: number, password: "string") => {
  try {
    const { data } = await axios.post("api/user/password", { newPassword, id, password });

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const axiosGetAllUsers = async () => {
  try {
    const { data } = await axios.get("api/user/get");

    return data?.users;
  } catch (e) {
    console.error(e);
  }
};

export const axiosChangeRole = async (role: string, id: number, creatorEmail: string, creatorPassword: string) => {
  try {
    const { data } = await axios.post("api/user/role", { role, id, creatorEmail, creatorPassword });

    return data;
  } catch (e) {
    console.error(e);
    return e;
  }
};

export const axiosChangeScore = async (score: number, id: number, creatorEmail: string, creatorPassword: string) => {
  try {
    const { data } = await axios.post("api/user/score", { score, id, creatorEmail, creatorPassword });

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const axiosIncreaseScore = async (id: number, email: string, password: string, receiver: string) => {
  try {
    const { data } = await axios.post("api/user/increaseScore", { id, email, password, receiver });

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const axiosDecreaseScore = async (score: number, email: string, password: string) => {
  try {
    const { data } = await axios.post("api/user/decreaseScore", { score, email, password });

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const axiosChangeSystemMessage = async (systemMessage: string, id: number, creatorEmail: string, creatorPassword: string) => {
  try {
    const { data } = await axios.post("api/user/message", { systemMessage, id, creatorEmail, creatorPassword });

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const axiosChangeSystemMessageAtUser = async (email: string, password: string) => {
  try {
    const { data } = await axios.post("api/user/messageAtUser", { email, password });

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const axiosChangeCompleted = async (completed: number, id: number, creatorEmail: string, creatorPassword: string) => {
  try {
    const { data } = await axios.post("api/user/completed", { completed, id, creatorEmail, creatorPassword });

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const axiosChangeCheck = async (check: string, id: number, creatorEmail: string, creatorPassword: string) => {
  try {
    const { data } = await axios.post("api/user/checkRu", { check, id, creatorEmail, creatorPassword });

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const axiosChangeCheckUser = async (check: string, email: string, password: string) => {
  try {
    const { data } = await axios.post("api/user/checkRuUser", { check, email, password });

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const axiosChangeTransferAmount = async (minimumTransferAmount: number, sumTransferAmoumt: number, id: number, creatorEmail: string, creatorPassword: string) => {
  try {
    const { data } = await axios.post("api/user/transferAmount", { minimumTransferAmount, sumTransferAmoumt, id, creatorEmail, creatorPassword });

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const axiosChangeUser = async (
  id: number,
  role: string,
  score: number,
  systemMessage: string,
  check: string,
  minimumTransferAmount: number,
  completed: number,
  creatorEmail: string,
  creatorPassword: string
) => {
  try {
    const { data } = await axios.post("api/user/change", { id, role, score, systemMessage, check, minimumTransferAmount, completed, creatorEmail, creatorPassword });
    return data;
  } catch (e) {
    console.error(e);
  }
};

// export const axiosDeleteUser = async (id: number, creatorEmail: string, creatorPassword: string) => {
//     const { data } = await axios.post('api/user/delete', { id, creatorEmail, creatorPassword });
//     return data;
// };

export const axiosRemoveUser = async (id: number, adminID: number) => {
  const { data } = await axios.post("api/user/remove", { id, adminID });

  return data;
};
