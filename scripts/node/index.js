#!/usr/bin/env node

process.stdout.write('\033[33m输入：\033[32;4m');
process.stdin.resume(); //等待输入
process.stdin.setEncoding('utf-8');
process.stdin.on('data', function (data) {
  process.stdin.pause();
  console.log('\033[33;24m输入的内容是：\033[102;1m' + data.trim() + '\033[0m');
});
