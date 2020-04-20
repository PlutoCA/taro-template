import Taro, { useState, useDidShow } from "@tarojs/taro";
import { View, Button } from "@tarojs/components";
import AddressItem, { address } from "../address_item";

import "./index.scss";

export default function AddressList() {
  const [list, setList] = useState<address[] | any>([
    {
      nickname: 'ddd',
      phone: '1579765525',
      address: '深圳市宝安区'
    }
  ]);

  useDidShow(() => {
    // Taro.showLoading({ title: '加载中~' });
    // setTimeout(() => {
    // }, 100);
  });

  const onSetAction = (addressData: address, type: "default" | "delete" | "edit") => {
    if (type === "default") {

    } else if (type === "edit") {
      Taro.navigateTo({
        url: "/module/address/address_edit/index"
      })
    }
  };

  return (
    <View className='address-list-wrapper'>
      {
        list && list.length ? (
          list.map(item => (
            <AddressItem key={item.id} address={item} onSetAction={onSetAction} />
          ))
        ) : (
          <View className='no-address-wrapper'>
            没有地址
          </View>
          )

      }
      <View className='add-wrapper'>
        <Button
          onClick={() => {
            Taro.navigateTo({
              url: "/module/address/address_edit/index"
            })
          }}
        >
          新增地址
        </Button>
      </View>
    </View>
  );
}

AddressList.config = {
  navigationBarTitleText: "我的地址",
};
