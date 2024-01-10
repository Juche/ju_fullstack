#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const argv = process.argv // 获取命令行参数
const cwd = process.cwd()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// const __dirname = path.dirname('./');
const tempPath = path.resolve(__dirname, 'temp')
const srcPath = path.resolve(cwd, 'src')
const stdin = process.stdin // 获取当前进程上的输入流
const stdout = process.stdout // 获取当前进程上的输出流

fs.readdir(tempPath, (err, files) => {
  function writeFile(path, data) {
    fs.writeFile(path, data, (err) => {
      if (err) {
        writeFailed(err)
      } else {
        writeSuccess()
      }
    })
  }
  function writeSuccess() {
    console.log('写入成功!')
  }
  function writeFailed(err) {
    console.log('🚀 ~ writeFailed ~ err.toString()', err.toString())
  }
  function write(data) {
    console.log('🚀 ~ write ~ data', data)
    const filename = files[Number(data)]
    const filepath = tempPath + '/' + filename

    if (!filename) {
      stdout.write('输入的编号不存在,请重新输入: ')
    } else {
      stdin.pause()
      fs.readFile(filepath, 'utf8', (err, data) => {
        console.log(`🚀 ~ fs.read ~ data ${data}`)

        // cwd 项目根目录
        // fs.readdir(cwd, (err, files) => {
        fs.readdir(__dirname, (err, files) => {
          if (!files.includes('temp')) {
            fs.mkdir(tempPath, (err) => {
              if (err) {
                console.log('🚀 ~ fs.mkdir ~ err.toString()', err.toString())
              }
              writeFile(filepath, data + data)
            })
          } else {
            writeFile(filepath, data + data)
          }
        })
      })
    }
  }
  function read() {
    stdout.write('请输入编号: ')
    stdin.resume()
    stdin.setEncoding('utf8')
    stdin.on('data', write)
  }
  function handleFile(i) {
    const filename = files[i]
    fs.stat(tempPath + '/' + filename, (err, stat) => {
      if (stat.isDirectory) {
        console.log('   ' + i + '   ' + filename)
      } else {
        //这里将读取到文件标记上编号打印到控制台界面，为选择文件提供参考信息
        console.log('   ' + i + '   ' + filename)
      }
      if (files.length === ++i) {
        read()
      } else {
        handleFile(i)
      }
    })
  }

  handleFile(0)
})
