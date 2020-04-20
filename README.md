## 目录
```
├── config                 配置目录
|   ├── dev.js             开发时配置
|   ├── index.js           默认配置
|   └── prod.js            打包时配置
├── src                    源码目录
|   ├── components         公共组件目录
|   ├── pages              页面文件目录
|   |   ├── index          index 页面目录
|   |   |   ├── banner     页面 index 私有组件
|   |   |   ├── index.js   index 页面逻辑
|   |   |   └── index.css  index 页面样式
|   ├── utils              公共方法库
|   ├── app.css            项目总通用样式
|   └── app.js             项目入口文件
└── package.json
```

## 开发规范
 ESLint
 代码书写规范请遵循 [Taro](http://taro-docs.jd.com/taro/docs/spec-for-taro.html) 规范，后续会有更完善的规范补充。

### 基本
- [x] taro init
- [x] 网络请求 (chili)
- [x] scss全局变量(style/theme.scss)
- [x] 基础TsLint/EsLint校验
- [x] 简单的git仓库
- [x] taro-ui库引用

### 通用模块
- [x] 地址模块

### 开发中~
- [ ] 登陆模块(小程序/H5)
- [ ] 命令行搭建
- [ ] 命令生成组件

### 需求待定
- [ ] Eslint强校验使用Hook函数（自定义规则）
