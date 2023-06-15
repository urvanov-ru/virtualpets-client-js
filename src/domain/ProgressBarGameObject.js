import GameObject from './GameObject.js';
import Dimension from './Dimension.js';


export default class ProgressBarGameObject extends GameObject {
  value = 0;
  maxValue = 100;
    
  constructor() {
    super();
    this.dimension = new Dimension(100, 20);
  }

}
