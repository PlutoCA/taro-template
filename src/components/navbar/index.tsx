import Taro, { useEffect, useState, pxTransform } from '@tarojs/taro';
// eslint-disable-next-line import/no-unresolved
// import { CSSProperties } from 'react';
import { View } from '@tarojs/components';
import ProIcon from '../icons';
import Icons from '../icons/types';
import './index.scss';

interface Props {
  title: string
  navigationBarStyle?: Object
}

export default function NavBar(props: Props) {
  const [navBarHeight, setNavBarHeight] = useState(0);
  const [showIcon, setShowIcon] = useState(false);

  useEffect(() => {
    Taro.getStorage({ key: 'NavBarHeight' }).then(res => {
      setNavBarHeight(res.data * 2);
    });

    const pages = Taro.getCurrentPages();
    if (pages.length > 1) {
      setShowIcon(true);
    }
  }, []);


  return (
    <View>
      <View
        className="navbar_wrap"
        style={{
          height: pxTransform(navBarHeight),
          ...props.navigationBarStyle,
        }}
      >
        <View className="navbar_content">
          <View className="nav_content_center">
            <View hidden={!showIcon} className="nav_icon">
              <ProIcon w={35} h={35} model="icon" type={Icons.back} />
            </View>
            <View className="page_title">{props.title}</View>
          </View>
        </View>
      </View>
      {/* 占位 */}
      <View style={{ height: pxTransform(navBarHeight) }} />
    </View>
  );
}
