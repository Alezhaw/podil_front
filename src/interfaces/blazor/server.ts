export interface IServer {
  id: string;
  name: string;
  url: string;
  accountId: string;
  thread: number;
  collection: string;
  inReopen: boolean;
  index: number;
  isActive: boolean;
}
