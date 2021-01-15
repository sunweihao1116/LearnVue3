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
      return isObject(obj) ? reactive(target[key]) : res; // 子节点为object时，递归（解决嵌套问题）
    },
    set(target, key, val) {
      console.log('set', val);
      const res = Reflect.set(target, key, val);
      return target[key] = val;
    },
    deleteProperty(target, key) {
      console.log('deleteProperty', key);
      const res = Reflect.deleteProperty(target, key);
      return res;
    },
  })
};

const obj = reactive({
  foo: 'foo',
  a: {
    b: 1,
  },
});

// obj.foo;
// obj.foo = 'fooooooo';
obj.a.b = 2;
obj.a.b;
delete obj.foo;
// console.log(obj);
