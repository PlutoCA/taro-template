/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 18:06:41
 * @LastEditTime: 2020-04-16 10:36:55
 * @LastEditors: Pluto
 */
import qs from "qs";

const router = {};

export type Router = keyof typeof router;

export function qsStringify(
  type: Router,
  params: Record<string, string | number>,
) {
  return `${router[type]}?${qs.stringify(params)}`;
}

export default router;
