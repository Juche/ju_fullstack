#!/usr/bin/env node

console.log(`${'\033'}[33m输入:${'\033'}[39m`);
process.stdout.write('输入:');
// process.stdout.write('\033[33m输入:\033[39m');
// process.stdout.write(`0o33[90m输入: 0o33[39m`);
process.stdin.resume(); //等待输入
process.stdin.setEncoding('utf-8');
process.stdin.on('data', (data) => {
  process.stdin.pause();
  // console.log('\033[90m输入的内容是:' + data + '\033[39m');
  // console.log(`\033[90m输入的内容是:${data}\033[39m`);
  // console.log(`${'\033[90m'} 输入的内容是:${data} ${'\033[39m'}`);
  console.log(`🚀 ~ process.stdin.on ~ data`, data);
});
