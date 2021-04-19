// 游戏页面

import { h, defineComponent } from '@vue/runtime-core';
import Plane from '../components/Plane';
import Map from '../components/Map';

export default defineComponent({
  setup(props, ctx) {
    
  },
  render(ctx) {
    const vnode = h('Container', [
      h(Map),
      h(Plane),
    ]);
    return vnode;
  }
});