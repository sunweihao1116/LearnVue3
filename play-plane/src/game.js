// 创建canvas根容器
import { Application } from 'pixi.js';

export const game = new Application({
  width: 480,
  height: 800,
});

document.body.append(game.view);

export function getRootContainer() {
  return game.stage;
}