/*
 * @Date: 2020-02-24 10:36:31
 * @LastEditors: Pluto
 * @LastEditTime: 2020-03-31 16:05:41
 */

// const POST: "POST" = "POST";
const GET: "GET" = "GET";

/**
 * TODO: 商品列表
 */
export function getGoodList(data?: {
  name?: string
  province?: string
  city?: string
  area?: string
  start_size?: string
  end_size?: string
  category?: string
  limit?: number
  page?: number
}) {
  return {
    option: {
      method: GET,
      url: "/goods/list",
      data,
    },
  };
}

/**
 * TODO: 商品详情
 */
export function getGoodDetail(data: {id: string | number}) {
  return {
    option: {
      method: GET,
      url: "/goods/detail",
      data,
    },
  };
}


export function getBanner() {
  return {
    option: {
      method: GET,
      url: "/app/banner",
    },
  };
}
