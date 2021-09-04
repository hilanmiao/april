'use strict';

module.exports = {
  baseData: { // 不可删除的基础数据
    userIds: ['1'],
    roleIds: ['1'],
    userRoles: ['1'],
    rolePowers: ['1'],
    powers: ['1'],
    menuIds: ['1'],
  },
  expirationPeriod: { // 到期期限
    short: '10m',
    medium: '4h',
    long: '730h',
  },
  authAttempts: { // 认证尝试次数
    forIP: 50,
    forIpAndUser: 5,
  },
  lockoutPeriod: 30, // 锁定期限 in units of minutes
  apiTitle: 'API',
  webTitle: 'Admin',
  sms: { //  短信限制
    sendInterval: 60, // 发送时间间隔 秒
    countLimit: 5, // 每天上限 条数
    effectiveTime: 60 * 5 // 有效时间 5分钟
  }
}
