#!/usr/bin/env node

process.stdout.write('\033[33m输入：\033[39m');
process.stdin.resume(); //等待输入
process.stdin.setEncoding('utf-8');
process.stdin.on('data', function (data) {
  process.stdin.pause();
  console.log('\033[90m输入的内容是：' + data + '\033[39m');
});
