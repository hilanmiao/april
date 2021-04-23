<template>
  <div class="wrapper">
    <span />
    <span />
    <span />
    <span />
    <div class="m-title">
      <h1>Web & Mobile Developer</h1>
      <div class="link">
        <svg-icon icon-class="github-1" />&nbsp;Github主页<svg-icon icon-class="arrow-1" />
        <a href="https://github.com/hilanmiao" target="_blank">https://github.com/hilanmiao</a>
      </div>
    </div>
    <div class="m-head">
      <img src="@/assets/images/about/head.png" alt="">
      <div class="m-info">
        <div class="info">
          <div class="left">Full Name</div>
          <div class="right">张国栋</div>
        </div>
        <div class="info">
          <div class="left">D.O.B.</div>
          <div class="right">22 June 1992</div>
        </div>
        <div class="info">
          <div class="left">Address</div>
          <div class="right">潍坊市高新区</div>
        </div>
        <div class="info">
          <div class="left">E-mail</div>
          <div class="right">hilanmiao@126.com</div>
        </div>
        <div class="info">
          <div class="left">Phone</div>
          <div class="right">18353674768</div>
        </div>
        <div class="info">
          <div class="left">School</div>
          <div class="right">山东商业职业技术学院（大专）</div>
        </div>
      </div>
      <div class="m-intro">
        <div class="has-light-line"><svg-icon icon-class="arrow-1" class-name="arrow-1-icon" />主要技术栈：</div>
        <div class="m-tag">
          <div class="tag">NodeJs</div>
          <div class="tag">Vue</div>
          <div class="tag">Electron</div>
          <div class="tag">Uni-app</div>
          <div class="tag">.Net</div>
        </div>
        <div class="intro">
          <svg-icon icon-class="arrow-1" />介绍：<br>
          NodeJS全栈开发工程师、.Net开发工程师。担任过创业公司技术总监，组建团队并带领团队利用最新技术解决业务快速发展过程中的各种业务场景问题。熟悉PC端开发，有多个大型项目开发经验，有跨平台桌面端electron开发经验，可使用uniapp开发移动端项目。
        </div>
      </div>
    </div>
    <div class="m-works">
      <div class="m-title">
        <div class="inner-title">
          <h2>My Works</h2>
        </div>
        <div class="link-title">
          <div class="link">
            <a href="">View More</a>
          </div>
        </div>
      </div>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="card">
            <img src="https://raw.githubusercontent.com/hilanmiao/LanMiaoDesktop/master/assets/home.jpg" alt="" height="200" width="100%">
            <div class="card-body">
              <h3 class="title">趣深会务平台</h3>
              <p>专业会务管理平台，为您提供综合会务解决方案，
                让您的会议活动更加智能、快捷和高效。</p>
              <div class="link">
                <a href="">View Details</a>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="card">
            <img src="https://raw.githubusercontent.com/hilanmiao/LanMiaoDesktop/master/assets/home.jpg" alt="" height="200" width="100%">
            <div class="card-body">
              <h3 class="title">趣深会务平台</h3>
              <p>专业会务管理平台，为您提供综合会务解决方案，
                让您的会议活动更加智能、快捷和高效。</p>
              <div class="link">
                <a href="">View Details</a>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="card">
            <img src="https://raw.githubusercontent.com/hilanmiao/LanMiaoDesktop/master/assets/home.jpg" alt="" height="200" width="100%">
            <div class="card-body">
              <h3 class="title">趣深会务平台</h3>
              <p>专业会务管理平台，为您提供综合会务解决方案，
                让您的会议活动更加智能、快捷和高效。</p>
              <div class="link">
                <a href="">View Details</a>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="card">
            <img src="https://raw.githubusercontent.com/hilanmiao/LanMiaoDesktop/master/assets/home.jpg" alt="" height="200" width="100%">
            <div class="card-body">
              <h3 class="title">趣深会务平台</h3>
              <p>专业会务管理平台，为您提供综合会务解决方案，
                让您的会议活动更加智能、快捷和高效。</p>
              <div class="link">
                <a href="">View Details</a>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="m-company">
      <div class="m-title">
        <div class="inner-title">
          <h2>Company</h2>
        </div>
        <!--        <div class="link-title">-->
        <!--          <div class="link">-->
        <!--            <a href="">View More</a>-->
        <!--          </div>-->
        <!--        </div>-->
      </div>
      <ul>
        <li>
          <div class="box">
            <h3>山东趣深网络科技有限公司</h3>
            <div class="content">
              <div class="left">
                <img src="@/assets/images/about/qs_logo.svg" alt="">
                <p>2020-2021</p>
              </div>
              <div class="right">
                <svg-icon icon-class="arrow-1" class-name="arrow-1-icon" />工作内容：<br>
                1.负责公司Nodejs全栈技术团队的搭建，培训、管理和项目实施过程中的流程优化；<br>
                2.参与公司重要项目的产品前期规划、原型制作、核心代码开发等；<br>
                3.负责所有项目的计划制定、进度控制、项目总结与汇报等相关工作；<br>
                4.及时发现并跟踪解决项目实施中的技术难点并进行评估，提升项目进度；<br>
                5.技术栈：Egg.js、Electron、Uni-app、Flutter等；<br>
                <svg-icon icon-class="arrow-1" class-name="arrow-1-icon" />工作业绩：<br>
                1.统筹管理技术部工作，制定部门发展计划，完善部门项目管理规范，改进项目工作流程，对部门项目整体把控，注重技术积累、部门团队建设以及人员培训，在部门人员扩充同时，完成公司开发任务；<br>
                2.设计实现了包含pc、移动端、桌面端的全栈研发平台，制定了标准代码和业务逻辑，大大减少了员工的工作量和重复性劳动，同时使新人能快速掌握编码技能；<br>
                3.搭建了私有云平台、devops自动构建自动部署、api接口平台等；<br>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div class="box">
            <h3>山东京帝软件有限公司</h3>
            <div class="content">
              <div class="left">
                <img src="@/assets/images/about/company-jd.png" alt="">
                <p>2017-2019</p>
              </div>
              <div class="right">
                <svg-icon icon-class="arrow-1" class-name="arrow-1-icon" />工作内容：<br>
                1.统筹公司软件研发四部（.net）和前端开发工作。先行技术部成员，负责提供前沿技术解决方案；<br>
                2.针对开发的项目及问题编写相应技术文档，需求分析，软件设计以及代码编程工作；<br>
                3. 负责前端团队技术建设；<br>
                4. 前端技术栈：vue、vuex、vue-router、axios、webpack、eslint、element-ui、es6、svg、canvas、h5&css3、git等；<br>
                5. 后端技术栈：.net mvc5、webapi、redis、nlog等；<br>
                6. 桌面技术栈：electron、electron-vue、vuetify、nodejs、nsis等；<br>
                <svg-icon icon-class="arrow-1" class-name="arrow-1-icon" />工作业绩：<br>
                1.期间定制开发了内部开发框架；<br>
                2.推出低成本高性能的响应式产品方案，成为公司网站类产品的标配；<br>
                3.推出混合应用产品，极大缩短了APP类项目的开发周期；<br>
                4.在职期间推进设计、前端、后端之间达成一致的交接规范，提高整个团队的交接效率和质量;<br>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
  width: 100%;
  background-color: rgba(0,0,0,.8);
  padding: 20px;
  border: 1px solid #575757;
  overflow: auto;
  span:nth-child(1) {
    position: absolute;
    left: -2px;
    top: -2px;
    padding: 15px;
    border-style: solid;
    border-color: #ffffff;
    border-width: 2px 0 0 2px;
  }

  span:nth-child(2) {
    position: absolute;
    right: -2px;
    top: -2px;
    padding: 15px;
    border-style: solid;
    border-color: #ffffff;
    border-width: 2px 2px 0 0;
  }

  span:nth-child(3) {
    position: absolute;
    right: -2px;
    bottom: -2px;
    padding: 15px;
    border-style: solid;
    border-color: #ffffff;
    border-width: 0 2px 2px 0;
  }

  span:nth-child(4) {
    position: absolute;
    left: -2px;
    bottom: -2px;
    padding: 15px;
    border-style: solid;
    border-color: #ffffff;
    border-width: 0 0 2px 2px;
  }
  > .m-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #878787;
    .link {
      font-size: 18px;
    }
  }

  .m-head {
    margin-top: 20px;
    display: flex;
    img {
      height: 200px;
      border: 1px solid #878787;
      padding: 2px;
    }
    .m-info {
      padding-left: 20px;
      .info {
        display: flex;
        margin-bottom: 10px;
        .left {
          font-size: .9em;
          width: 100px;
        }
      }
    }
    .m-intro {
      flex: 1;
      padding-left: 30px;
      .m-tag {
        .tag {
          margin: 10px 20px 20px 0;
          padding: 4px;
          display: inline-block;
          text-align: center;
          position: relative;
          &:after,
          &:before {
            content:'';
            display: block;
            width: 20px;
            border: 1px solid #ffffff;
            position:absolute;
            bottom: -2px;
            top:-2px;
            transition: width 0.15s ease-in-out;
          }
          &:before {
            border-right: none;
            left: -2px;
          }
          &:after{
            border-left: none;
            right:-2px;
          }
        }
      }
    }
  }

  .m-works {
    margin-top: 30px;
    position: relative;
    > .m-title {
      display: flex;
      .inner-title {
        position: relative;
        flex: 1;
        &:after {
          content: '';
          width: 100%;
          height: 1px;
          background: #878787;
          display: block;
          position: absolute;
          margin-top: -1px;
        }
      }
      .link-title {
        padding-left: 22px;
        position: relative;
        margin-top: 55px;
        &:before {
          width: 6px;
          height: 16px;
          content: '';
          background: #ffffff;
          box-shadow: 14px 2px 50px 4px rgb(0 112 202 / 79%), 2px 2px 12px 1px rgb(0 112 202 / 50%);
          top: -4px;
          left: 7px;
          position: absolute;
          transform: skew(-45deg);
        }
        .link {
          top: -4px;
          text-transform: uppercase;
          font-size: 12px;
          color: #cfcfcf;
          padding: 10px 16px 0 14px;
          position: relative;
          transition-duration: 0.3s;
          z-index: 1;
          &:before {
            content: '';
            position: absolute;
            width: 100%;
            height: 1px;
            background: #878787;
            display: block;
            top: 0;
            left: -3px;
          }
          &:after {
            content: '';
            position: absolute;
            background: #ffffff;
            transform: skew(-45deg);
            height: 4px;
            width: 0;
            top: -3px;
            left: -6px;
            transition-duration: 0.2s;
          }
          &:hover {
            color: #ffffff;
            &:after {
              width: calc(100% + 6px);
              box-shadow: 14px 12px 50px 7px rgb(255 255 255 / 79%), 0 0 12px 1px rgb(255 255 255);
            }
          }
        }
      }
    }

    .card {
      margin-top: 20px;
      background-color: rgba(black, .8);
      border: 1px solid #ffffff;
      transition: 0.4s ease-out;
      &:hover {
        transform: translateY(-8px);
        transition: 0.4s ease-out;
        box-shadow: 0 4px 25px 0 rgba(white,.3), 0 0 1px 0 rgba(white,.25);
      }
      .card-body {
        padding: 1.25rem;
        h3 {
          margin-top: 0;
        }
        .link {
          text-align: center;
          padding: 20px 0;
          a {
            background-color: rgba(0,0,0,.8);
            border: white;
            position:relative;
            padding: 0.5em 0.75em;
            cursor: pointer;
            transition: background-color 0.15s ease-in;
            will-change: transform;
            &:after,
            &:before {
              content:'';
              display: block;
              width: 40px;
              border: 1px solid #ffffff;
              position:absolute;
              bottom: -2px;
              top:-2px;
              transition: width 0.15s ease-in-out;
            }
            &:before {
              border-right: none;
              left: -2px;
            }
            &:after{
              border-left: none;
              right:-2px;
            }
            &:hover {
              background: rgba(255,255,255, 0.8);
              color: black;
              &:before,
              &:after{
                width: calc(50% + 2px);
              }
            }
            &:focus {
              outline:none;
            }
            &:active {
              transform: scale(0.95);
              transition: transform 0.1s ease-out;
            }
          }
        }
      }
    }
  }

  .m-company {
    margin-top: 30px;
    position: relative;
    > .m-title {
      display: flex;
      .inner-title {
        position: relative;
        flex: 1;
        &:after {
          content: '';
          width: 100%;
          height: 1px;
          background: #878787;
          display: block;
          position: absolute;
          margin-top: -1px;
        }
      }
      .link-title {
        padding-left: 22px;
        position: relative;
        margin-top: 55px;
        &:before {
          width: 6px;
          height: 16px;
          content: '';
          background: #ffffff;
          box-shadow: 14px 2px 50px 4px rgb(0 112 202 / 79%), 2px 2px 12px 1px rgb(0 112 202 / 50%);
          top: -4px;
          left: 7px;
          position: absolute;
          transform: skew(-45deg);
        }
        .link {
          top: -4px;
          text-transform: uppercase;
          font-size: 12px;
          color: #cfcfcf;
          padding: 10px 16px 0 14px;
          position: relative;
          transition-duration: 0.3s;
          z-index: 1;
          &:before {
            content: '';
            position: absolute;
            width: 100%;
            height: 1px;
            background: #878787;
            display: block;
            top: 0;
            left: -3px;
          }
          &:after {
            content: '';
            position: absolute;
            background: #ffffff;
            transform: skew(-45deg);
            height: 4px;
            width: 0;
            top: -3px;
            left: -6px;
            transition-duration: 0.2s;
          }
          &:hover {
            color: #ffffff;
            &:after {
              width: calc(100% + 6px);
              box-shadow: 14px 12px 50px 7px rgb(255 255 255 / 79%), 0 0 12px 1px rgb(255 255 255);
            }
          }
        }
      }
    }

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      //margin-top: 10px;
      li {
        margin-top: 30px;
        .box {
          background-image: url(../../assets/images/about/company-bg.svg);
          background-repeat: no-repeat;
          padding: 8px 16px;
          h3 {
            margin: 0;
          }
          .content {
            display: flex;
            padding: 10px 0;
            .left {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: space-around;
              padding-right: 20px;
              min-width: 300px;
              img {
                width: 200px;
              }
              p {
                font-size: 30px;
                margin: 0;
                letter-spacing: 0.1em;
              }
            }
            .right {
              line-height: 1.5em;
            }
          }
        }
      }
    }
  }
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background-color: rgba(0,0,0,.8);
}

::-webkit-scrollbar-thumb {
  background: #878787;
}
</style>
