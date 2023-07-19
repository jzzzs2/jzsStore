## git  分布式管理工具

```
1.初始配置
在gitBash中:
git config --global user.name “itcast”
git config --global user.email "xxx@qq.com"
git config --global user.name 查看
git config --global user.email 查看
```

```
2.为常用指令配置快捷方式
1)在用户目录中创建.bashrc文件(gitBash中输入touch ~/.bashrc创建,~代表用户目录)
2)输入以下内容:
#用于输出git提交日志
alias git-log='git log --pretty=oneline --all --graph --abbrev-commit'
#用于输出当前目录所有文件及基本信息
alias ll='ls -al'
3)gitBash中更新修改的配置
执行 source ~/.bashrc
```

## 工作区暂存区仓库中操作

```
git init 初始化工作区
git status 查看操作状态
git add . 将所有修改内容提交到暂存区
git commit -m "注释修改内容" 将修改内容提交到本地仓库
git-log (git log 多配置参数的快捷语句) 显示所有提交记录
git reset --hard '操作的版本Id'  可以通过 git reflog查询
忽略某些文件变化,在工作区目录创建 .gitignore文件,在文件中书写忽略的文件名,例如 *.b
```

+ touch xx.xx 创建文件      mkdir xx 创建文件夹    vi xx.xx 修改文件内容 esc + :wq 退出

## 不同分支对本地仓库修改冲突

```
在冲突文件中对内容进行修改,并重新add commit到本地仓库
```



## 分支

```
查看分支 git branch
创建分支 git branch 分支名
切换分支 git checkout 分支名
创建并切换分支 git checkout -b 分支名
删除分支 git branch -d 分支名
强制删除分支 git branch -D 分支名 (当删除的分支 被merge到过当前分支中且有新内容未更新到当前分支中时)
合并分支 git merge 要合并的分支名
```

## 配置远程仓库 这里使用码云

```
1.在gitBash中获取公钥和远程仓库进行绑定,确认用户权限
ssh-keygen -t rsa 第一次不断回车即可
cat ~/.ssh/id_rsa.pub 获取公钥
在gitee官网仓库中进行公钥设置
ssh -T git@gitee.com 查看是否绑定成功
```

```
2.在本地引入远程仓库并操作
git remote add 远程仓库名称 ssh地址    引入远程仓库
git remote 查看引入的远程仓库

推送代码:
git push 远程仓库名称 [本地分支名称:远程仓库分支名称 || 本地分支名称(如果远程仓库分支名称和本地仓库分支名称相同)]
绑定本地分支和远程分支: git push --set-upstream 远程仓库名 本地仓库分支:远程仓库分支 之后只需要git push即可推送代码
查看本地分支和远程分支绑定关系: git branch -vv

远程仓库名称例子:
git remote add origin https://github.com/你的GitHub用户名/你的仓库名.git
```

## Clone + Pull(fetch + merge ) 冲突问题

```
1. 克隆代码到本地 git clone ssh地址 本地目录? (本地目录不写则默认使用路径中字符作为文件夹)
2. 获取远程仓库中修改的记录到本地 git fetch 远程仓库名 本地分支名
如果不指定远端名称和分支名，则抓取所有分支。
3. 获取远程仓库修改的内容并合并到本地仓库分支中 git pull 远程仓库名 本地分支名
如果不指定远端名称和分支名，则抓取所有并更新当前分支。
4.冲突问题
当2个分支获取了同一远程仓库副本,a分支先push更新了远程仓库,b分支在本地修改了和a分支同一位置代码,然后使用pull命令更新本地代码,会发现有冲突,需要修改文件后重新add commit push, a分支也可以pull获取最新代码.
```

+ push前先pull

## 本地获取公钥

```
ssh-keygen -t rsa -C "2803290705@qq.com"

查看公钥
cat id_rsa.pub
```



