// 自定义cavans构造器
import { createRenderer } from '@vue/runtime-core';
import { Container, Graphics, Sprite, Text, Texture } from 'pixi.js';

const renderer = createRenderer({
  createElement(type) {
    // console.log(type);
    let element;
    switch (type) {
      case 'Container':
        element = new Container();
        break;
      case 'Sprite':
        element = new Sprite();
        break;
      default:
        break;
    }
    return element;
  },
  patchProp(el, key, prevValue, nextValue) {
    switch (key) {
      case 'texture':
        el.texture = new Texture.from(nextValue);
        break;
      case 'onClick':
        el.on('pointertap', nextValue);
        break;
      default:
        el[key] = nextValue;
        break;
    }
  },
  setElementText(node, text) { // 添加子元素
    const cText = new Text(text);
    node.addChild(cText);
  },
  createText(text) {
    return new Text(text);
  },
  createComment(text) {

  },
  // 获取父节点
  parentNode(node) {

  },
  // 获取兄弟节点
  nextSibling(node) {

  },
  // 删除节点时调用
  remove(el) {
    const parent = el.parent;
    if (parent) {
      parent.removeChild(el);
    }
  },
  insert(el, parent) {
    parent.addChild(el);
  }
});

export function createApp(rootComponent) {
  return renderer.createApp(rootComponent);
}
