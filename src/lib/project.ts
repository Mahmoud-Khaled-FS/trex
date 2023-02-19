import chalk from 'chalk';
import validate from 'validate-npm-package-name';
import { join } from 'path';
import * as fs from 'fs-extra';
import { getPackageJSON } from './default';
import { errorMessage, spiner } from './ui';
import PackageManager from './package_manager';

export class Project {
  private templateDir: string;
  private orm: string | null;
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
  public selectOrm(o: string | null) {
    this.orm = o;
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
    const s = spiner('Initialize Project');
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
    const s = spiner('Get packages');
    try {
      const pk = getPackageJSON(this.dirName);
      await fs.writeFile(process.cwd() + '/package.json', pk, 'utf-8');
      s.succeed();
    } catch (err) {
      errorMessage('Can not create package.json', s);
    }
  }
  private async copyFiles() {
    const s = spiner('creating files');
    try {
      await fs.copy(this.templateDir, process.cwd());
      if (this.orm) {
        await fs.createFile(join(process.cwd(), 'src', 'config', 'database.ts'));
      }
      s.succeed();
    } catch (err) {
      errorMessage('Can not create project', s);
    }
  }
  private async install() {
    const s = spiner('Installing packages');
    try {
      const packagesBuffer = await fs.readFile(join(process.cwd(), 'trex.json'));
      const defaultPackages = JSON.parse(packagesBuffer.toString());
      const dependencies: string[] = defaultPackages.dependencies;
      if (this.orm) {
        dependencies.push(this.orm);
      }
      const packageManager = new PackageManager(dependencies, defaultPackages.devDependencies);
      packageManager.onError(() => {
        errorMessage('can not install package try [npm install]', s);
      });
      packageManager.onFinish((code) => {
        if (code === 0) {
          return true;
        }
        s.fail();
        return false;
      });
      await packageManager.installDependencies();
      await packageManager.installDevDependencies();
      await fs.unlink(join(process.cwd(), 'trex.json'));
      s.succeed();
      console.log(chalk.greenBright('your project is ready for start.'));
    } catch {
      errorMessage('can not install package try [npm install]', s);
    }
  }
}
