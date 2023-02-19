import chalk from 'chalk';
import figlet from 'figlet';
import ora from 'ora';

export async function renderBanner() {
  const banner = figlet.textSync('    TREX     ', {
    width: 300,
    verticalLayout: 'full',
    horizontalLayout: 'full',
  });
  console.log(chalk.greenBright(banner));
}

export function spiner(text: string) {
  const s = ora({
    text: text,
  });
  s.start();
  return s;
}

export function errorMessage(text: string, spiner?: ora.Ora) {
  if (spiner) {
    spiner.fail();
  }
  console.log();
  console.log(chalk.red(text));
  console.log();
  process.exit(1);
}
