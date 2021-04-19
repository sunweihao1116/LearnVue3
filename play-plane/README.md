## Custom Renderer API (Code process)
创建基于@vue/runtime-core & Composition API & pixi.js的canvas飞机大战游戏。 实现自定义构造器。

### 初始化webpack环境便于开发

1. npm init 

2. npm i webpack webpack-cli webpack-dev-server -D

3. npm i vue @vue/runtime-core pixie.js

4. npm i html-webpack-plugin file-loader -D

5. 创建webpack.config.js、main.js、index.html; 配置webpack环境。

## createApp 根容器、根组件构建
创建src/runtime-canvas/index.js 自定义renderer;

创建src/game.js 初始化根容器;

创建src/App.js 初始化根组件。

## 创建StartPage(开始页面)、PlayGame(游戏页面)
创建页面并拆分游戏页面背景、飞机,组件化；




