/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-03-30 21:16:59
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-04-10 14:18:00
 */
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ],
    [
      "lodash"
    ]
    // ['import', {
    //   libraryName: 'vant',
    //   libraryDirectory: 'es',
    //   style: true
    // }, 'vant']
  ]
}
