export interface ApiResponse<T = unknown> {
  responseCode: number;
  responseMessage: string;
  response?: T;
}
