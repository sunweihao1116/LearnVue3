// 地图背景-滚动效果
import { h, defineComponent, ref } from '@vue/runtime-core';
import mapImg from '../../assets/images/map.png';
import { game } from '../game';

export default defineComponent({
  setup(props, ctx) {
    const viewHeight = 800;
    let mapY1 = ref(0); // 数据响应
    let mapY2 = ref(-viewHeight);
    const speed = 5; // 滚动速度
    game.ticker.add(() => { // pixi
      mapY1.value += speed;
      mapY2.value += speed;
      if (mapY2.value >= viewHeight) {
        mapY2.value = -viewHeight;
      }
      if (mapY1.value >= viewHeight) {
        mapY1.value = -viewHeight;
      }
    });
    return {
      mapY1,
      mapY2,
    };
  },
  render(ctx) {
    const vnode = h('Container', [
      h('Sprite', { texture: mapImg, y: ctx.mapY1 }),
      h('Sprite', { texture: mapImg, y: ctx.mapY2 }),
    ]);
    return vnode;
  }
});