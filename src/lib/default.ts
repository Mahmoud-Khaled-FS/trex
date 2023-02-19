export function getPackageJSON(name: string) {
  const temp = `{
"name": "${name}",
"version": "1.0.0",
"description": "",
"main": "index.js",
"scripts": {
  "test": "echo 'Error: no test specified' && exit 1"
},
"keywords": [],
"author": "",
"license": "ISC"
}`;
  return temp;
}

export const defaultPackages = ['dotenv'];
