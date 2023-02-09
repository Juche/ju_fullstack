#!/bin/bash
set -e

echo "git 用户信息配置开始!"

echo "请输入用户名:"
read name
echo "执行命令: git config user.name $name"
git config user.name $name

echo "请输入邮箱:"
read email
echo "执行命令: git config user.name $email"
git config user.email $email

echo "git 用户信息配置完成!"
