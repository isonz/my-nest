import { HttpException, HttpStatus } from "@nestjs/common";

export class ForbiddenException extends HttpException {
  constructor() {
    super('Forbidden ha ha', HttpStatus.FORBIDDEN);
  }
}
