import Point from './Point.js';
import Dimension from './Dimension.js';

export default class GameObject {
  static get TILE_Z_STEP() { return 5; }
  
  position = new Point();
  z = 0;
  dimension = new Dimension();
  visible = true;
  tileTypes; // TileType[][]
  state = 0;
  
  loopAnimation = false;
  animationImageIds; // int[][] 
  
  #clickedListeners = []; // new ArrayList<ClickedListener>();
  #mouseMoveListeners = []; // new ArrayList<MouseMoveListener>();
  #animationOverListeners = []; // new ArrayList<AnimationOverListener>();
  
  addClickedListener(clickedListener) {
    this.#clickedListeners.push(clickedListener);
  }

  fireClicked(arg) {
    for (const clickedListener of this.#clickedListeners) {
      clickedListener(arg);
    }
  }

  addMouseMoveListener(mouseOverListener) {
    this.#mouseMoveListeners.push(mouseOverListener);
  }

  fireMouseMove(arg) {
    for (const mouseMoveListener of this.#mouseMoveListeners) {
      mouseMoveListener(arg);
    }
  }

  addAnimationOverListener(animationOverListener) {
    this.#animationOverListeners.push(animationOverListener);
  }

  fireAnimationOver(arg) {
    for (const animationOverListener of this.#animationOverListeners) {
      animationOverListener(arg);
    }
  }
  
  removeAllAnimationOverListeners() {
    this.#animationOverListeners.clear();
  }
  
  step() {
  }
  
  release() {
    this.#clickedListeners.clear();
    this.#mouseMoveListeners.clear();
    this.#animationOverListeners.clear();
  }
  
    
}

