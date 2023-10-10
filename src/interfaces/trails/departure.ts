export interface IDeparture {
  id: number;
  dates: Date[];
  range: Date[];
  relevance_status: boolean;
  createdAt: string | null;
  updatedAt: string | null;
}
