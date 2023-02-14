import Koa from 'koa';
import { exec, execSync } from 'node:child_process';
import { networkInterfaces, type } from 'node:os';

// 获取本机 ip => 用于打印服务地址供Windows宿主使用

// 第一想法,通过解析 ip addr 命令的结果获取
// exec(`ip addr`, (err, stdout, stderr) => {
//   if (stdout) {
//     console.log(`stdout: ${stdout}`);
//   } else {
//     console.log(`stdout: ${stderr}`);
//   }
// });

// 使用 node 自带的 os 模块获取 IP
function getLocalIP() {
  const osType = type(); //系统类型
  const netInfo = networkInterfaces(); //网络信息
  let ip = '';
  if (osType === 'Windows_NT') {
    for (let dev in netInfo) {
      //win7的网络信息中显示为本地连接，win10显示为以太网
      if (dev === '本地连接' || dev === '以太网') {
        for (let j = 0; j < netInfo[dev].length; j++) {
          if (netInfo[dev][j].family === 'IPv4') {
            ip = netInfo[dev][j].address;
            break;
          }
        }
      }
    }
  } else if (osType === 'Linux') {
    ip = netInfo.eth0[0].address;
  } else if (osType === 'Darwin') {
    // mac操作系统
  } else {
    // 其他操作系统
  }

  return ip;
}

const ip = getLocalIP();
const port = '8888';

const app = new Koa();

app.use((ctx) => {
  ctx.body = 'Hello Koa';
});

app.listen(8888, () => {
  console.log(`Server running at http://${ip}:${port}/`);
});
