export interface ICitiesWithReg {
  id: number;
  region_id: number;
  city_name: string;
  additional_city_name: string;
  county: string;
  city_type: string;
  population: string;
  autozonning: string[];
  start_coord: number | null;
  end_coord: number | null;
  relevance_status: boolean;
  createdAt: string | null;
  updatedAt: string | null;
}
