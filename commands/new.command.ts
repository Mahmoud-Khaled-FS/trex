import { Command } from 'commander';
import { newAction } from '../actions/new.action';
export async function newCommand(program: Command) {
  program
    .command('new [name]')
    .alias('n')
    .description('genrate new application')
    .action(async (name) => await newAction(name));
}
