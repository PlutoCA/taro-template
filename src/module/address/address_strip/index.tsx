import Taro, { useState, useEffect } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './index.scss';

// interface State { }

interface Props {
  address?: {
    nickname: string
    phone: string
    address: string
    [key: string]: string
  }
  style?: Object | string
  canJump?: boolean
}

export default function AddressStrip(props : Props) {
  // componentDidMount = () => { };

  // render() {
    const { address } = props;
    const [addressData, setAddressData] = useState(props.address);

    useEffect(() => {
      if (address) {
        setAddressData({ ...address });
      }
    }, [address]);

    return (
      <View className='addr_strip_wrap' style={props.style}>
        <View className='addr_strip'>
          <View className='icon addr_icon' />
          <View
            className='content'
            onClick={() => {}}
          >
            {
              addressData && Object.keys(addressData).length ? (
                <View className='address_info'>
                  <View className='address_user'>
                    <Text className='nickname'>{addressData.nickname}</Text>
                    <Text>{addressData.phone}</Text>
                  </View>
                  <View className='address_detail'>{addressData.address}</View>
                </View>
              ) : (
                <View className='address_info'>添加收货地址</View>
                )
            }
          </View>
          <View
            onClick={() => {}}
            className='icon addr_more'
          />
        </View>
      </View>
    );
  // }
}
