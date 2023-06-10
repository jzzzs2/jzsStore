/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-05-22 17:05:36
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-05-22 17:06:00
 */
if (!/pnpm/.test(process.env.npm_execpath || '')) {
  console.warn(
    `\u001b[33mThis repository must using pnpm as the package manager ` +
    ` for scripts to work properly.\u001b[39m\n`,
  )
  process.exit(1)
}