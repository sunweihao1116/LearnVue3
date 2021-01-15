# LearnVue3

## 01. createApp vue事例创建过程
createApp() Renderer 渲染器 render 渲染方法  

createApp()的执行过程：（runtime: apiCreateApp.js/renderer.ts）  

createAppAPI -> createAPP  -> mount ->  render ->  

创建 vnode ->

Patch 转换方法（虚拟 dom 转换为真实 dom）->

mountComponent 创建组件实例 ->

setupComponent 安装组件，组件初始化 ->

setupRenderEffect 副作用 effect —组件更新函数添加为副作用函数，如果将来数据发生变化，重新执行组件更新函数 ->

subTree(子树) —> patch (递归)

------------------

## 02. 手撸简单 vue 步骤(手动创建 vnode) 原 vnode 来源根组件渲染函数

￼1. 声明 Vue  
￼2. 创建 renderer = createRenderer(options) options: 自定义渲染器特有平台操作。例如：document.querySelector()……  
￼3. 创建 createRenderer() return runder， createApp  
4. ￼createAppAPI = (render) => { return function createApp(rootComponent){} }  
5. 创建 app 并返回  
```
  · 5.1 获取 vnode  
  · 5.2 执行 render
```
## 03. 模仿canvas构造器

## 04. 手撸reactive函数
  vue2 -> vue3 new Proxy 代替 Object.defineProperty; 减少遍历次数，对深层数据做到数据响应式。性能更快，内存更小。  
  Reflect解决异常问题  
  get 时判断子节点是否为object， 进行递归解决嵌套问题  

## 05. 使用Vue新API
1. createApp
2. setup
3. onMounted
4. computed
5. watch
6. watchEffect
7. toRefs
8. ......

## 06. 数据响应式effect
1. effectStack[];
2. effect(fn); // 接收一个fn, 添加到effectStack并执行，完成后清除
3. createReactiveEffect();
4. reactiveEffect();
5. targetMap、depsMap、deps; // new WeakMap([taget, new Map(key, [fn1, fn2, ...])]
6. track 依赖收集
7. trigger 触发函数;

// reactive  
将track在 reactive get时调用进行依赖收集，trigger在 reactive  set、deleteProperty时触发函数




## 07. 虚拟DOM： js对象  Fragment(分片（多个子节点）)/vue2，template只能有一个子节点
新增dynamicChildren 动态节点  diff更加高效，记录动态值 无需重新遍历整棵树  
新增dynamicProps  
新增patchFlag 属性更新标记  
（template适用，jsx不适用）  
......  
读取vue3，renderer源码->走渲染过程。

## 08. diff 
patchKeyedChildren（掐头去尾，少增多删。乱序直接遍历）  

## 09. mount  

## 10. patch
