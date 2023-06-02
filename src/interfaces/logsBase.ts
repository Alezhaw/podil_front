export interface ILogsBase {
    id: number,
    country: string,
    action: string,
    user_id: number,
    user_email: string,
    differences: JSON,
    id_base: number,
    base_id: string,
    time: Date,
}