const rimraf = require('rimraf');
const mkdirp = require('mkdirp');
const ncp = require('ncp');
const util = require('util');

const rimrafAsync = util.promisify(rimraf);
const mkdirpAsync = util.promisify(mkdirp);
const ncpAsync = util.promisify(ncp);

//const buildPath = './build';
const buildPathApi = './api';
const buildPathApp = './public';

const copyBuildFilesAsync = async (src, dest) => {
  try {
    console.log(`Creating directory: ${dest}`);
    await mkdirpAsync(dest);
    
    console.log(`Copying files: ${src} -> ${dest}`);
    await ncpAsync(src, dest);
  } catch (err) {
    throw err;
  }
};

// clean and build
console.log(`Cleaning build path: ${buildPathApi} and ${buildPathApp}`);
(build = async () => {
  try {
    await rimrafAsync(buildPathApi);
    await rimrafAsync(buildPathApp);

    // server files
    const serverSrc = 'packages/server/build';
    //const serverDest = `${buildPath}`;
    const serverDest = `${buildPathApi}`;
    console.log(`Building server files`);
    await copyBuildFilesAsync(serverSrc, serverDest);

    // client files
    const clientSrc = 'packages/app/build';
    //const clientDest = `${buildPath}/app/build`;
    const clientDest = `${buildPathApp}`;
    console.log(`Building client files`);
    await copyBuildFilesAsync(clientSrc, clientDest);

    console.log('Build completed successfully.');
  } catch (err) {
    console.log('Build failed.');
    if (err) return console.error(err);
  }
})();
