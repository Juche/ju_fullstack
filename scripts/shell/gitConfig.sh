#!/bin/bash
set -e

echo -e "\n-------------- 配置用户信息 --------------\n"

echo -en "\e[33m请输入用户名:\e[32;4;1m\t"
read name
echo -en "\e[0;33;24m请输入邮箱:\e[32;4;1m\t"
read email

echo -e "\n\e[0;24m-------------- 修改用户信息 --------------\n"

echo -en "\e[33m确定修改\e[31m[Y/N]\e[32;4;1m\t"
read isExec
# if [ $isExec === Y ] || [ $isExec === y ] ; then # 无输入时表达式报错
if [ _$isExec == _Y ] || [ _$isExec == _y ] ; then # 添加一个辅助字符防止变量为空
  echo -e "\n\e[0;24m执行命令: git config user.name $name"
  git config user.name $name
  echo 执行命令: git config user.name $email
  git config user.email $email
  echo -e "\e[32mgit 用户信息配置完成!"
else
  echo -e "\n\e[0;31;24m放弃操作!"
fi

echo -e "\n\e[0m-------------- 当前用户信息 --------------\n"

## $(COMMAND) 或 `COMMAND` 用来获取命令执行结果
# echo 当前用户: $(git config user.name)
# echo 当前邮箱: $(git config user.email)
echo -e "当前用户: \e[32m`git config user.name`\e[0m"
echo -e "当前邮箱: \e[32m`git config user.email`\e[0m\n"
