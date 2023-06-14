/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-06-13 12:34:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-06-14 11:53:34
 */
import { createApp } from 'vue'
import { Col, Row,Button,Cell,CellGroup,Icon,Image as VanImage, Lazyload,Popup,Space,Toast,Calendar,Swipe, SwipeItem ,NavBar} from 'vant';
import 'vant/lib/index.css'
import './style.css'
import App from './App.vue'
import routes from "./router/router.ts"
let app = createApp(App)
//
app.use(Swipe)
app.use(NavBar)
app.use(SwipeItem)
app.use(Lazyload);
app.use(Toast);
app.use(VanImage)
app.use(Icon)
app.use(Col);
app.use(Row);
app.use(Button);
app.use(Cell);
app.use(CellGroup);
app.use(Popup);
app.use(Space)
app.use(Calendar)
// @ts-ignore
// 
app.use(routes as any)
app.mount('#app')
