/*
 * @Date: 2019-11-05 17:19:48
 * @LastEditors: Pluto
 * @LastEditTime: 2019-11-06 11:33:25
 */
import Taro, { Chain } from '@tarojs/taro';

export function timeoutInterceptor(chain : Chain) {
  const { requestParams } = chain;
  return new Promise((resolve, reject) => {
    let timeout : NodeJS.Timeout | null = setTimeout(() => {
      timeout = null;
      Taro.showToast({
        title: '网络链接超时,请稍后再试！',
        icon: 'none',
        mask: true,
      });
      reject(new Error('网络链接超时,请稍后再试！'));
    }, (requestParams && requestParams.timeout) || 10000);

    chain.proceed(requestParams)
      .then(res => {
        if (!timeout) return;
        clearTimeout(timeout);
        resolve(res);
      })
      .catch(err => {
        if (timeout) {
          clearTimeout(timeout);
        }
        reject(err);
      });
  });
}

export function logInterceptor(chain : Chain) {
  const { requestParams } = chain;
  const { method, data, url } = requestParams;
  console.log(`http ${method || 'GET'} --> ${url} data: `, data);
  return chain.proceed(requestParams)
    .then(res => {
      console.log(`http <-- ${url} result:`, res);
      return res;
    });
}
