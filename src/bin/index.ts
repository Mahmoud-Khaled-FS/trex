#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { initCommands } from '../commands';

async function main() {
  const program = new Command('trex');
  const version = '0.0.1';
  program.version('version: ' + chalk.bold.green(version), '-v, --version', 'Output the current version.');
  program.usage('<command> [options]');
  program.helpOption('-h, --help', 'Output usage information.');
  initCommands(program);
  program.parseAsync(process.argv);
}

main();
