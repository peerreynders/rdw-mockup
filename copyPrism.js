const fs = require('fs');
const copyFile = fs.promises.copyFile;

const FILE = 'prism-okaidia.css';
const SOURCE = 'node_modules/prismjs/themes/' + FILE;
const DESTINATION = 'dist/styles/' + FILE;

copyFile(SOURCE, DESTINATION, fs.constants.COPYFILE_EXCL).catch((err)=>{
  if (err.code !== 'EEXIST') console.error(err);
});
