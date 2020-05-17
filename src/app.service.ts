import { Injectable } from '@nestjs/common';
import { sha256 } from "js-sha256";

@Injectable()
export class AppService {
  getHello(): string {
    const hash1 = sha256('Hello World!');
    const hash2 = sha256('Hello World!');
    const hash3 = sha256('Hello World!Hello World!');
    const hash4 = sha256('Hello World!Hello World!Hello World!');
    const hash5 = sha256('世界您好！世界您好！世界您好！世界您好！世界您好！世界您好！');
    return hash1 + '<br>' + hash2 + '<br>' + hash3 + '<br>' + hash4 + '<br>' + hash5 + '<br>';
    // return 'Hello World!';
  }
}
