/*
 * @Date: 2020-04-20 17:42:13
 * @LastEditors: Pluto
 * @LastEditTime: 2020-04-20 17:45:43
 */
import qs from "qs"
import routers from "./router"

const router = {
  ...routers
}

export type Router = keyof typeof router;

export function qsStringify(
  type: Router,
  params: Record<string, string | number>,
) {
  return `${router[type]}?${qs.stringify(params)}`;
}

export default router;
