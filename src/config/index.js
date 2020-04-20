import development from "./development";
import production from "./production";

const config = {
  development,
  production,
}

// env 是 webpack 注入的环境参数 ，见 /config/index 中defineConstants 的配置
// 尽量少使用
export default config[process.env.NODE_ENV];
