import * as crypto from 'crypto';
import 'dotenv/config';

export function encryptPassword(password: string) {
  try {
    const secretWord = process.env.SECRETKEY;
    if (!secretWord) {
      throw new Error('No define secret word in .env');
    }
    const hash = crypto.createHmac('sha256', secretWord);
    hash.update(password);
    return hash.digest('hex');
  } catch (error) {
    return password;
  }
}
