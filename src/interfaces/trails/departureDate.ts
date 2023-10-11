export interface IDepartureDate {
  id: number;
  departure_id: number;
  data: Date;
  trails_id: number[] | null;
  relevance_status: boolean;
  createdAt: string | null;
  updatedAt: string | null;
}
