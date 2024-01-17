
# Git 实用操作笔记

- 查看远程仓库地址 `git remote -v`

## git 分支操作

- 查看分支 => 所有: `git branch -a` 远程: `git branch -r` 本地: `git branch`
- 创建并切换分支 `git checkout -b dev`
  - 创建分支 `git branch dev`
  - 切换分支 `git checkout dev`
- 本地分支初次提交(远程无对应分支) `git push –u origin <branch name>` `git push --set-upstream origin dev`
- 多分支切换开发

```sh
# 当前分支代码没写完，还不想提交且因为有紧急需求不得不切换分支
# 这个时候可以 使用“工作现场”将代码暂时放着
git stash save "存储说明"  # "git stash"则将上次commit注释作为说明
git checkout B
# 处理完紧急需求拿出继续开发
git checkout A
git stash pop

# 如果本来想在A分支上开发， 开发过程中才发现当前处在B分支
# 想强制将工作区间代码迁到A分支也可以借助“工作现场”完成
git stash save "存储说明"
git checkout B
git stash pop
# 如有冲突且处理完所有冲突
git add -A
```

---

```sh
# 列出所有本地分支
$ git branch

# 列出所有远程分支
$ git branch -r

# 列出所有本地分支和远程分支
$ git branch -a

# 新建一个分支，但依然停留在当前分支
$ git branch [branch-name]

# 新建一个分支，并切换到该分支
$ git checkout -b [branch]

# 新建一个分支，指向指定commit
$ git branch [branch] [commit]

# 新建一个分支，与指定的远程分支建立追踪关系
$ git branch --track [branch] [remote-branch]

# 切换到指定分支，并更新工作区
$ git checkout [branch-name]

# 切换到上一个分支
$ git checkout -

# 建立追踪关系，在现有分支与指定的远程分支之间
$ git branch --set-upstream [branch] [remote-branch]

# 合并指定分支到当前分支
$ git merge [branch]

# 选择一个commit，合并进当前分支
$ git cherry-pick [commit]

# 删除分支
$ git branch -d [branch-name]

# 删除远程分支
$ git push origin --delete [branch-name]
$ git branch -dr [remote/branch]

# 更新远程分支列表
git remote update origin --prune
```
