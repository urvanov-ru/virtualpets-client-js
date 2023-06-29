 
import Point from '../../domain/Point.js';
import Dimension from '../../domain/Dimension.js';
 
 export default class GameObjectRenderBase {
  position = new Point();
  dimension = new Dimension();
  gameObject;

  #scale = 0.0;
 
  constructor(go) {
    this.gameObject = go;
  }
 
  set scale(scale) {
    this.#scale = scale;
    const lastPosition = this.gameObject.position;
    this.position = new Point(lastPosition.x * scale, lastPosition.y * scale);
  }
  
  get scale() {
    return this.#scale;
  }
 

}