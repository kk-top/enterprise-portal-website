# 企业全栈系统

## 项目简介

使用了node全栈技术，前端 vue3 + vite，后端，后端使用 Express + MongoDB + JWT

后台管理功能：

- 登录
- 用户管理
- 新闻管理
- 产品管理

官网：实时更新，实时推送新闻产品信息

## 目录

| 目录 | 说明 | 运行 |
| --- | --- | --- |
| server | 后端 | `npm install && npm start` |
| company-system | 数据库数据 | --- |
| web-admin | 前端管理系统 | `npm install && npm run dev` |
| web-company | 前端官网 | `npm install && npm run dev` |


## 数据库导入

没有命令工具的可以前往 mongodb 官网下载安装，然后导入数据

```bash
mongorestore -h 127.0.0.1 -d web-company --dir D:\..\company-system
```
参数说明
- -h : 数据库主机地址
- -d ：数据库名称
- --dir ：导入的提供的数据库数据目录路径