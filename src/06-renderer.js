const createAppAPI = (render) => {
  return function createApp(rootComponent) {
    let isMounted = false;
    const app = {
      mount(rootContainer) {
        if (!isMounted) {
          // 数据响应式
          // 添加副作用函数
          app._container = rootContainer;
          isMounted = true;
          app.$data = reactive(rootComponent.data());
          rootContainer = {
            rootContainer,
            _vnode: null,
          };
          effect(() => {
            // 1. 获取vnode
            const vnode = rootComponent.render.call(app.$data);
            // 2. 执行render
            render(vnode, rootContainer);
          });
        } else {
          console.error('warn');
        }
      },
    };
    return app;
  };
};

const mountComponent = (
  n2,
  container,
  renderFunction,
) => {
  // 1. instance 创建组件实例
  // 2. setupComponent  安装组件： 组件初始化
  // 3. setupRenderEffect 安装渲染函数 
  // 4. 副作用effect —组件更新函数添加为副作用函数，如果将来数据发生变化，重新执行组件更新函数
  // 5. patch
  // --------------------
  // init
  // 1. 获取宿主元素
  const parent = renderFunction.querySelector(container);
  // 2. 创建节点
  const child = renderFunction.createElement(n2.tag);
  if (typeof n2.children === 'string') {
    child.innerText = n2.children;
  }
  // 3. 插入
  renderFunction.insert(child, parent);
};

// 超简易版 虚拟dom挂载+更新；
const processComponent = (
  n1 = null,
  n2,
  container,
  renderFunction
) => {
  if (n1 !== null) { // 更新
    const parent = renderFunction.querySelector(container);
    const child = renderFunction.querySelector(n2.tag);
    if (typeof n2.children === 'string') {
      child.innerText = n2.children;
    }
    // 3. 插入
    renderFunction.insert(child, parent);
  } else {
    // init
    mountComponent(
      n2,
      container,
      renderFunction,
    );
  }
};

const patch = (
  n1 = null,
  n2,
  container,
  renderFunction,
) => {
  const { type } = n2;
  switch(type) {
    // case 
    default:
      // processElement, processFragment, processText ...
      processComponent(
        n1,
        n2,
        container,
        renderFunction,
      );
  };
};

// processComponent -> mountComponent

const createRenderer = (renderFunction) => {
  // 定义render
  const render = (vnode, container) => {
    if (container._vnode) { // 判断是否已挂载
      // update
      // patch
      // unmount(container._vnode, null, null, true);
      patch(container._vnode || null, vnode, container.rootContainer, renderFunction);
    } else {
      // init
      patch(null, vnode, container.rootContainer, renderFunction);
    }
    container._vnode = vnode;
  };
  return {
    render,
    createApp: createAppAPI(render),
  };
};

const renderer = createRenderer({
  querySelector(sel) {
    return document.querySelector(sel);
  },
  createElement(tag) {
    return document.createElement(tag);
  },
  insert(child, parent) {
    parent.appendChild(child);
  },
});
