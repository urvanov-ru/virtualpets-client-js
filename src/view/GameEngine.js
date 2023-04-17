

export default class GameEngine {

  trayIcon;

//  private boolean allowDraw;
  resourceManagerBase;
  scale = 0.0;
  messageSource;
  viewImplFactory;

  gameObjects = new Map(); //new LinkedHashMap<GameObject, GameObjectRenderBase>();
  initializationCompletedListeners = []; //List<SimpleEvent<BaseGameView, Void>> 
  
  static get CURSOR_TYPE_DEFAULT() { return "default"; }
  static get CURSOR_TYPE_HAND() { return "hand"; }
  static get CURSOR_TYPE_WAIT() { return "wait"; }
  
//  private CursorType cursorType = CursorType.DEFAULT;

  started = false;

  clickedListeners = []; // new ArrayList<ClickedListener>();
  mouseMoveListeners = []; // new ArrayList<MouseMoveListener>();
  font; // IndependentFont

  constructor() {

  }

  step() {
    if (started) {
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
    gameObjectRenderList = sortGameObjects();
    independentCanvas.font = font;
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
    this.scale = scale;
    font = viewImplFactory.createFont(Math.round(20 * scale));
    for (const gor of gameObjects.values()) {
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
    gor.scale = this.scale;
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
    const gameObjectsList = Array.from(gameObjects.values());
    gameObjectsList.sort((o1, o2) => {
            return o1.getGameObject().getZ()
                - o2.getGameObject().getZ();
          }
        );
    return gameObjectsList;
  }


  get allowDraw() {
    return true;
  }

  addGameObject(go) {
    this.gameObjects.set(go, viewImplFactory.createGameObjectRender(go));
  }

  getGetGameObjectRenders() {
    return this.gameObjects.values();
  }

  reloadImages() {
    for (const gorb of getGetGameObjectRenders()) {
      reloadImages(gorb);
    }
  }

  reloadImages(gor) {
    const ids = gor.gameObject.getAnimationImageIds();
    if (ids != null) {
      const animationsCount = ids.length;
      const animations = new Array(animationsCount);
      for (let n = 0; n < animationsCount; n++) {
        const imgids = ids[n];
        animations[n] = this.viewImplFactory.createAnimation(imgids);
      }
      gor.setAnimations(animations);
      // gor.setCurrentAnimation(gor.getAnimations()[gor.getGameObject().getState()]);
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
    for (const listener of clickedListeners) {
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
    for (const listener of mouseMoveListeners) {
      listener.mouseMove(arg);
      if (arg.handled) {
        mouseMoveArg.handled = true;
        break;
      }
    }
  }
  
  addClickedListener(clickedListener) {
    clickedListeners.push(clickedListener);
  }
  
  addMouseMoveListener(mouseMoveListener) {
    mouseMoveListeners.push(mouseMoveListener);
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
