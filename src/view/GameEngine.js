

export default class GameEngine {

  trayIcon;

//  private boolean allowDraw;
  resourceManagerBase;
  #scale = 0.0;
  messageSource;
  viewImplFactory;

  gameObjects = new Map(); //new LinkedHashMap<GameObject, GameObjectRenderBase>();
  initializationCompletedListeners = []; //List<SimpleEvent<BaseGameView, Void>> 
  
  static get CURSOR_TYPE_DEFAULT() { return "default"; }
  static get CURSOR_TYPE_HAND() { return "hand"; }
  static get CURSOR_TYPE_WAIT() { return "wait"; }
  
//  private CursorType cursorType = CursorType.DEFAULT;

  #started = false;

  #clickedListeners = []; // new ArrayList<ClickedListener>();
  #mouseMoveListeners = []; // new ArrayList<MouseMoveListener>();
  #font; // IndependentFont

  constructor() {

  }

  step() {
    if (this.#started) {
      for (const gor of gameObjects.values()) {
        const go = gor.gameObject;
        go.step();
        if (go.visible) {
          gor.step();
        }
      }
    }
  }

  draw(independentCanvas) {
    const gameObjectRenderList = this.sortGameObjects();
    // independentCanvas.font = font;
    for (const gor of gameObjectRenderList) {
      const go = gor.gameObject;
      if (go.visible) {
        gor.draw(independentCanvas);
      }
    }
  }

  /**
   * Устанавливает разрешение на перерисовку.
   * 
   * @param allowDraw
   *      Если true - то панель может вызывать метод repaint по таймеру.
   *      Если false - то панель не должна вызывать метод repaint, так
   *      как главное окно свёрнуто или неактивно.
   */
  set allowDraw(allowDraw) {
//    this.allowDraw = allowDraw;
  }

  /**
   * Инициализация объектов.
   */
  initialize() {
    console.debug("Initialize Game Engine");
  };

  /**
   * Освобождение задействованных ресурсов.
   */
  release() {
    for (const gor of gameObjects.values()) {
      gor.release();
    }
  }

  /**
   * Устанавливает коэффициент масштабирования.
   * 
   * @param scale
   *      Коэффициент масштабирования.
   */
  set scale(scale) {
    console.debug('Set scale to %f', scale);
    this.#scale = scale;
    this.#font = this.viewImplFactory.createFont(Math.round(20 * scale));
    for (const gor of this.gameObjects.values()) {
      gor.scale = scale;
    }
  }

  /**
   * Добавляет новый объект.
   * 
   * @param go
   */
  addGameObject(gor) {
    gameObjects.set(gor.gameObject, gor);
    gor.scale = this.#scale;
  }

  removeGameObject(go) {
    gor = gameObjects.get(go);
    gor.release();
    gameObjects.delete(go);
  }

  getGameObject(go) {
    return gameObjects.get(go);
  }

  start() {
    this.started = true;
  }

  pause() {
    this.started = false;
  }

  showDefaultCursor() {
  }

  showHandCursor(){
  }

  showWaitCursor(){
  }

  getGameObjects() {
    return this.gameObjects.keys();
  }

  sortGameObjects() {
    const gameObjectsList = Array.from(this.gameObjects.values());
    gameObjectsList.sort((o1, o2) => {
            return o1.gameObject.z
                - o2.gameObject.z;
          }
        );
    return gameObjectsList;
  }


  get allowDraw() {
    return true;
  }

  addGameObject(go) {
    this.gameObjects.set(go, this.viewImplFactory.createGameObjectRender(go));
  }

  get gameObjectRenders() {
    return this.gameObjects.values();
  }

  reloadImages() {
    for (const gorb of this.gameObjectRenders) {
      this.#reloadImagesGameObjectRender(gorb);
    }
  }

  #reloadImagesGameObjectRender(gor) {
    console.debug('Reload images for game object render %o ', gor);
    const ids = gor.gameObject.animationImageIds;
    if (ids != null) {
      const animationsCount = ids.length;
      const animations = new Array(animationsCount);
      for (let n = 0; n < animationsCount; n++) {
        const imgids = ids[n];
        animations[n] = this.viewImplFactory.createAnimation(imgids);
      }
      gor.animations = animations;      
      //gor.currentAnimation = gor.animations[gor.gameObject.state];
    }
  }

  initializeCollectableGameObject(go) {
    reloadImages(this.getGameObject(go));
  }
  
  initializeExperienceGameObject(go) {
    reloadImages(this.getGameObject(go));
  };

  mouseClicked(clickedArg) {
    const arg = new ClickedArg();
    const logicalMousePosition = new Point(Math.trunc(clickedArg.mousePosition.x / scale),
        Math.trunc(clickedArg.mousePosition().y / scale));
    arg.mousePosition = logicalMousePosition;
    for (const listener of this.#clickedListeners) {
      listener.clicked(arg);
      if (arg.handled) {
        clickedArg.handled = true;
        break;
      }
    }
  }

  mouseMoved(mouseMoveArg) {
    const arg = new MouseMoveArg();
    arg.mousePosition = new Point(Math.trunc(mouseMoveArg.mousePosition
        .x / scale),
        Math.trunc(mouseMoveArg.mousePosition.y / scale));
    for (const listener of this.#mouseMoveListeners) {
      listener.mouseMove(arg);
      if (arg.handled) {
        mouseMoveArg.handled = true;
        break;
      }
    }
  }
  
  addClickedListener(clickedListener) {
    this.#clickedListeners.push(clickedListener);
  }
  
  addMouseMoveListener(mouseMoveListener) {
    this.#mouseMoveListeners.push(mouseMoveListener);
  }
  
  fireInitializationCompleted() {
    for (const listener of initializationCompletedListeners) {
      listener.eventFired(this, null);
    }
  }
  
  addInitializationCompletedListener(initializationCompletedListener) {
    this.initializationCompletedListeners
        .push(initializationCompletedListener);
  }
  
  showView() {
  }
  
  hideView(){
    
  }

  startWaitAnimation() {
    // TODO Auto-generated method stub  
  }

  stopWaitAnimation() {
    // TODO Auto-generated method stub
    
  }

  setToolTipText(string) {
    // TODO Auto-generated method stub
    
  }

  updatePlayerIconResource(go, resourceId,
      petType, hatResourceId, clothResourceId, bowResourceId) {
    const gorb = this.getGameObject(go);
    gorb.animations = viewImplFactory.createPetIconAnimation(resourceId,
        petType, getScale(), hatResourceId, clothResourceId, bowResourceId);
  }

}
