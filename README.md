# Vue 3 + Vite + Pinia + Element Plus 后台管理系统模板

这是一个使用 Vue3、Vite、Pinia 和 Element Plus 开发的后台管理系统模板。它提供了一个基本的页面布局和一些常用的组件，包括导航栏、侧边栏、面包屑导航、用户信息、表格、表单等。你可以将它作为一个起点，根据自己的需求进行修改和扩展。

## 特性

- Vue 3
- Vite 用于快速开发和热模块替换
- Pinia 用于状态管理
- Element Plus UI 库
- 使用 Vue Router 进行路由跳转
- 使用 ESLint 和 Prettier 进行代码格式化

## 项目结构
~~~
├── public                  # 静态资源
│   ├── favicon.ico         # 网站图标
├── src                     # 项目源码
│   ├── assets              # 资源文件，如图片、css等
│   ├── components          # 公共组件
│   ├── icons               # 公共图标
│   ├── layout              # 页面布局
│   ├── router              # 路由配置
│   ├── pinia               # 状态管理
│   ├── views               # 页面组件
│   ├── App.vue             # 根组件
│   └── main.js             # 入口 JS 文件
├── .eslintrc.js            # ESLint 配置
├── .gitignore              # Git 忽略文件列表
├── index.html              # 入口 HTML 文件
├── LICENSE                 # MIT License
├── package.json            # 项目依赖和脚本
├── README.md               # 项目说明文档
├── vite.config.js          # Vite 配置
└── vitetest.config         # 单元测试配置
~~~

## 开发

```bash
# 克隆项目
git clone https://github.com/Jiangdedong/vue3-admin-template.git

# 进入项目目录
cd vue3-admin-template

# 安装依赖
npm install
或
yarn install

# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 http://127.0.0.1:5173/ 

## 发布

```bash
# 构建测试环境
npm run dev

# 构建生产环境
npm run build
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run format
```

## 贡献

如果您发现任何问题或有改进建议，请创建 issue 或提交 pull request。

## 许可证

本项目采用 MIT 许可证。