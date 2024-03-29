// 敌方飞机
import { h, defineComponent, watch, toRefs } from '@vue/runtime-core';
import enemyPlaneImg from '../../assets/images/enemyPlane.png'; // 104*136

export default defineComponent({
  props: ['x', 'y'],
  setup(props, ctx) {
    const { x, y } = toRefs(props); // 响应式丢失
    return {
      x,
      y,
    }
  },
  render(ctx) {
    const vnode = h('Container', { x: ctx.x, y: ctx.y }, [ h('Sprite', { texture: enemyPlaneImg }) ]);
    return vnode;
  }
});