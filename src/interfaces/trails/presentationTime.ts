export interface IPresentationTime {
  id: number;
  presentation_hour: string[];
  rental_hours: string;
  relevance_status: boolean;
  alternative: boolean;
  createdAt: string | null;
  updatedAt: string | null;
}
