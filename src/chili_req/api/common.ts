/*
 * @Date: 2020-02-24 10:36:31
 * @LastEditors: Pluto
 * @LastEditTime: 2020-03-31 18:13:37
 */
/**
 * 公共api文件
 */

const POST: "POST" = "POST";
const GET: "GET" = "GET";


/**
 *
 * TODO:上传文件
 * @param {{
 *   filePath: string
 *   name: string
 * }} data
 */
export function uploadFile(formData : {
  type: string,
}, data: {
  filePath: string
  name: string
}) {
  return {
    option: {
      method: POST,
      url: "/app/upload",
      filePath: data.filePath,
      name: data.name,
      formData,
    },
  };
}

export function saleConfig() {
  return {
    option: {
      method: GET,
      url: "/want-sale/show-configure",
    },
  };
}


export function recommendList(data: {
  limit: number
}) {
  return {
    option: {
      method: GET,
      url: "/goods/recommend-list",
      data,
    },
  };
}
