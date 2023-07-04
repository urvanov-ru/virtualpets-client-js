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
    for (const al of this.#clickedListeners) {
      al.clicked(arg);
    }
  }

  addMouseMoveListener(mouseOverListener) {
    this.#mouseMoveListeners.push(mouseOverListener);
  }

  fireMouseMove(arg) {
    for (const mol of this.#mouseMoveListeners) {
      mol(arg);
    }
  }

  addAnimationOverListener(animationOverListener) {
    this.#animationOverListeners.push(animationOverListener);
  }

  fireAnimationOver(arg) {
    for (const aol of this.#animationOverListeners) {
      aol.animationOver(arg);
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

