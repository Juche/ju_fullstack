#!/bin/bash
set -e

echo -e '\ngit 用户信息配置开始!'

echo -e "\n\e[33m请输入用户名:\033[32;4;1m"
read name

echo -e "\n\033[0;33;24m请输入邮箱:\033[32;4;1m"
read email

echo -e '\n\033[0;24m##############################\n'

echo 请核对用户信息
# echo 用户名: $name
# echo 邮 箱: $email
echo -e "\n\e[33m是否执行配置操作\e[31m[ Y / N ]\033[32;4;1m"
read isExec
# if [ $isExec === Y ] || [ $isExec === y ] ; then # 无输入时表达式报错
if [ _$isExec == _Y ] || [ _$isExec == _y ] ; then # 添加一个辅助字符防止变量为空
  echo -e "\n\033[0;24m执行命令: git config user.name $name"
  git config user.name $name
  echo 执行命令: git config user.name $email
  git config user.email $email
  echo -e "\033[32mgit 用户信息配置完成!"
else
  echo -e "\n\033[31;24m放弃操作!"
fi

echo -e '\n\e[0m##############################\n'

## $(COMMAND) 或 `COMMAND` 用来获取命令执行结果
# echo 当前用户: $(git config user.name)
# echo 当前邮箱: $(git config user.email)
echo 当前用户: `git config user.name`
echo -e "当前邮箱: `git config user.email`\n"
