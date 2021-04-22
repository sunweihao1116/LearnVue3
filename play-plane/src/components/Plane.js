// 飞机
import { h, defineComponent, watch, toRefs } from '@vue/runtime-core';
import planeImg from '../../assets/images/plane.png'; // 120*158

export default defineComponent({
  props: ['x', 'y'],
  setup(props, { emit }) {
    const { x, y } = toRefs(props); // 响应式丢失

    // 发射子弹
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space') {
        emit('attack', { x: x.value + 50, y: y.value });
      }
    });
    return {
      x,
      y,
    };
  },
  render(ctx) {
    const vnode = h('Container', { x: ctx.x, y: ctx.y }, [ h('Sprite', { texture: planeImg }) ]);
    return vnode;
  },
});