/*
 * @Date: 2020-04-20 17:50:18
 * @LastEditors: Pluto
 * @LastEditTime: 2020-04-20 17:50:19
 */
const globalData = {}

export function set (key, val) {
  globalData[key] = val
}

export function get (key) {
  return globalData[key]
}
