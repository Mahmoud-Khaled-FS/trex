import chalk from 'chalk';
import validate from 'validate-npm-package-name';
import { join } from 'path';
import * as fs from 'fs-extra';
import { defaultPackages, getPackageJSON } from './default';
import { spawn } from 'child_process';
import { errorMessage, spiner } from './ui';

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
    this.templateDir = join(__dirname, '..', '..', 'templates', t);
  }
  public async create() {
    try {
      await this.createDir();
      await this.addPackageJson();
      await this.copyFiles();
      await this.install();
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  }
  private async createDir() {
    const s = spiner('initialize files');
    try {
      await fs.mkdir(this.dirName);
      process.chdir(this.dirName);
      s.succeed();
    } catch (err) {
      if (err.code === 'EEXIST') {
        errorMessage(`Dir with name ${chalk.bold.green(this.dirName)} already exist!`, s);
        return;
      }
      errorMessage(`can not create project with this name ${chalk.bold.green(this.dirName)}`, s);
    }
  }
  private async addPackageJson() {
    const s = spiner('initialize files');
    try {
      const pk = getPackageJSON(this.dirName);
      await fs.writeFile(process.cwd() + '/package.json', pk);
      s.succeed();
    } catch (err) {
      errorMessage('Can not create package.json', s);
    }
  }
  private async copyFiles() {
    const s = spiner('creating files');
    try {
      await fs.copy(this.templateDir, process.cwd());
      s.succeed();
    } catch (err) {
      errorMessage('Can not create project', s);
    }
  }
  private async install() {
    return new Promise((resolve, reject) => {
      const s = spiner('Installing packages');
      const ins = spawn('npm', ['install', ...defaultPackages]);
      ins.on('error', () => {
        errorMessage('can not install package try [npm install]', s);
      });
      ins.on('close', (code) => {
        if (code === 0) {
          s.succeed();
          console.log(chalk.greenBright('your project is ready for start.'));
          resolve(true);
        } else {
          reject();
        }
      });
    });
  }
}
