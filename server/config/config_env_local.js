'use strict'

// 账号密码等敏感信息不要提交到仓库中，gitignore已经忽略此文件
module.exports = {
  name: 'april',
  host: '127.0.0.1',
  port: '7001',
  domain: 'http://127.0.0.1:7001',
  jwtSecret: 'april',
  mysql: {
    host: '81.70.194.45',
    port: '3306',
    user: 'root',
    password: 'Lanmiaobirthyear1992!',
    database: 'april',
  },
  redis: {
    host: '127.0.0.1',
    port: '6379',
    password: '',
    db: '1',
  }
}
