/*
 * @Date: 2019-11-06 17:11:09
 * @LastEditors: Pluto
 * @LastEditTime: 2019-11-12 17:06:21
 */
import { request, uploadFile } from '@tarojs/taro';

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

type XOR<T, U> = (T | U) extends object
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U;

export interface BaseConfig {
  baseURL: string;
  interceptorReq?: (config : any) => any;
  interceptorRes?: (res : any) => any;
}

export type RequestType = {
  option: request.Option
  middle?: Function;
};

export type uploadType = {
  option: uploadFile.Option
  middle?: Function;
};

export type ReqConfig = XOR<RequestType, uploadType>;
