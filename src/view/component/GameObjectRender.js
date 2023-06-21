import Point from '../../domain/Point.js';
import Dimension from '../../domain/Dimension.js';

export default class GameObjectRender {

    
  position = new Point();
  dimension = new Dimension();

  scale = 0.0;

  gameObject;
    
  animations; // Animation[]

  constructor(go) {
    this.gameObject = go;
  }
  
  release() {
    this.gameObject.release();
  }
  
  setScale(scale) {
    this.scale = scale;
    const lastPosition = gameObject.position;
    this.position = new Point(lastPosition.x * scale, lastPosition.y * scale);
  } 
  
  draw(independentCanvas) {
    throw "Method 'draw' is not implemented";
  }
}
