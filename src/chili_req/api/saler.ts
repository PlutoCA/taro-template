import Matcher from "data-matcher/dist";

/*
 * @Date: 2020-02-24 14:54:22
 * @LastEditors: Pluto
 * @LastEditTime: 2020-03-05 16:12:21
 */
const POST: "POST" = "POST";
const GET: "GET" = "GET";

// 店铺首页
export function salerIndex(data: {
  sid: string
}) {
  return {
    option: {
      method: GET,
      url: "/saler/index",
      data,
    },
  };
}

// 商家审核
export function salerApply(data: any) {
  return {
    option: {
      method: POST,
      url: "/saler/apply",
      data,
    },
  };
}

function ApplyInfoMiddle(res : any) {
  const { data } = res;
  const matcher = new Matcher(data);
  matcher.transformKey({
    card_no: 'cardNo',
    company_license: 'companyLicense',
    hands_back_image: 'handsBackImage',
    hands_face_image: 'handsFaceImage',
    open_card_bank: 'openCardBank',
  }).transformValueType({
    status: 'number',
    type: 'number',
  });
  return matcher.data;
}

export function salerApplyInfo() {
  return {
    option: {
      method: GET,
      url: "/saler/apply-info",
    },
    middle: ApplyInfoMiddle,
  };
}


// 我要卖配置信息
export function PostSaleData(data: any) {
  return {
    option: {
      method: POST,
      url: "/want-sale/save-want-sale",
      data,
    },
  };
}

export function SaleProductList(data: any) {
  return {
    option: {
      method: GET,
      url: "/saler/goods-list",
      data,
    },
  };
}

export function SaleProductStatusChange(data: {
  id: number
  status: number
}) {
  return {
    option: {
      method: POST,
      url: "/want-sale/change-status",
      data,
    },
  };
}

export function SaleProductMoneyChange(data: {
  id: number
  price: number
}) {
  return {
    option: {
      method: POST,
      url: "/want-sale/modify",
      data,
    },
  };
}

export function SaleOrderList(data?: {}) {
  return {
    option: {
      method: GET,
      url: "/saler-order/list",
      data,
    },
  };
}
