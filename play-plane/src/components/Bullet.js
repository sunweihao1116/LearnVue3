// 子弹
import { h, defineComponent, watch, toRefs } from '@vue/runtime-core';
import bulletImg from '../../assets/images/bullet.png'; // 20*30

export default defineComponent({
  props: ['x', 'y'],
  setup(props, ctx) {
    const { x, y } = toRefs(props); // 响应式丢失
    return {
      x,
      y,
    };
  },
  render(ctx) {
    const vnode = h('Container', { x: ctx.x, y: ctx.y }, [ h('Sprite', { texture: bulletImg }) ]);
    return vnode;
  }
});