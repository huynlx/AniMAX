export default class RequestError extends Error {
    code: number;
    devMessage: string;
    userMessage: string;
  
    constructor(
      code: number,
      devMessage: string,
      userMessage: string = "Lỗi server, vui lòng thử lại!"
    ) {
      super(devMessage);
  
      this.code = code;
      this.userMessage = userMessage;
    }
  }
  