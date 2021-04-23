import { ref, onMounted, onUnmounted } from '@vue/runtime-core';
import { game } from '../game';

/**
 * 键盘移动优化
 * @param x 初始化x坐标
 * @param y 初始化y坐标
 * @param speed 移动速度
 */

const commandType = {
  upAndDown: 'upAndDown',
  leftAndRight: 'leftAndRight',
};

export function usekeyboardMove({ x, y, speed = 10 }) {
  const moveX = ref(x);
  const moveY = ref(y);

  const moveCommands = [];

  const upCommand = {
    type: commandType.upAndDown,
    dir: -1,
    id: 1,
  };
  
  const downCommand = {
    type: commandType.upAndDown,
    dir: 1,
    id: 2,
  };
  
  const leftCommand = {
    type: commandType.leftAndRight,
    dir: -1,
    id: 3,
  };
  
  const rightCommand = {
    type: commandType.leftAndRight,
    dir: 1,
    id: 4,
  };

  const findUpAndDownCommand = () => 
    moveCommands.find(command => command.type === commandType.upAndDown);
  
  const findLeftAndRightCommand = () => 
    moveCommands.find(command => command.type === commandType.leftAndRight);

  const isExistCommand = (command) => {
    const id = command.id;
    const result = moveCommands.find(c => c.id === id);
    if (result) return true;
    return false;
  };

  const removeCommand = (command) => {
    const id = command.id;
    const index = moveCommands.findIndex(c => c.id === id);
    moveCommands.splice(index, 1);
  }
  /* 边界处理 */ 
  const upAndDownBoundary = ({ dir, max, min = 0 }) => {
    return (dir > 0 && moveY.value >= max) || (dir < 0 && moveY.value <= min);
  };

  const leftAndRightBoundary = ({ dir, max, min = 0 }) => {
    return (dir > 0 && moveX.value >= max) || (dir < 0 && moveX.value <= min);
  };
  /* 移动 */ 
  const handleTicker = () => {
    /* 上下 */ 
    const upAndDownCommand = findUpAndDownCommand();
    const resultY = upAndDownCommand && !upAndDownBoundary({ dir: upAndDownCommand.dir, max: 642 })  
    if (resultY) moveY.value += upAndDownCommand.dir * speed;
    /* 左右 */
    const leftAndRightCommand = findLeftAndRightCommand();
    const resultX = leftAndRightCommand && !leftAndRightBoundary({ dir: leftAndRightCommand.dir, max: 360 })
    if (resultX) moveX.value += leftAndRightCommand.dir * speed;
  }

  const commandMap = {
    ArrowUp: upCommand,
    ArrowDown: downCommand,
    ArrowLeft: leftCommand,
    ArrowRight: rightCommand,
  };

  const handleKeyUp = (e) => {
    const command = commandMap[e.code];
    if (command) {
      removeCommand(command);
    }
  };

  const handleKeyDown = (e) => {
    const command = commandMap[e.code];
    if (command && !isExistCommand(command)) {
      moveCommands.unshift(command);
    }
  }

  onMounted(() => {
    game.ticker.add(handleTicker);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
  });

  onUnmounted(() => {
    game.ticker.remove(handleTicker);
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('keyup', handleKeyUp);
  });

  return {
    x: moveX,
    y: moveY,
  };
}
