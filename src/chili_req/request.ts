/*
 * @Date: 2019-11-05 16:31:16
 * @LastEditors  : Pluto
 * @LastEditTime : 2019-12-24 14:45:36
 */
import Taro, { uploadFile, request } from '@tarojs/taro';
import { timeoutInterceptor } from './interceptors';
import { ReqConfig, BaseConfig } from './type';

/**
 *  根据参数来校验是否是上传吧
 * @param {(uploadFile.Param | request.Param)} params
 * @returns {params is uploadFile.Param}
 */
function isUpload(params: uploadFile.Option | request.Option): params is uploadFile.Option {
  return (<uploadFile.Option>params).name !== undefined
  && (<uploadFile.Option>params).filePath !== undefined;
}

export default function chiliBase(config: BaseConfig) {
  // 默认加一个超时的拦截器 只对request 有效 上传不支持拦截器
  Taro.addInterceptor(timeoutInterceptor);

  return async <T>(regConfig: ReqConfig): Promise<T> => {
    const { option } = regConfig;

    let params = Object.assign({}, option);

    if (config.interceptorReq) {
      params = await config.interceptorReq(params);
    }

    let response: any = null;

    params.url = config.baseURL + params.url;

    try {
      response = isUpload(params)
      ? await Taro.uploadFile(params)
      : await Taro.request(params);
    } catch (error) {
      // throw error;
      return Promise.reject(error);
    }

    let { data } = response;

    // 请求结束后的拦截器
    if (config.interceptorRes) {
      data = await config.interceptorRes(response);
    }

    if (data.repeat) {
      chiliBase(config);
    }

    // NOTE: middle 转换数据
    if (regConfig.middle) {
      data = regConfig.middle(data);
    }

    return data as T;
  };
}


/**
 *  根据参数来校验是否是请求吧
 * @param {(uploadFile.Param | request.Param)} params
 * @returns {params is uploadFile.Param}
 */
// function isRequest(params: uploadFile.Param | request.Param): params is request.Param {
//   return (<request.Param>params).method !== undefined
// && (<uploadFile.Param>params).filePath === undefined;
//   // return (<uploadFile.Param>params).name !== undefined
// && (<uploadFile.Param>params).filePath !== undefined ;
// }
