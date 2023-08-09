export interface ILogsCity {
  id: number;
  country: string;
  action: string;
  user_id: number;
  user_email: string;
  differences: string | [string, string, string][];
  id_for_base: number;
  godzina: string;
  city_lokal: string;
  time: Date;
  createdAt: string;
  updatedAt: string;
}
