// 手写reactive函数
// vue2->vue3 new Proxy 代替Object.defineProperty（闭包）; 减少遍历次数，对深层数据做到数据响应式。性能更快，内存更小。
// Reflect解决异常问题
// get 时判断子节点是否为object， 进行递归解决嵌套问题

const isObject = v => typeof v === 'object';

function reactive(obj) {
  if (!isObject(obj)) {
    return obj;
  }
  // new Proxy
  return new Proxy(obj, {
    get(target, key) {
      console.log('get', target[key]);
      const res = Reflect.get(target, key);
      track(target, key);
      return isObject(obj) ? reactive(target[key]) : res; // 子节点为object时，递归（解决嵌套问题）
    },
    set(target, key, val) {
      console.log('set', val);
      const res = Reflect.set(target, key, val);
      trigger(target, key);
      return res;
    },
    deleteProperty(target, key) {
      console.log('deleteProperty', key);
      const res = Reflect.deleteProperty(target, key);
      trigger(target, key);
      return res;
    },
  })
};

// 保存cb数组
const effectStack = []; 

// 添加副作用函数 effect
function effect(fn) {
  const e = createReactiveEffect(fn);
  e();
  return e;
};

function createReactiveEffect(fn) {
  const effect = function reactiveEffect() {
    try { // 防止可能发生的错误
      effectStack.push(fn); // fn放入effectStack
      return fn(); // 执行fn
    } finally {
      effectStack.pop(fn); // fn 弹出effectStack
    };
  };
  return effect;
};

const targetMap = new WeakMap(); // 存储依赖关系数据结构 

// 依赖收集 track
function track(target, key) {
  const effect = effectStack[effectStack.length - 1];
  if (effect) { // 建立effect与targey、key的映射关系
    let depsMap = targetMap.get(target);
    if (!depsMap) { // 初始化
      depsMap = new Map();
      targetMap.set(target, depsMap);
    }

    let deps = depsMap.get(key);
    if (!deps) {
      deps = new Set();
      depsMap.set(key, deps);
    }
    deps.add(effect);
  }
};

// 触发函数 trigger
function trigger(target, key) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;
  const deps = depsMap.get(key);
  deps.forEach(dep => dep());
};

// const obj = reactive({
//   foo: 'foo',
//   a: {
//     b: 1,
//   },
// });

// effect(() => {
//   console.log('foo', obj.foo);
// });
// effect(() => {
//   console.log('foo,b--->', obj.foo, obj.a.b);
// });

// obj.foo;
// obj.foo = 'fooooooo';
// obj.a.b = 2;
// obj.a.b;
// delete obj.foo;
// console.log(obj);
