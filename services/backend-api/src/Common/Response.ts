export class ServerResponse {
  data;
  errors;
  constructor(
    data: object | null,
    errors: { message: string; field?: string }[] | null
  ) {
    this.data = data;
    this.errors = errors;
  }
}
