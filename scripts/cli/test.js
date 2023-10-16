#!/usr/bin/env node

console.log(process.argv);

let spawn = require('child_process').spawn;

let execPath = process.argv[0],
  args = process.argv[1].slice(0, process.argv[1].lastIndexOf('/')) + '/' + process.argv[2];
args = [args];
let proc = spawn(execPath, args, { stdio: 'inherit' });
proc.on('close', process.exit.bind(process));
proc.on('error', function (err) {
  if (err.code == 'ENOENT') {
    console.error('\n  %s(1) does not exist, try --help\n', bin);
  } else if (err.code == 'EACCES') {
    console.error('\n  %s(1) not executable. try chmod or run with root\n', bin);
  }
  process.exit(1);
});
