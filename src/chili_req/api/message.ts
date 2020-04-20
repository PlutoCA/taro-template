/*
 * @Date: 2020-03-10 17:23:32
 * @LastEditors: Pluto
 * @LastEditTime: 2020-03-11 17:27:38
 */
const POST: "POST" = "POST";
const GET: "GET" = "GET";

/**
 * TODO: 消息首页
 */
export function getMessageIndex() {
  return {
    option: {
      method: POST,
      url: "/message/index",
    },
  };
}

export function getMessageList(data: {
  type: string
}) {
  return {
    option: {
      method: GET,
      url: "/message/list",
      data,
    },
  };
}
