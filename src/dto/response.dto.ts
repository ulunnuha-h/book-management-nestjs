// response.dto.ts
export class ResponseDto<T> {
  message: string;
  success: boolean;
  data: T[];
}
