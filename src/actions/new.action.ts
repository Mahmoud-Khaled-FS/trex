import inquirer from 'inquirer';
import { renderBanner } from '../lib/ui';
import { getTemplatesDir } from '../helpers/templates';
import { Project } from '../lib/project';

export async function newAction(name: string) {
  const project = new Project(name);
  await renderBanner();
  const templatesList = await getTemplatesDir();
  const answer = await inquirer.prompt([
    {
      message: 'Select a template: ',
      choices: templatesList,
      name: 'template',
      type: 'list',
    },
  ]);
  project.selectTemplate(answer.template);
  await project.create();
  process.exit(0);
}
