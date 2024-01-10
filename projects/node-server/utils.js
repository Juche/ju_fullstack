import { networkInterfaces, type } from 'node:os'

/**
 * 获取本机 ip => 用于打印服务地址供Windows宿主使用
 * 使用 node 自带的 os 模块获取 IP
 * @returns ip
 */

export function getLocalIP() {
  const osType = type() //系统类型
  const netInfo = networkInterfaces() //网络信息
  let ip = ''
  if (osType === 'Windows_NT') {
    for (const dev in netInfo) {
      //win7的网络信息中显示为本地连接，win10显示为以太网
      if (dev === '本地连接' || dev === '以太网') {
        for (let j = 0; j < netInfo[dev].length; j++) {
          if (netInfo[dev][j].family === 'IPv4') {
            ip = netInfo[dev][j].address
            break
          }
        }
      }
    }
  } else if (osType === 'Linux') {
    ip = netInfo.eth0[0].address
  } else if (osType === 'Darwin') {
    // mac操作系统
  } else {
    // 其他操作系统
  }

  return ip
}
