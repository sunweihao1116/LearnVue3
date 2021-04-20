// 飞机
import { h, defineComponent, watch, toRefs } from '@vue/runtime-core';
import planeImg from '../../assets/images/plane.png';

export default defineComponent({
  props: ['x', 'y'],
  setup(props, ctx) {
    // console.log(props);
    const { x, y } = toRefs(props); // 响应式丢失
    return {
      x,
      y,
    }
  },
  render(ctx) {
    const vnode = h('Container', { x: ctx.x, y: ctx.y }, [ h('Sprite', { texture: planeImg }) ]);
    return vnode;
  }
});