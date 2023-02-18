import { Command } from 'commander';
import { newCommand } from './new.command';
export function initCommands(program: Command) {
  newCommand(program);
}
