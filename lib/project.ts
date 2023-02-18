import chalk from 'chalk';
import validate from 'validate-npm-package-name';
import { join } from 'path';
import * as fs from 'fs-extra';

export class Project {
  private templateDir: string;
  constructor(private dirName: string) {
    if (!this.dirName) {
      console.log(chalk.redBright('Project name is empty!'));
      process.exit(1);
    }
    if (!validate(this.dirName).validForNewPackages) {
      console.log(chalk.redBright('Project name is not valdi!'));
      process.exit(1);
    }
  }
  public selectTemplate(t: string) {
    this.templateDir = join(__dirname, '..', 'templates', t);
    console.log(this.templateDir);
  }
  public async create() {
    try {
      const path = process.cwd() + '\\lib\\ui.ts';
      fs.access(path);
      console.log(path);
      console.log(await fs.access(path));
    } catch (err) {
      console.log(err);
    }
  }
}
