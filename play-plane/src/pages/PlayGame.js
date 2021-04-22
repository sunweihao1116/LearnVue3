// 游戏页面

import { h, defineComponent, reactive, watch, onMounted, onUnmounted } from '@vue/runtime-core';
import Plane from '../components/Plane';
import EnemyPlane from '../components/EnemyPlane';
import Bullet from '../components/Bullet';
import Map from '../components/Map';
import { game } from '../game';
import { collision } from '../utils/collision';
import { randomNum } from '../utils/randomNum';

export default defineComponent({
  setup(props, { emit }) {
    // 本方飞机
    const { planeInfo } = useCreatePlane();
    // 敌方飞机
    const { enemyPlanes } = useCreateEnemyPlane();
    // 本方子弹
    const { bullets, addBullet } = useCreateBullets();
    // 战斗环节
    useFighting(planeInfo, enemyPlanes, bullets, emit);

    const onAttack = (planeInfo) => {
      addBullet(planeInfo);
    };
    return {
      planeInfo,
      enemyPlanes,
      bullets,
      onAttack,
    };
  },
  render(ctx) {
    // 创建敌机
    const enemyPlanesMap = ctx.enemyPlanes.map((planeInfo) => {
      return h(EnemyPlane, { x: planeInfo.x, y: planeInfo.y });
    });
    // 创建子弹
    const bulletsMap = ctx.bullets.map((bulletInfo) => {
      return h(Bullet, { x: bulletInfo.x, y: bulletInfo.y });
    })
    const vnode = h('Container', [
      h(Map),
      h(Plane, { x: ctx.planeInfo.x, y: ctx.planeInfo.y, onAttack: ctx.onAttack }),
      ...enemyPlanesMap,
      ...bulletsMap,
    ]);
    return vnode;
  },
});

// 本方飞机
function useCreatePlane() {
  const planeInfo = reactive({ x: 180, y: 642, width: 120, height: 158});
  const speed = 10;
  window.addEventListener('keydown', (e) => {
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
      default:
        break;
    }
  });
  return {
    planeInfo,
  };
};

// 我方子弹
function useCreateBullets(params) {
  const bullets = reactive([]);
  const addBullet = (planeInfo) => {
    bullets.push({
      ...planeInfo,
      width: 20,
      height: 30,
    });
  };
  return {
    bullets,
    addBullet,
  };
};

// 敌方飞机
function useCreateEnemyPlane() {
  const enemyPlanes = reactive([]);
  setInterval(() => {
    enemyPlanes.push({
      x: randomNum(376),
      y: -136,
      width: 104,
      height: 136,
    })
  }, 2000);
  return {
    enemyPlanes,
  };
};

// 战斗
function useFighting(planeInfo, enemyPlanes, bullets, emit) {
  const handleTicker = () => {
    const speed = 1;
    enemyPlanes.forEach((enemyInfo, index) => {
      enemyInfo.y += speed;
      if (collision(enemyInfo, planeInfo)) { // 碰撞检测-游戏结束
        // console.log('hit');
        emit('pageChange', 'StartPage');
      }
      if (enemyInfo.y > 800 + enemyInfo.height) {  // 飞出屏幕删除敌方飞机
        enemyPlanes.splice(index, '1');
      }
    });

    bullets.forEach((bulletInfo, bulletIndex) => {
      bulletInfo.y -= 2;
      enemyPlanes.forEach((enemyInfo, enemyindex) => {
        if (bulletInfo.y < 0) { // 飞出屏幕删除子弹
          bullets.splice(bulletIndex, '1');
        }
        if (collision(bulletInfo, enemyInfo)) { // 碰撞检测子弹/敌机消失
          // console.log('hit');
          enemyPlanes.splice(enemyindex, '1');
          bullets.splice(bulletIndex, '1');
        }
      });
    });
  };
  onMounted(() => {
    // 敌方飞机移动
    game.ticker.add(handleTicker);
  });
  onUnmounted(() => {
    // 组件销毁后清除移动效果
    game.ticker.remove(handleTicker);
  });
};