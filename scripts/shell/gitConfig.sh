#!/bin/bash
set -e

echo -e "\e[33mgit 用户信息配置开始!\e[0m"

echo -e "请输入用户名:\033[32;4m"
read name

echo -e "\033[33;24m请输入邮箱:\033[32;4m"
read email

echo
echo -e '\033[0;24m##############################'
echo

echo 请核对用户信息
echo 用户名: $name
echo 邮 箱: $email
echo 是否执行配置操作[ Y / N ]
read isExec
# if [ $isExec === Y ] || [ $isExec === y ] ; then # 无输入时表达式报错
if [ _$isExec == _Y ] || [ _$isExec == _y ] ; then # 添加一个辅助字符防止变量为空
  echo 执行命令: git config user.name $name
  git config user.name $name
  echo 执行命令: git config user.name $email
  git config user.email $email
  echo git 用户信息配置完成!
else
  echo 放弃操作!
fi

# if [ $isExec == N ] || [ $isExec == n ]
# then
#   echo 放弃操作!
# fi

echo
echo '##############################'
echo

## $(COMMAND) 或 `COMMAND` 用来获取命令执行结果
# echo 当前用户: $(git config user.name)
# echo 当前邮箱: $(git config user.email)
echo 当前用户: `git config user.name`
echo 当前邮箱: `git config user.email`
