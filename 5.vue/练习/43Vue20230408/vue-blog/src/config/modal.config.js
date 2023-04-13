export default {
  "login": {
    title: '登录',
    width: "40%",
    formType: 'login',
    btns: [
      {
        targetName: 'close',
        name: '取消'
      },
      {
        targetName: 'confirm',
        name: '登录',
        isSubmit: true
      }
    ]
  },
  "classifyAdd": {
    title: '添加分类',
    formType: 'postColumn',
    width: "40%",
    btns: [
      {
        targetName: 'close',
        name: '取消'
      },
      {
        targetName: 'confirm',
        name: '添加',
        isSubmit: true
      }
    ]
  },
  "register": {
    title: '注册',
    width: "40%",
    formType: 'register',
    btns: [
      {
        targetName: 'close',
        name: '取消'
      },
      {
        targetName: 'confirm',
        name: '注册',
        isSubmit: true
      }
    ]
  },
  "info": {
    title: '个人信息',
    width: "40%",
    formType: 'putUserInfo',
    btns: [
      {
        targetName: 'close',
        name: '取消'
      },
      {
        targetName: 'confirm',
        name: '提交',
        isSubmit: true
      }
    ]
  }
}