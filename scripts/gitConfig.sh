#!/bin/bash
set -e

echo git 用户信息配置开始!

echo 请输入用户名:
read name
echo 执行命令: git config user.name $name

echo 请输入邮箱:
read email
echo 执行命令: git config user.name $email

echo
echo '##############################'
echo

echo 请核对用户信息
echo 用户名: $name
echo 邮 箱: $email
echo 是否执行配置操作[ Y / N ]
read isExec
# if [ $isExec === Y ] || [ $isExec === y ] ; then # 无输入时表达式报错
if [ _$isExec == _Y ] || [ _$isExec == _y ] ; then # 添加一个辅助字符防止变量为空
  git config user.name $name
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
