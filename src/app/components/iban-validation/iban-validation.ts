export class IbanValidation {
  code: string;
  message: string;

  constructor(error: any) {
    this.code = error.code;
    this.message = error.message;
  }
}
