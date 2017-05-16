

## 技术栈
vue2 + vuex + vue-router + webpack + ES6/7 + fetch + sass + flex 

# 项目布局

```
.
├── build                                       // webpack配置文件
├── config                                      // 项目打包路径
├── demo                                        // 上线项目文件，放在服务器即可正常访问                    
├── src                                         // 源码目录
│   ├── components                              // 组件
|   |   ├──switchButton.vue                     //开关按钮
│   │   ├──alertTip.vue                         //提示框
│   │   └── headTop.vue                         // toolbar
│   ├── config                                  // 基本配置
│   │   ├── env.js                              // 环境切换配置
│   │   ├── fetch.js                            // 获取数据
│   │   ├── mUtils.js                           // 常用的js方法
│   │   └── rem.js                              // px转换rem
│   ├── images                                  // 公共图片
│   ├── elmpage                                 // elm 的所有页面
|   |   ├── login.vue                            //登录
|   |   └── home.vue                             //首页
│   ├── page
|   |   ├── resume.vue                           // 简历
|   |   ├── fade.vue                             //动画测试
|   |   ├── home.vue                             // 主页,目录
|   |   └── test.vue                             //测试
│   ├── plugins                                 // 引用的插件
│   ├── router
│   │   └── router.js                           // 路由配置
│   ├── service                                 // 数据交互统一调配
│   │   ├── getData.js                          // 获取数据的统一调配文件，对接口进行统一管理
│   │   └── tempdata                            // 开发阶段的临时数据
│   ├── store                                   // vuex的状态管理
│   │   ├── action.js                           // 配置actions
│   │   ├── getters.js                          // 配置getters
│   │   ├── index.js                            // 引用vuex，创建store
│   │   └── mutations.js                        // 配置mutations
│   └── style
│       ├── common.scss                         // 公共样式文件
│       ├── mixin.scss                          // 样式配置文件
│       └── swiper.min.css
│   ├── App.vue                                 // 页面入口文件
│   ├── main.js                                 // 程序入口文件，加载各种公共组件
├── favicon.ico                                 // 图标
├── index.html                                  // 入口html文件
.


