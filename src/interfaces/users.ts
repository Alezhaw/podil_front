export interface IUser {
  id: number;
  email: string;
  password: string | null;
  role: string;
  score: number;
  nickname: string;
  relevance_status: boolean;
}
