import GameObject from './GameObject.js';


export default class ProgressBarGameObject extends GameObject {
  value = 0;
  maxValue = 100;
    
  constructor() {
    this.dimension = new Dimension(100, 20);
  }

}
