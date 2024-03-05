export interface ITrails {
  id: number;
  planning_person_id: number;
  date_scheduled: Date | null;
  company_id: number; // объект в бд называется regiments
  route_number: number;
  departure_dates: Date[] | null;
  presentation_date: Date | null;
  presentation_time_id: number;
  regionId: number;
  city_id: number;
  form_id: number;
  reservation_status_id: number;
  alternative: string;
  landmarks: string;
  contract_status_id: number;
  contract_comment: string;
  comment: string;
  sent_to_podil: boolean;
  sent_to_bases: boolean;
  sent_to_speaker: boolean;
  sent_to_scenario: boolean;
  autozonning: string;
  regionalization_comment: string;
  date_of_the_previous_presentation: Date | null;
  project_sales_id: number;
  project_concent_id: number;
  call_template_id: number;
  relevanceStatus: boolean;
  departure_id: number;
  departure_date_id: number;
  gazooServerId: string;
  gazooCampaignId: number;
  stopped: boolean;
  createdAt: string | null;
  updatedAt: string | null;
}
