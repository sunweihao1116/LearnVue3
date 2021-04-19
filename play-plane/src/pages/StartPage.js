// 开始页面

import { h, defineComponent } from '@vue/runtime-core';
import startPageImg from '../../assets/images/startBg.jpg';
import startBtn from '../../assets/images/startBtn.png';

export default defineComponent({
  setup(props, { emit }) {
    const onClick = () => {
      emit('pageChange', 'PlayGame');
    };
    return {
      onClick,
    };
  },
  render(ctx) {
    const vnode = h('Container', [
      h('Sprite', { texture: startPageImg }),
      h('Sprite', { 
        texture: startBtn,
        x: 135,
        y: 500,
        interactive: true,
        onClick: ctx.onClick,
      })
    ]);
    return vnode;
  }
});