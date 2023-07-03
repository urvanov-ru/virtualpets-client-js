import Point from '../../domain/Point.js';
import Dimension from '../../domain/Dimension.js';
import GameObjectRenderBase from './GameObjectRenderBase.js';

export default class GameObjectRender extends GameObjectRenderBase {

    
  #animations; // Animation[]

  #currentAnimation;
  #currentAnimationId = -1;
  
  constructor(go) {
    super(go);
    this.#currentAnimationId = go.state;
  }
  
  release() {
    this.gameObject.release();
  }
    
  set animations(animations) {
    this.#animations = animations;
    this.#currentAnimation = null;
  }
  
  get animations() {
    return this.#animations;
  }
  
  
  get currentAnimation() {
    if (this.#currentAnimation == null) {
      this.#currentAnimation = this.#animations[this.#currentAnimationId];
    }
    return this.#currentAnimation;
  }
  
  set currentAnimation(currentAnimation) {
    console.debug('set currentAnimation %o', currentAnimation);
    this.#currentAnimation = currentAnimation;
    this.dimension = new Dimension(this.#currentAnimation.image.width,
        this.#currentAnimation.image.height);
  }
  
  
  draw(independentCanvas) {
    const logicPosition = this.gameObject.position;
    this.position = new Point(logicPosition.x * this.scale,
        logicPosition.y * this.scale);
    const ca = this.currentAnimation;
    const img = ca.image;
    independentCanvas.context.drawImage(img, this.position.x,
        this.position.y);
  }
}
