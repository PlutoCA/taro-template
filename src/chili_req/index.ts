/*
 * @Date: 2019-11-06 17:56:17
 * @LastEditors: Pluto
 * @LastEditTime: 2020-03-26 10:21:30
 */
import Taro from "@tarojs/taro";
// import { transformEmpty } from "data-matcher/dist";
import { getSkey, clearSkey } from "../utils/login/index";
import config from "../config";
import chiliBase from "./request";
import { ReqConfig } from "./type";


const chiliRequest = chiliBase({
  baseURL: config.apiUrl,
  interceptorReq: async (option: ReqConfig["option"]) => {
    const params = option;
    params.header = {
      ...option.header,
      "X-WX-Skey": await getSkey(),
      version: config.version,
      // @ts-ignore
      'Content-Type': params.method === "GET" ? 'application/json' : 'application/x-www-form-urlencoded',
    };

    return params;
  },
  interceptorRes: async (res: any) => {
    if (res.statusCode === 200) {
      let { data } = res;

      // 判断是否是上传 并且可以转成对象
      if (typeof data === "string" && data !== '' && res.errMsg.indexOf("upload") !== -1) data = JSON.parse(data);

      if (data.code === 0) {
        return data;
      }
      // 登录状态失效判断
      if (data.code === 901) {
        // 判断当前是否在登陆页
        const { route } = Taro.getCurrentPages()[Taro.getCurrentPages().length - 1];
        Taro.showLoading({
          title: "正在重新获取身份信息",
        });
        data.repeat = true;
        // Taro.removeStorageSync("userInfo")
        // Taro.setStorageSync('isLogin', false)
        // 901 处理
        await clearSkey();
        // await getSkey()
        await Taro.hideLoading();
        if (route.indexOf('login') === -1) {
          Taro.navigateTo({
            url: "/pages/login/index",
          });
        } else {
          Taro.showToast({
            title: "登陆异常~ 请重试",
          });
        }

        return Promise.reject(data);
      }
      return Promise.reject(data);
    }
    return Promise.reject(new Error(`网络请求错误 ${res.statusCode}`));
  },
});


export default chiliRequest;
