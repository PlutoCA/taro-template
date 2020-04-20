/*
 * @Date: 2020-02-24 10:36:31
 * @LastEditors: Pluto
 * @LastEditTime: 2020-04-02 11:33:27
 */
import { transformKey, addKeyFn } from "data-matcher";

const GET: "GET" = "GET";
const POST: "POST" = "POST";

function BuyInfoSettingMiddle(res: any) {
  const { data } = res;
  data.CarShipCalculate = transformKey(data.CarShipCalculate, {
    initFee: 'price',
    cartType: 'id',
    maxWeightTxt: 'volume',
  });
  data.CarShipCalculate = addKeyFn(data.CarShipCalculate, "num", () => 0);
  return res;
}

/**
 * TODO:下单配置信息
 */
export function BuyInfoSetting(data: { id: string }) {
  return {
    option: {
      method: POST,
      url: "/buy/single-buy-info",
      data,
    },
    middle: BuyInfoSettingMiddle,
  };
}

/**
 * 下单
 * @export
 * @returns
 */
export function buy(data : {
  goodsAmount: string
  addressId: string
  goodsId: string
  couponId: string
  note: string
  [key: string]: any
}) {
  return {
    option: {
      method: POST,
      url: "/buy/buy",
      data,
    },
  };
}

export function countPrice(data : {
  goodsAmount: string
  addressId: string| number
  goodsId: string| number
  couponId: string | number
  [key: string]: any
}) {
  return {
    option: {
      method: POST,
      url: "/buy/price",
      data,
    },
  };
}

function orderListMiddle(res: any) {
  const { data } = res;
  data.list = transformKey(data.list, {
    goods_name: 'name',
    pay_amount: 'totalMoney',
    buy_num: 'totalWeight',
    // type: 'is_single',
    unit_price: 'price',
  });
  data.list = addKeyFn(data.list, 'is_single', item => {
    if (Number(item.type) === 2) {
      return 0;
    }
    return Number(item.type);
  });
  return res;
}

export function orderList(data: {
  status?: string | number
  limit?: string | number
}) {
  return {
    option: {
      method: GET,
      url: "/buyer-order/list",
      data,
    },
    middle: orderListMiddle,
  };
}

function orderDetailMiddle(res: any) {
  const { data } = res;
  const newData = {
    orderInfo: {
      add_time: data.add_time,
      buy_num: data.buy_num,
      orderId: data.orderId,
      order_no: data.order_no,
      status: Number(data.status),
      statusTxt: data.statusTxt,
      update_time: data.update_time,
      coupon_amount: data.coupon_amount,
      pay_amount: data.pay_amount,
      averagePrice: data.averagePrice,
      price: data.price,
      ship_amount: data.ship_amount,
      goods_amount: data.goods_amount,
    },
    goodsInfo: {
      id: data.goods_id,
      name: data.goods_name,
      is_single: Number(data.type),
      thumb: data.thumb,
      price: data.unit_price,
    },
    addressInfo: {
      address: data.address.replace(/\s*/g, ''),
      phone: data.user_mobile,
      nickname: data.username,
    },
    mapInfo: {
      start: data.start_address + data.start_detail_address,
      end: data.address + data.detail_address,
    },
    cartDetail: data.cartDetail,
    salerUser: {
      ...data.salerUser,
      sid: data.sid,
    },
  };
  return {
    oldData: res.data,
    data: newData,
  };
}

export function orderDetail(data: {
  orderId: string | number
}) {
  return {
    option: {
      method: POST,
      url: "/saler-order/detail",
      data,
    },
    middle: orderDetailMiddle,
  };
}

// 订单评价
export function orderComment(data: {
  orderId: string
  content: string
  images: string
  star: string | number
}) {
  return {
    option: {
      method: POST,
      url: "/buyer-order/add-comment",
      data,
    },
  };
}

// 订单确认
export function orderReceipt(data: {
  orderId: string | number
}) {
  return {
    option: {
      method: POST,
      url: "/buyer-order/confirm-receipt",
      data,
    },
  };
}


// 订单取消
export function orderCancel(data: {
  orderId: number | string
  reason?: string
}) {
  return {
    option: {
      method: POST,
      url: "/buyer-order/cancel-order",
      data,
    },
  };
}
