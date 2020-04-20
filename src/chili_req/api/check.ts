/*
 * @Date: 2020-03-12 11:52:42
 * @LastEditors: Pluto
 * @LastEditTime: 2020-03-12 18:00:24
 */
// 帮看
import { transformKey } from "data-matcher";

const POST: "POST" = "POST";
const GET: "GET" = "GET";

function ListMiddle(res: any) {
  res.data = transformKey(res.data, {
    goods_thumb: 'thumb',
    goods_name: 'name',
    goods_price: 'price',
  });
  return res;
}

export function checkList() {
  return {
    option: {
      method: POST,
      url: "/help-see/list",
    },
    middle: ListMiddle,
  };
}

export function checkDetail(data: {
  id: string
}) {
  return {
    option: {
      method: GET,
      url: "/help-see/detail",
      data,
    },
  };
}


export function checkPay(data: {
  goodsId: string
}) {
  return {
    option: {
      method: GET,
      url: "/help-see/pay",
      data,
    },
  };
}

export function checkCancel(data: {
  id: string | number
}) {
  return {
    option: {
      method: GET,
      url: "/help-see/cancel",
      data,
    },
  };
}
