// 创建根组件
import { defineComponent, h, ref, computed } from '@vue/runtime-core';
import StartPage from './pages/StartPage';
import PlayGame from './pages/PlayGame';

export default defineComponent({
  setup(props, cxt) {
    let currentPageName = ref('PlayGame');
    let currentPage = computed(() => {
      if (currentPageName.value === 'StartPage') {
        return StartPage
      } else if (currentPageName.value === 'PlayGame') {
        return PlayGame;
      }
    });
    return {
      currentPage,
      currentPageName,
    }
  },
  render(ctx) {
    // // 创建vnode
    // // <rect x="100" y="100">swh<circle></circle></rect>
    // const vnode = h('rect', { x: 100, y: 100 }, [
    //   'swh',
    //   // h('circle', { x: 100, y: 100 }, 'circle'),
    //   h(Circle),
    // ]);
    const vnode = h('Container', [
      h(ctx.currentPage, {
        onPageChange: (pageName) => {
          ctx.currentPageName = pageName;
        },
      }),
    ]);
    return vnode;
  }
})