const { run } = require('runjs');

const root = process.cwd();

const directories = {
  'client': 'linky-client',
  'server': 'server',
  'serverBuild': 'server/build',
  'root': ''
};

const goto = Object.keys(directories).reduce((prev, curr) => ({
  ...prev,
  [curr]: () => process.chdir(`${root}/${directories[curr]}`)
}), {});

function buildClient() {
  goto.client();
  run('npm install');
  run('ng build --prod');
}

function buildServer() {
  goto.server();
  run('npm install');
  run('tsc');
}

function build() {
  buildClient();
  buildServer();
}

async function dev() {
  goto.client();
  const client = run('ng serve --open', {async: true});
  
  goto.serverBuild();
  const server = run('ts-node-dev src/index.js', {async: true});

  await client;
  await server;
}

function test() {
  goto.client();
  run('ng test --watch=false');
}

function coverage() {
  goto.client();
  run('ng test --watch=false --code-coverage');
}

module.exports = {
  build,
  dev,
  test,
  coverage
}
