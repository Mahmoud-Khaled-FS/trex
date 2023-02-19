import inquirer from 'inquirer';
import { renderBanner } from '../lib/ui';
import { getTemplatesDir } from '../helpers/templates';
import { Project } from '../lib/project';
import { defaultOrm } from '../lib/default';

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
    {
      message: "Wan't to use ORM?",
      choices: defaultOrm,
      name: 'orm',
      type: 'list',
      default: 'none',
    },
  ]);
  project.selectTemplate(answer.template);
  project.selectOrm(answer.orm !== 'none' ? answer.orm : null);
  await project.create();
  process.exit(0);
}
