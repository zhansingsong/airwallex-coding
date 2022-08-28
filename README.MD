# Airwallex test

> Requiring node version 14 or higher. if you use Node Version Manager (nvm), you can execute the following command:
>
> ```bash
> nvm use
> ```

## 运行

- 安装依赖包

  ```bash
  npm install
  ```

- **开发**
  
  ```js
  npm run start
  ```

- **打包**

  ```js
  npm run build
  ```

- **测试**

  ```js
  npm run test
  ```

- **编译 iconfont**

  将对应的 svg icon 图片放置 `"src/assets/svg2font/"` 目录下，然后运行：

  ```bash
  npm run font
  ```

  > 基于 svg2font 实现： https://github.com/zhansingsong/svg2font

## 项目

```js
src
├── assets
│   ├── iconfont // 字体文件，自动生成
│   └── svg2font // 放置待转换为 font 的 svg 文件
├── components
│   ├── App // App 组件
│   ├── Context // context
│   ├── Hooks // hooks
│   ├── Layout // Layout 组件
│   ├── Router // 路由
│   ├── commons // 公用组件
│   └── pages // 页面组件
├── constant // 常量
├── index.tsx
├── libs // 第三方库
├── reportWebVitals.ts // 上报
├── setupTests.ts // 代理
├── styles  // 样式
│   ├── base // 基础样式
│   ├── iconfont // 字体样式，svg2font 工具自动生成
│   ├── sass // 不会编译成 css 的 sass 样式。会通过 webpack 全局注入到每个 sass 文件中，方便引用
│   └── styles.scss 
├── types // ts 类型
└── utils // 工具方法
```

## 适配方案

采用 vw + rem 适配方案： https://github.com/zhansingsong/vwrem