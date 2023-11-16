import GameObjectRender from './GameObjectRender.js';
import Point from '../../domain/Point.js';
import Dimension from '../../domain/Dimension.js';


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
    context.strokeStyle = "#ffff00";
    context.fillStyle = 'transparent';
    context.beginPath();
    context.rect(this.position.x, this.position.y, this.dimension.width, this.dimension.height);
    context.stroke();
    context.closePath();
    const value = this.gameObject.value / this.gameObject.maxValue * this.dimension.width;
    context.fillStyle = 'yellow';
    context.fillRect(this.position.x, this.position.y, value, this.dimension.height);
    context.fillStyle = lastColor;
  }
  
  get currentAnimation() {
    return null;
  }
}
