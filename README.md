# LearnVue3

## 1. createApp vue事例创建过程
createApp() Renderer 渲染器 render 渲染方法  

createApp()的执行过程：（runtime: apiCreateApp.js/renderer.ts）  

mount ->

createAppAPI -> createAPP  ->

创建 vnode ->

Patch 转换方法（虚拟 dom 转换为真实 dom）->

mountComponent 创建组件实例 ->

setupComponent 安装组件，组件初始化 ->

setupRenderEffect 副作用 effect —组件更新函数添加为副作用函数，如果将来数据发生变化，重新执行组件更新函数 ->

subTree(子树) —> patch (递归)

------------------

## 2. 手撸简单 vue 步骤(手动创建 vnode) 原 vnode 来源根组件渲染函数

￼1. 声明 Vue  
￼2. 创建 renderer = createRenderer(options) options: 自定义渲染器特有平台操作。例如：document.querySelector()……  
￼3. 创建 createRenderer() return runder， createApp  
4. ￼createAppAPI = (render) => { return function createApp(rootComponent){} }  
5. 创建 app 并返回  
```
  · 5.1 获取 vnode  
  · 5.2 执行 render
```
## 3. 模仿canvas构造器

## 4. 手撸reactive函数
  vue2 -> vue3 new Proxy 代替 Object.defineProperty; 减少遍历次数，对深层数据做到数据响应式。性能更快，内存更小。  
  Reflect解决异常问题  
  get 时判断子节点是否为object， 进行递归解决嵌套问题  

## 5. 使用Vue新API
1. createApp
2. setup
3. onMounted
4. computed
5. watch
6. watchEffect
7. toRefs
8. ......
