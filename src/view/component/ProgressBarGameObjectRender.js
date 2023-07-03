import GameObjectRender from './GameObjectRender.js';
import Point from '../../domain/Point.js';


export default class ProgressBarGameObjectRender extends GameObjectRender {

  constructor(go) {
    super(go);
  }

  step() {
  }
  
  draw(independentCanvas) {
    const context = independentCanvas.context;
    const scale = independentCanvas.scale;
    const logicPosition = this.gameObject.position;
    this.position = new Point(logicPosition.x * scale,
        logicPosition.y * scale);
    const logicDimension = this.gameObject.dimension;
    this.dimension = new Dimension(logicDimension.width * scale,
        logicDimension.height * scale);
    const lastColor = context.fillStyle;
    context.setColor("#ffff00");
    context.drawRect(this.position.x, position.y, dimension.width, dimension.height);
    const value = this.gameObject.value / this.gameObject.maxValue * dimension.width;
    context.fillRect(this.position.x, this.position.y, value, this.dimension.height);
    context.fillStyle(lastColor);
  }
}
