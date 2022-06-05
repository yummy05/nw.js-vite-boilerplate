const fs = require('fs');
const NwBuilder = require('nw-builder');
const copyNodeModules = require('copy-node-modules');

try {
  const data = JSON.parse(fs.readFileSync('./src/package.json', 'utf8'));
  data.main = 'index.html';
  fs.writeFileSync('./dist/package.json', JSON.stringify(data, null, 2));
} catch (e) {
  console.error(e);
}

const srcDir = './';
const dstDir = './dist';
copyNodeModules(srcDir, dstDir, { devDependencies: false }, (err, results) => {
  if (err) {
    console.error(err);
    return;
  }
  Object.keys(results).forEach((index) => {
    const { version, name } = results[index];
    console.log(`Coppied: ${name}, version: ${version}`);
  });

  const nw = new NwBuilder({
    files: './dist/**/**',
    version: 'latest',
    flavor: 'normal',
    buildDir: './build',
    cacheDir: './node_modules/nw-builder/cache',
  });

  nw.on('log', console.log);

  nw.build().then(() => {
    console.log('all done!');
  }).catch((error) => {
    console.error(error);
  });
});
