export interface IForm {
  id: number;
  local: string;
  address: string;
  telephone: string[];
  email: string;
  town: string;
  voivodeship: string;
  county: string;
  day: string[];
  cost: string[];
  from: string[];
  to: string;
  payment_method: string;
  presentation_number: string[];
  confirm: string;
  presentation_time: string[];
  room_number: string[];
  parking: string;
  comments: string;
  booker: string;
  starting_price: string[];
  trade_group: string;
  company: string;
  relevanceStatus: boolean;
  createdAt: string | null;
  updatedAt: string | null;
}
