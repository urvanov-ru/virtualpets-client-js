

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
  
  clickedListeners = []; // new ArrayList<ClickedListener>();
  mouseMoveListeners = []; // new ArrayList<MouseMoveListener>();
  animationOverListeners = []; // new ArrayList<AnimationOverListener>();
  
  addClickedListener(clickedListener) {
    clickedListeners.push(clickedListener);
  }

  fireClicked(arg) {
    for (const al of clickedListeners) {
      al.clicked(arg);
    }
  }

  addMouseMoveListener(mouseOverListener) {
    mouseMoveListeners.push(mouseOverListener);
  }

  fireMouseMove(arg) {
    for (const mol of mouseMoveListeners) {
      mol.mouseMove(arg);
    }
  }

  addAnimationOverListener(animationOverListener) {
    animationOverListeners.push(animationOverListener);
  }

  fireAnimationOver(arg) {
    for (const aol of animationOverListeners) {
      aol.animationOver(arg);
    }
  }
  
  removeAllAnimationOverListeners() {
    this.animationOverListeners.clear();
  }
  
  step() {
  }
  
  release() {
    clickedListeners.clear();
    mouseMoveListeners.clear();
    animationOverListeners.clear();
  }
  
  isLoopAnimation() {
    return loopAnimation;
  }
    
}

