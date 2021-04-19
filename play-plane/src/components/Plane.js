// 飞机
import { h, defineComponent, ref, reactive } from '@vue/runtime-core';
import planeImg from '../../assets/images/plane.png';

export default defineComponent({
  setup(props, ctx) {
    const planeInfo = reactive({
      x: 180,
      y: 642,
    });
    return {
      planeInfo,
    };
  },
  render(ctx) {
    const vnode = h('Container', [
      h('Sprite', { 
        texture: planeImg,
        x: ctx.planeInfo.x,
        y: ctx.planeInfo.y,
      }),
    ]);
    return vnode;
  }
});