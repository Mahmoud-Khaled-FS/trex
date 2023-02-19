import { readdir } from 'fs-extra';
import { join } from 'path';

export async function getTemplatesDir(): Promise<string[]> {
  return await readdir(join(__dirname, '..', '..', 'templates'));
}
