// 碰撞检测

export function collision(planeA, planeB) {
  return (planeA.x + planeA.width >= planeB.x && 
        planeB.x + planeB.width >= planeA.x &&
        planeA.y + planeA.height >= planeB.y &&
        planeB.y + planeB.height >= planeA.y)
}