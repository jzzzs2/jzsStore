/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-04-03 15:13:31
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-04-04 18:20:59
 */
module.exports = {
	plugins: {
    	'autoprefixer': {
      		browsers: ['Android >= 4.0', 'iOS >= 7']
    	},
    	'postcss-pxtorem': {
      		rootValue: 75,
      		propList: ['*'], //属性的选择器，*表示通用
      		selectorBlackList:[".el",".blog",".van","span",".mblog"]    //忽略的选择器   .ig-  表示 .ig- 开头的都不会转换
    	}
  }
}