export function getPackageJSON(name: string) {
  const temp = `{
  "name": "${name}",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev":"nodemon ./src/index.ts"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}`;
  return temp;
}

export const defaultOrm = ['none', 'prisma', 'sequelize', 'mongoose', 'typeorm'];
