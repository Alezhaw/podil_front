export interface ILogsBase {
    id: number,
    country: string,
    action: string,
    user_id: number,
    user_email: string,
    differences: string | [string, string, string][],
    id_base: number,
    base_id: string,
    time: Date,
    createdAt: string;
    updatedAt: string;
}