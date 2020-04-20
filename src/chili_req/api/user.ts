import { transformKey, addKeyFn, transformValueType } from "data-matcher";

const GET: "GET" = "GET";
const POST: "POST" = "POST";

export function bindPhone(data: any) {
  return {
    option: {
      method: GET,
      url: "/app/mobile",
      header: {
        "X-WX-Encrypted-Data": data.encryptedData,
        "X-WX-Code": data.code,
        "X-WX-IV": data.iv,
      },
    },
  };
}

function userInfoMid(res: { data: any }) {
  let { data } = res;
  data = addKeyFn(data, "buyOrdersNum", item => [Number(item.waitPayNum) || 0, Number(item.waitLoadNum) || 0, Number(item.waitComeNum), Number(item.allNumNum)]);
  return {
    data,
  };
}

// 用户信息
export function userInfo() {
  return {
    option: {
      method: GET,
      url: "/user/info",
    },
    middle: userInfoMid,
  };
}

// 地址
function addressListMid(res: { data: [] }) {
  let { data } = res;
  data = transformKey(data, {
    mobile: "phone",
    consignee: "nickname",
    is_default: 'isDefault',
  });
  data = addKeyFn(
    data,
    "address",
    item => item.province + item.city + item.area + item.detail,
  );
  data = addKeyFn(data, "place", item => [item.province, item.city, item.area]);
  return {
    data,
  };
}

export function addressList() {
  return {
    option: {
      method: GET,
      url: "/user/address-list",
    },
    middle: addressListMid,
  };
}

export function addressDetail(data: { id: string }) {
  return {
    option: {
      method: GET,
      url: "/user/address-detail",
      data,
    },
    middle: addressListMid,
  };
}

/**
 * 地址保存
 * @param {*} data
 * @returns
 */
export function addressSave(data: any) {
  return {
    option: {
      method: POST,
      url: "/user/add-address",
      data,
    },
  };
}

/**
 * 地址保存
 * @param {*} data
 * @returns
 */
export function addressDefault(data: any) {
  return {
    option: {
      method: GET,
      url: "/user/set-default-address",
      data,
    },
  };
}

/**
 * 地址保存
 * @param {*} data
 * @returns
 */
export function addressDelete(data: any) {
  return {
    option: {
      method: GET,
      url: "/user/del-address",
      data,
    },
  };
}


function couponListMid(res: {
  data: {
    list: []
  }
}) {
  let { list } = res.data;
  list = transformKey(list, {
    name: "title",
    quota: "price",
    threshold: 'condition',
  });
  list = transformValueType(list, {
    status: 'number',
  });
  return {
    data: {
      list,
    },
  };
}

/**
 * 优惠券列表
 * @export
 * @param {*} data
 * @returns
 */
export function couponList() {
  return {
    option: {
      method: GET,
      url: "/user-coupon/get",
    },
    middle: couponListMid,
  };
}
