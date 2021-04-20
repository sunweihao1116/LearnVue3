// 游戏页面

import { h, defineComponent, reactive, onMounted, onUnmounted } from '@vue/runtime-core';
import Plane from '../components/Plane';
import EnemyPlane from '../components/EnemyPlane';
import Map from '../components/Map';
import { game } from '../game';
import { collision } from '../utils/collision';

export default defineComponent({
  setup(props, ctx) {
    // 本方飞机
    const { planeInfo } = useCreatePlane();
    // 敌方飞机
    const { enemyPlanes } = useCreateEnemyPlane();

    const handleTicker = () => {
      const speed = 1;
      enemyPlanes.forEach((enemyInfo, index) => {
        enemyInfo.y += speed;
        if (collision(enemyInfo, planeInfo)) { // 碰撞检测
          console.log('hit');
          ctx.emit('pageChange', 'StartPage');
        }
        // if () { // 飞出屏幕删除敌方飞机

        // }
      });
    }
    onMounted(() => {
      // 敌方飞机移动
      game.ticker.add(handleTicker);
    });
    onUnmounted(() => {
      game.ticker.remove(handleTicker);
    });
    
    return {
      planeInfo,
      enemyPlanes,
    };
  },
  render(ctx) {
    const enemyPlanesMap = ctx.enemyPlanes.map((planeInfo) => {
      return h(EnemyPlane, { x: planeInfo.x, y: planeInfo.y });
    });
    const vnode = h('Container', [
      h(Map),
      h(Plane, { x: ctx.planeInfo.x, y: ctx.planeInfo.y }),
      ...enemyPlanesMap,
    ]);
    return vnode;
  }
});

// 本方飞机
function useCreatePlane() {
  const planeInfo = reactive({ x: 180, y: 642, width: 120, height: 158});
  const speed = 10;
  window.addEventListener('keydown', (e) => {
    // console.log(e.code);
    const viewWidth = 480;
    const viewHeight = 800;
    const maxY = viewHeight - planeInfo.height; // 边界处理
    const maxX = viewWidth - planeInfo.width;
    switch (e.code) {
      case 'ArrowUp':
        planeInfo.y >= 0 ? planeInfo.y -= speed : null;
        break;
      case 'ArrowDown':
        planeInfo.y <=  maxY ? planeInfo.y += speed : null;
        break;
      case 'ArrowLeft':
        planeInfo.x >= 0 ? planeInfo.x -= speed : null;
        break;
      case 'ArrowRight':
        planeInfo.x <= maxX ? planeInfo.x += speed : null;
        break;
      case 'Space': 
        console.log('发射子弹');
        break;
      default:
        break;
    }
  });
  return {
    planeInfo,
  };
}
// 敌方飞机
function useCreateEnemyPlane() {
  const enemyPlanes = reactive([
    {
      x: 150,
      y: 0,
      width: 104,
      height: 136,
    },
  ]);
  
  return {
    enemyPlanes,
  };
}