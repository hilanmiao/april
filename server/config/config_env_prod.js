'use strict'

// 账号密码等敏感信息不要提交到仓库中，gitignore已经忽略此文件
const config = {
  name: 'april',
  host: '127.0.0.1',
  port: '7001',
  domain: 'http://127.0.0.1:7001',
  jwtSecret: 'april',
  mysql: {
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'Sa123456!',
    database: 'april',
  },
  redis: {
    port: '6379',
    host: '127.0.0.1',
    password: '',
    db: 1,
  }
}

module.exports = config
