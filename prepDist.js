const fs = require('fs');
const copyFile = fs.promises.copyFile;
const mkdir = fs.promises.mkdir;

const FILE = 'prism-okaidia.css';
const SOURCE = 'node_modules/prismjs/themes/' + FILE;
const DESTINATION = 'dist/styles/' + FILE;

const cp = copyFile(SOURCE, DESTINATION, fs.constants.COPYFILE_EXCL).catch((err)=>{
  if (err.code !== 'EEXIST') console.error(err);
});

const PATH = `dist/screenshots/login`;

const md = mkdir(PATH, { recursive: true }).catch((err) =>{
  if (err.code !== 'EEXIST') console.error(err);
});
