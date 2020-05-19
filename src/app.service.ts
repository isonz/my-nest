import { Injectable } from '@nestjs/common';
import { sha256 } from "js-sha256";

@Injectable()
export class AppService {
  getHello(): string {
    const hash1 = sha256('admin');              // 8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918
    const hash2 = sha256('admin888');           // aaffebecec560fec66e75f24062224ffa4e07696d2ae9a1fee3707c3f8fd9373
    const hash3 = sha256('admin1a2b3c4d5e');    // 316bf4c96f60a49561c7cb2d730ed3a167a31f5e3a3e84462868a8975a882f1b
    const hash4 = sha256('admin8881a2b3c4d5e'); // f2494135f0afd5d6aa3d5212e9fae923b7ba4fa711854e3bbaf975f3f5123aa3
    const hash5 = sha256('世界您好！世界您好！世界您好！世界您好！世界您好！世界您好！');
    return hash1 + '<br>' + hash2 + '<br>' + hash3 + '<br>' + hash4 + '<br>' + hash5 + '<br>';
    // return 'Hello World!';
  }
}
