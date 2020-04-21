import Taro, { useDidShow } from "@tarojs/taro"
import { View, Button, Image } from "@tarojs/components"
import './index.scss'

interface Props {
  isHidden: boolean
  AuthorizeType?: "userInfo" | "phone"
  logoUrl?: string
}


export default function AuthorizeModel(props: Props) {

  useDidShow(() => {
    console.log('a')
  })

  const onGetUserInfo = (e) => {
    if (e.detail.errMsg.indexOf('ok') !== -1) { //

    }
  }

  const onGetPhoneNumber = (e) => {
    console.log(e)
  }

  return (
    <View hidden={Boolean(props.isHidden)}>
      <View className='Popup'>
        <Image hidden={!props.logoUrl} src={props.logoUrl || ''}></Image>
        <View className='title'>授权提醒</View>
        <View className='tip'>请授权头像等信息，以便为您提供更好的服务</View>
        <View className='bottom flex'>
          <View className='item'>随便逛逛</View>
          {
            props.AuthorizeType === "phone" ? (
              <Button
                onGetPhoneNumber={onGetPhoneNumber}
                className='item grant'
                type="primary"
                openType="getPhoneNumber"
                lang="zh_CN"
              >去授权</Button>
            ) : (
                <Button
                  onGetUserInfo={onGetUserInfo}
                  className='item grant'
                  type="primary"
                  openType="getUserInfo"
                  lang="zh_CN"
                >去授权</Button>
              )
          }
        </View>
      </View>
      <View className='mask'></View>
    </View>
  )
}
