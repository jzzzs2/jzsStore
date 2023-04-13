## vant在vue中使用

>  npm i vant@latest-v2  vue2项目

```
1.全局引入
import Vue from 'vue';
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant)
```

```
2.按需引入
引入外部ui插件所需:
babel-plugin-import 编译过程中将 import 的写法自动转换为按需引入的方式
unplugin-vue-components
在babel.config中配置
"plugins": [
    ['import', {
     libraryName: 'vant',
     libraryDirectory: 'es',
     style: true
      }, 'vant']
  ]
```

## vant中的上拉刷新组件配合list使用

```
1.上拉刷新后获取第一页内容，但无法触发list的加载，需要手动调用load方法，获取后一页数据，激活进度条，当进度条下拉，会重新继续加载新内容。
```

## Notify

```
import { Notify } from 'vant';
Notify({ type: 'success', message: '评论成功' });
```

## 表单验证

```
<van-form ref="form">
      <van-cell-group inset>
        <van-field v-for="(item,idx) in inputs" :key="idx"
          v-model="form[item?.query]"
          :name="item.query"
          :label="item.label"
          :placeholder="item.placeholder"
          :rules="rulesValidate[item?.query]"
          :type="item.type"
        />
      </van-cell-group>
</van-form>

inputs:(表单渲染)
[
{"label":"用户名","query":"username","type":"text","placeholder":"用户名: 6-8位 字母数字"},{"label":"密码","query":"password","type":"password","placeholder":"密码: 8-12位 最少包含一位(数字/大小写字母)"}
]
rulesValidate:(表单校验参数)
{"username":[{"required":true,"message":"账号必填","trigger":"onBlur"},{"pattern":"[native RegExp /^(?!\\d+$)(?![a-zA-Z]+$)[a-zA-Z0-9]{6,8}$/]","message":"账号格式 数字+字母 6-8位","trigger":"onBlur"}],"password":[{"required":true,"message":"密码必填","trigger":"onBlur"},{"pattern":"[native RegExp /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d!.#*?&]{8,12}$/]","message":"密码必填|密码格式 至少包含大写字母+小写字母+数字 8-12位","trigger":"onBlur"}]}

验证:
form.validate().then( async ()=>{}).catch(err=>err)
```

## Dialog属性

```
<van-dialog
      v-model="isShow"
      :title="title"
      show-cancel-button
      :beforeClose="beforeClose"
    >
      <MDialogForm :type="type" ref="formWrap" />
      
 </van-dialog>
beforeClose(action,done) {
	action有confirm和cancel两种值.
	//关闭dialog前的执行函数,只有done函数执行才会关闭dialog
	dialog() 关闭
	dialog(false) 不关闭
	如果都不执行,则按钮显示加载状态
}
```

