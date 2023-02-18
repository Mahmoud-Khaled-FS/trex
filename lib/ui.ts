import chalk from 'chalk';
import figlet from 'figlet';

export async function renderBanner() {
  const banner = figlet.textSync('    TREX     ', {
    width: 300,
    verticalLayout: 'full',
    horizontalLayout: 'full',
  });
  console.log(chalk.greenBright(banner));
}
