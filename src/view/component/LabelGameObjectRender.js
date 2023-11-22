import GameObjectRenderBase from './GameObjectRenderBase.js';
import Point from '../../domain/Point.js';
import Dimension from '../../domain/Dimension.js';
import {drawText} from 'canvas-txt';

export default class LabelGameObjectRender extends GameObjectRenderBase {
    
    
  constructor(go) {
    super(go);
  }
    
  step() {
    // TODO Auto-generated method stub
  }

  draw(independentCanvas) {
    const text = this.gameObject.text;
    const context = independentCanvas.context;
    const scale = independentCanvas.scale;
    const logicPosition = this.gameObject.position;
    this.position = new Point(logicPosition.x * scale,
        logicPosition.y * scale);
    const lastFont = context.font;
    const lastColor = context.fillStyle;
    context.font = "bold " + Math.floor(this.gameObject.size * scale) + 'px monospace';
    context.textAlign = 'start';
    context.fillStyle = "#ffff00";
    const logicDimension = this.gameObject.dimension;
    
    if (logicDimension == null || null === text || "" === text || logicDimension.width === 0 && logicDimension.height === 0) {
        const fontHeight = context.measureText(text).actualBoundingBoxAscent;
        context.fillText(text, this.position.x - 1, this.position.y + 1 + fontHeight);
        context.fillText(text, this.position.x + 1, this.position.y + 1 + fontHeight);
        context.fillStyle = "#000000";
        context.fillText(text, this.position.x, this.position.y + fontHeight);
    } else {
        this.dimension = new Dimension(logicDimension.width * scale, logicDimension.height * scale);
        drawText(context, text, {
                x: this.position.x,
                y: this.position.y,
                width: this.dimension.width,
                height: this.dimension.height,
                font: 'monospace',
                fontSize: Math.floor(this.gameObject.size * scale),
                fontStyle: 'bold'
            });
    }
    context.font = lastFont;
    context.fillStyle = lastColor;

  }
  
}
