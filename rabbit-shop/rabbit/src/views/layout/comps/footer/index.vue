<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-07-28 15:14:42
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-07-28 17:47:04
-->
<template>
  <div class="footer">
    <div class="foot-top">
      <div class="service">
        <p>客户服务</p>
        <div class="wrap">
          <div class="contact">
            <i class="iconfont icon-kefu"></i>
            <span>在线客服</span>
          </div>
          <div class="back">
            <i class="iconfont icon-question"></i>
            <span>问题反馈</span>
          </div>
        </div>
      </div>
      <!--  -->
      <div class="attention">
        <p>关注我们</p>
        <div class="wrap">
          <div class="wechat">
            <i class="iconfont icon-weixin"></i>
            <span>公众号</span>
          </div>
          <div class="wb">
            <i class="iconfont icon-weibo"></i>
            <span>微博</span>
          </div>
        </div>
      </div>
      <!--  -->
      <div class="app">
        <p>下载APP</p>
        <div class="wrap">
          <div class="qrcode">
            <img src="@/assets/images/qrcode.jpg" alt="" srcset="">
          </div>
          <div class="download">
            <p>扫描二维码</p>
            <p>立马下载APP</p>
            <el-button type="primary">下载页面</el-button>
          </div>
        </div>
      </div>
      <!--  -->
      <div class="phone">
        <p>服务热线</p>
        <div class="wrap">
          <p class="title">400-0000-000</p>
          <p>周一至周日 8:00-18:00</p>
        </div>
      </div>
    </div>
    <div class="foot-bottom">
      <div class="brand">
        <a class="wrap">
          <i class="iconfont icon-footer01"></i>
            <span>价格亲民</span>
        </a>
        <a class="wrap">
          <i class="iconfont icon-footer02"></i>
            <span>物流快捷</span>
        </a>
        <a class="wrap">
          <i class="iconfont icon-footer03"></i>
            <span>品质新鲜</span>
        </a>
      </div>
      <div class="version">
        <p class="list">
            <a href="javascript:;">关于我们</a>
            <a href="javascript:;">帮助中心</a>
            <a href="javascript:;">售后服务</a>
            <a href="javascript:;">配送与验收</a>
            <a href="javascript:;">商务合作</a>
            <a href="javascript:;">搜索推荐</a>
            <a href="javascript:;">友情链接</a>
          </p>
          <p>CopyRight © 小兔鲜儿</p>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
<style scoped lang='scss'>
  .footer {
    .foot-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 300px;
      background-color: white;
      i {
        font-size: 30px;
      }
      &>div {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 300px;
        height: 200px;
        padding: 30px;
      }
      .service .wrap {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 200px;
        font-size: 12px;
        &>div {
          width: 80px;
          border: 1px solid #ccc;
          padding: 10px;
          margin: 10px;
        }
        .contact {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .back {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      }
      .attention .wrap{
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 200px;
        font-size: 12px;
        &>div {
          width: 80px;
          border: 1px solid #ccc;
          padding: 10px;
          margin: 10px;
        }
        .wechat {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .wb {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      }
      .app .wrap {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        width: 180px;
        height: 200px;
        .qrcode {
          img {
            width: 70px;
            height: 70px;
          }
        }
        .download {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      }
      .phone {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        height: 200px;
        text-align: center;
        .title {
          padding-top: 20px;
          font-size: 16px;
          font-weight: 900;
        }
      }
    }
    .foot-bottom {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      height: 300px;
      background-color: rgb(45,44,45);
      color: white;
      .brand {
        display: flex;
        justify-content: space-around;
        align-items: center;

        & i {
          font-size: 30px;
          color: white;
        }
        & span {
          font-size: 20px;
          color: white;
        }
        & .wrap {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 100px;
          line-height: 100px;
        }
      }
      .version {
        display: flex;
        flex-direction: column;
        align-items: center;
        .list {
          display: flex;
          justify-content: space-around;
          align-items: center;
          a {
          color: rgb(143,142,143);
          padding: 10px;
          }
        }
        color: rgb(143,142,143)
        
      }
    }
  }
</style>