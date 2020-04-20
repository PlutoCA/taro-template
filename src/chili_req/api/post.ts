/*
 * @Date: 2020-02-25 10:38:33
 * @LastEditors: Pluto
 * @LastEditTime: 2020-04-08 11:35:26
 */
import { addKeyFn } from "data-matcher";

// 求购

const GET: "GET" = "GET";
const POST: "POST" = "POST";

/**
 * 求购订单
 * @export
 * @param {*} data
 * @returns
 */
export function WantOrder(data: any) {
  return {
    option: {
      method: POST,
      url: "/want-buy/add",
      data,
    },
  };
}

function WantOrderListMiddle(data: any) {
  let { list } = data.data;
  if (list && list.length) {
    const dataList = addKeyFn(list, 'tips', item => item.quality.split(','));
    addKeyFn(list, 'title', item => `${item.number}斤${item.fvName}`);
    addKeyFn(list, 'tagsGroup', item => [
        {
          color: "#7A62F1",
          text: item.ftName,
        },
        // {
        //   color: "#2ED0E5",
        //   text: item.need_time,
        // },
        {
          color: "#6C9FEE",
          text: item.size,
        },
      ]);
    list = dataList;
  } else {
    list = [];
  }
  return data;
}

/**
 * 求购列表
 * @export
 * @returns
 */
export function WantOrderList(data?: any) {
  return {
    option: {
      method: GET,
      url: "/want-buy/list",
      data,
    },
    middle: WantOrderListMiddle,
  };
}

function WantDetailMiddle(res: any) {
  const { data } = res;
  const newData = addKeyFn(data, 'tips', item => item.quality.split(','));
  addKeyFn(data, 'title', item => `${item.number}斤${item.fvName}`);
  addKeyFn(data, 'tagsGroup', item => [
      {
        color: "#7A62F1",
        text: item.ftName,
      },
      {
        color: "#2ED0E5",
        text: item.need_time,
      },
      {
        color: "#6C9FEE",
        text: item.size,
      },
    ]);
  res.data = newData;
  return res;
}

/**
 * 求购详情
 * @export
 * @param {{
 *   id: string
 * }} data
 * @returns
 */
export function WantOrderDetail(data: {
  id: string
}) {
  return {
    option: {
      method: GET,
      url: "/want-buy/detail",
      data,
    },
    middle: WantDetailMiddle,
  };
}


/**
 * 删除
 * @export
 * @param {{
 *   id: string
 * }} data
 * @returns
 */
export function WantOrderDelete(data: {
  id: string
}) {
  return {
    option: {
      method: GET,
      url: "/want-buy/detail",
      data,
    },
  };
}


export function WantMyOrderList() {
  return {
    option: {
      method: GET,
      url: "/want-buy/my-list",
    },
    middle: WantOrderListMiddle,
  };
}


export function WantMyOrderDelete(data: {
  id,
}) {
  return {
    option: {
      method: GET,
      url: "/want-buy/delete",
      data,
    },
    middle: WantOrderListMiddle,
  };
}


export function HaveFish(data: {
  want_id,
}) {
  return {
    option: {
      method: GET,
      url: "/want-buy/have-fish",
      data,
    },
  };
}
