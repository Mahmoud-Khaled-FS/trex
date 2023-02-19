import { spawn } from 'child_process';
class PackageManager {
  private onErrorCb: () => void;
  private onFinsihCb: (code: number | null) => boolean;
  constructor(private mainPack: string[], private devPack: string[]) {}

  installDependencies() {
    const promise = new Promise((resolve, reject) => {
      const ins = spawn('npm', ['install', '--save', ...this.mainPack], { shell: process.platform == 'win32' });
      ins.on('error', () => {
        this.onErrorCb();
        reject(false);
      });
      ins.on('close', (code) => {
        const result = this.onFinsihCb(code);
        if (result) {
          resolve(true);
        } else {
          reject(false);
        }
      });
    });
    return promise;
  }
  installDevDependencies() {
    const promise = new Promise((resolve, reject) => {
      const ins = spawn('npm', ['install', '--save-dev', ...this.devPack], { shell: process.platform == 'win32' });
      ins.on('error', () => {
        this.onErrorCb();
        reject(false);
      });
      ins.on('close', (code) => {
        const result = this.onFinsihCb(code);
        if (result) {
          resolve(true);
        } else {
          reject(false);
        }
      });
    });
    return promise;
  }
  onError(cb: () => void) {
    this.onErrorCb = cb;
  }
  onFinish(cb: (code: number | null) => boolean) {
    this.onFinsihCb = cb;
  }
}

export default PackageManager;
