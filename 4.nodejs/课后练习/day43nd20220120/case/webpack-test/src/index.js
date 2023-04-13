import Util from './app/util'
import './styl/index.styl'
import viewIndex from './views/index.hbs'

const util = new Util()
console.log(util.add(1, 2))
document.body.innerHTML += viewIndex({ name: '海牙123 321' })


