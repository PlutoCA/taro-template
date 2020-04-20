import Taro, { useState, useEffect, getCurrentPages } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtDivider } from 'taro-ui';

import './index.scss';

export type address = {
  id: number | string
  nickname: string
  phone: string
  address: string
  isDefault?: number | boolean
};

interface Props {
  address: address
  onSetAction?: Function
}

export default function AddressItem(props: Props) {
  // const [isDefault, setDefault] = useState<number | boolean>(Boolean(Number(props.address && props.address.isDefault)));

  const [address, setAddress] : any = useState(props.address);

  useEffect(() => {
    setAddress(props.address);
  }, [props.address]);

  const chooseAction = (type: "default" | "delete" | "edit") => {
    if (props.onSetAction) {
      props.onSetAction(address, type);
    }
  };

  const chooseAddress = () => {
    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 2];
    // 判断是否特定页面来的 返回上一页
    if (prevPage.route.indexOf('confirm_order') !== -1 || prevPage.route.indexOf('sale') !== -1) {
      Taro.setStorage({
        key: "ChooseAddress",
        data: address,
      });
      prevPage.$component.setState({
        address: {
          ...address,
          address: address.place.join('') + address.detail,
        },
      }, () => {
        Taro.navigateBack({
          delta: 1,
        });
      });
    }
  };


  return (
    <View className='address_item'>
      <View className='address_content'>
        <View className='address_user_info' onClick={chooseAddress}>
          <View className='user_info'>
            <Text className='nickname'>{address.nickname}</Text>
            <Text className='phone'>{address.phone}</Text>
          </View>
          <View className='address_detail'>{address.address}</View>
        </View>
        <AtDivider lineColor='#F3F4F6' height={52} />
        <View className='address_action'>
          <View onClick={() => chooseAction("default")} className={`default ${Number(props.address && props.address.isDefault) ? 'choose' : 'no_choose'}`}>设为默认地址</View>
          <View className='action'>
            <View
              className='edit icon'
              onClick={() => chooseAction("edit")}
            >
              编辑
            </View>
            <View
              onClick={() => chooseAction("delete")}
              className='delete icon'
            >
              删除
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
