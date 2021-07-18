'use strict';

const svgCaptcha = require('svg-captcha');
const _ = require('lodash')

const Service = require('egg/index').Service;

class CommonService extends Service {

  /**
   * 获取图片验证码
   * @param width
   * @param height
   * @return {Promise<{img: string, id: *}>}
   */
  async getImgCaptcha({ width = 100, height = 50 } = {}) {
    const { ctx } = this;
    const svg = svgCaptcha.create({
      size: 4,
      color: true,
      noise: 4,
      width,
      height,
      ignoreChar: '0o1i', // 过滤掉一些字符，例如0o1i
    });
    const result = {
      img: `data:image/svg+xml;base64,${new Buffer(svg.data).toString('base64')}`,
      id: ctx.helper.generateUUID()
    };

    // 放入缓存中，并设置过期时间
    await this.app.redis.setex(`admin:captcha:img:${result.id}`, 60 * 10, svg.text)

    return result
  }

  /**
   * 校验图片验证码
   * @param id
   * @param code
   * @return {Promise<boolean>}
   */
  async verifyImgCaptcha({ id, code }) {
    const { ctx } = this;
    const key = `admin:captcha:img:${id}`
    // 从缓存中取出
    const result = await this.app.redis.get(key)

    if (_.isEmpty(result)) {
      return false;
    }
    if (code.toLowerCase() !== result.toLowerCase()) {
      return false;
    }

    // 检验成功移除验证码
    await this.app.redis.del(key)

    return true
  }
}

module.exports = CommonService;
