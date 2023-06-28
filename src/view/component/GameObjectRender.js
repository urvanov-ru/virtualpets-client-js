import Point from '../../domain/Point.js';
import Dimension from '../../domain/Dimension.js';

export default class GameObjectRender {

    
  position = new Point();
  dimension = new Dimension();

  #scale = 0.0;

  gameObject;
    
  #animations; // Animation[]

  #currentAnimation;
  #currentAnimationId = -1;
  
  constructor(go) {
    this.gameObject = go;
    this.#currentAnimationId = go.state;
  }
  
  release() {
    this.gameObject.release();
  }
  
  set scale(scale) {
    this.scale = scale;
    const lastPosition = gameObject.position;
    this.position = new Point(lastPosition.x * scale, lastPosition.y * scale);
  }
  
  set animations(animations) {
    console.debug('set animations');
    this.#animations = animations;
    this.#currentAnimation = null;
  }
  
  get animations() {
    return this.#animations;
  }
  
  
  get currentAnimation() {
    if (this.#currentAnimation == null) {
      this.this.#currentAnimation = this.#animations[this.#currentAnimationId];
    }
    return this.#currentAnimation;
  }
  
  set currentAnimation(currentAnimation) {
    this.#currentAnimation = currentAnimation;
    this.dimension = new Dimension(this.#currentAnimation.image.width,
        this.#currentAnimation.image.height);
  }
  
  
  draw(canvas) {
    const logicPosition = this.gameObject.position;
    this.position = new Point(logicPosition.x * this.#scale,
        logicPosition.y * this.#scale);
    const ca = this.currentAnimation;
    const img = ca.image;
    canvas.drawImage(img, this.position.x,
        this.position.y);
  }
  
  set scale(scale) {
    console.debug('set gor scale %f.', scale);
    this.#scale = scale;
    const lastPosition = this.gameObject.position;
    this.position = new Point(lastPosition.x * this.#scale, lastPosition.y * this.#scale);
  }
}
