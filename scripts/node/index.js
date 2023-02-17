#!/usr/bin/env node

process.stdout.write('\x1b[33m输入：\x1b[32;4m');
process.stdin.resume(); //等待输入
process.stdin.setEncoding('utf-8');
process.stdin.on('data', function (data) {
  process.stdin.pause();
  console.log('\x1b[33;24m输入的内容是：\x1b[102;1m' + data.trim() + '\x1b[0m');
});
