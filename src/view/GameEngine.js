import MouseMoveArg from '../domain/MouseMoveArg.js';
import ClickedArg from '../domain/ClickedArg.js';
import Point from '../domain/Point.js';
import i18n from 'roddeh-i18n';

export default class GameEngine {

  trayIcon;

  allowDraw;
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
      for (const gor of this.gameObjects.values()) {
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
  //set allowDraw(allowDraw) {
  //  this.allowDraw = allowDraw;
 // }

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
    return this.gameObjects.get(go);
  }

  start() {
    console.debug('GameEngine started.');
    this.#started = true;
  }

  pause() {
    this.#started = false;
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


  //get allowDraw() {
  //  this.allowDraw();
  //}

  addGameObject(go) {
    let gor = this.viewImplFactory.createGameObjectRender(go)
    gor.scale = this.#scale;
    this.gameObjects.set(go, gor);
  }

  get gameObjectRenders() {
    return Array.from(this.gameObjects.values());
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
      console.debug('new animations = %o for animationImageIds = %o', animations, ids);
      gor.animations = animations;
      //gor.currentAnimation = gor.animations[gor.gameObject.state];
    }
  }

  initializeCollectableGameObject(go) {
    this.#reloadImagesGameObjectRender(this.getGameObject(go));
  }
  
  initializeExperienceGameObject(go) {
    this.#reloadImagesGameObjectRender(this.getGameObject(go));
  };

  mouseClicked(clickedArg) {
    const arg = new ClickedArg();
    arg.sender = clickedArg.sender;
    const logicalMousePosition = new Point(Math.trunc(clickedArg.mousePosition.x / this.#scale),
        Math.trunc(clickedArg.mousePosition.y / this.#scale));
    arg.mousePosition = logicalMousePosition;
    for (const listener of this.#clickedListeners) {
      listener(arg);
      if (arg.handled) {
        clickedArg.handled = true;
        break;
      }
    }
    if (arg.sender != null && !arg.handled) {
      arg.sender.fireClicked(arg);
    }
  }

  mouseMoved(mouseMoveArg) {
    const arg = new MouseMoveArg();
    arg.sender = mouseMoveArg.sender;
    arg.mousePosition = new Point(Math.trunc(mouseMoveArg.mousePosition
        .x / this.#scale),
        Math.trunc(mouseMoveArg.mousePosition.y / this.#scale));
    for (const listener of this.#mouseMoveListeners) {
      listener(arg);
      if (arg.handled) {
        mouseMoveArg.handled = true;
        break;
      }
    }
    if (arg.sender != null && !arg.handled) {
      if (arg.sender.visible) {
        arg.sender.fireMouseMove(arg);
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
    for (const listener of this.initializationCompletedListeners) {
      listener(this, null);
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

  set toolTipText(string) {
    // TODO Auto-generated method stub
    
  }

  updatePlayerIconResource(go, resourceId,
      petType, hatResourceId, clothResourceId, bowResourceId) {
    const gorb = this.getGameObject(go);
    gorb.animations = this.viewImplFactory.createPetIconAnimation(resourceId,
        petType, this.scale, hatResourceId, clothResourceId, bowResourceId);
  }

}
