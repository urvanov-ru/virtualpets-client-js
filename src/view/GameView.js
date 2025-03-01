import RoomLoadWorker from '../resources/RoomLoadWorker.js';
import TownLoadWorker from '../resources/TownLoadWorker.js';
import TreasuryLoadWorker from '../resources/TreasuryLoadWorker.js';
import RubbishLoadWorker from '../resources/RubbishLoadWorker.js';
import AfternoonTeaLoadWorker from '../resources/AfternoonTeaLoadWorker.js';
import DressingRoomLoadWorker from '../resources/DressingRoomLoadWorker.js';
import ProgressInfo from '../resources/ProgressInfo.js';

import MouseMoveArg from '../domain/MouseMoveArg.js';
import ClickedArg from '../domain/ClickedArg.js';
import Point from '../domain/Point.js';
import HighlightGameObject from '../domain/HighlightGameObject.js';

import PetType from '../api/domain/PetType.js';

import IndependentCanvas from './component/IndependentCanvas.js';
import GameObjectRender from './component/GameObjectRender.js';
import ProgressInfoPanel from './component/ProgressInfoPanel.js';

import {mainContainerElement, mainContainerScale} from './container.js';
import RoomView from './RoomView.js';
import TownView from './TownView.js';
import TreasuryView from './TreasuryView.js';
import RubbishView from './RubbishView.js';
import AfternoonTeaView from './AfternoonTeaView.js';
import DressingRoomView from './DressingRoomView.js';
import BaseHtmlView from './BaseHtmlView.js';


export default class GameView extends BaseHtmlView {

  static get ORIGINAL_WIDTH() { return 800; }
  static get ORIGINAL_HEIGHT() { return 600; }
  static get MAX_LOAD_WORKERS() { return 6; }
  static get ROOM_LOAD_WORKER() { return 0; }
  static get TOWN_LOAD_WORKER() { return 1; }
  static get TREASURY_LOAD_WORKER() { return 2; }
  static get DRESSING_ROOM_LOAD_WORKER() { return 3; }
  static get RUBBISH_LOAD_WORKER() { return 4; }
  static get AFTERNOONTEA_LOAD_WORKER() { return 5; }

  resourceManager;
  messageSource;
  trayIcon;
  settings;
  initialized = false;
  desktopPane;
  connectionInfo;
  progressInfoPanel;
  
  reloadResourcesTimer;
  scale = 0.0;
  mdiMainView;

  resourcesLoaded = new Array(GameView.MAX_LOAD_WORKERS).fill(false);

  #independentCanvas;
  
  baseGameView;
  timer;
  viewImplFactory;
  
  #firstInit = true;
    
 
  pickObject(x, y) {
    let picked = null;
    for (const gor of this.baseGameView.gameObjectRenders) {
      const go = gor.gameObject;
      if (gor instanceof GameObjectRender && go.visible) {
        const renderPosition = gor.position;
        const goX = renderPosition.x;
        const goY = renderPosition.y;
        const renderDimension = gor.dimension;
        const goWidth = renderDimension.width;
        const goHeight = renderDimension.height;
        if ((x >= goX) && (x <= goX + goWidth) && (y >= goY)
            && (y <= goY + goHeight)) {
          const anim = gor.currentAnimation;
          if (anim == null) continue;
          const img = anim.image;
          const offscreenCanvas = new OffscreenCanvas(goWidth, goHeight);
          const offscreenCanvasContext = offscreenCanvas.getContext('2d');
          offscreenCanvasContext.drawImage(img, 0, 0);
          const imageData = offscreenCanvasContext.getImageData(0, 0, goWidth, goHeight);
          const pixelsArray = imageData.data;
          const imageX = x - goX;
          const imageY = y - goY;
          const alphaIndex = (imageY * goWidth + imageX) * 4 + 3;
          const alphaComponent = pixelsArray[alphaIndex];
          if (alphaComponent > 200 && (picked == null || picked.z <= go.z)) {
            picked = go;
            
          }
        }
      }
    }
    return picked;
  }


  showView() {
    super.showView();
    if (!this.initialized) {
      this.titleBarVisible = false;
      const canvas = document.createElement("canvas");
      canvas.width = mainContainerElement().offsetWidth;
      canvas.height = mainContainerElement().offsetHeight;
      this.containerDiv.append(canvas);
      canvas.style.display = 'none';
      this.#independentCanvas = new IndependentCanvas();
      this.#independentCanvas.canvas = canvas;
      this.#independentCanvas.context = canvas.getContext('2d');
      canvas.addEventListener("mousemove", (event) => {
        const mouseMoveArg = new MouseMoveArg();
        mouseMoveArg.sender = this.pickObject(event.offsetX, event.offsetY);
        mouseMoveArg.mousePosition = new Point(event.offsetX, event.offsetY);
        this.baseGameView.mouseMoved(mouseMoveArg);
      });
      canvas.addEventListener("click", (event) => {
        const clickedArg = new ClickedArg();
        clickedArg.sender = this.pickObject(event.offsetX, event.offsetY);
        clickedArg.mousePosition = new Point(event.offsetX, event.offsetY);
        this.baseGameView.mouseClicked(clickedArg);
      });
      this.initialized = true;
    
      //this.progressInfoPanel = new ProgressInfoPanel();
      //this.mdiMainView
      //    .addActivatedListener((sender, data) => {
      //        //this.gamePanel.setAllowRepaint(true);
      //    });
      //mdiMainView
      //    .addDeactivatedListener((sender, data) => {
      //        //gamePanel.setAllowRepaint(false);
      //    });
    }
  }

  reloadResources() {
    const scale = this.calculateScale();
    if (this.#firstInit) {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }
    let worker = null;
    if ((this.baseGameView instanceof RoomView)
        && (!this.resourcesLoaded[GameView.ROOM_LOAD_WORKER])) {
      worker = new RoomLoadWorker(this.resourceManager, scale, PetType.CAT);
      worker.process = this.processLoadWorker.bind(this);
      worker.done = function() {
        this.resourcesLoaded[GameView.ROOM_LOAD_WORKER] = true;
        this.loadResourcesDone(this);
      }.bind(this);
    }
    else if ((this.baseGameView instanceof TownView)
        && (!this.resourcesLoaded[GameView.TOWN_LOAD_WORKER])) {
      worker = new TownLoadWorker(this.resourceManager, scale, PetType.CAT);
      worker.process = this.processLoadWorker.bind(this);
      worker.done = function() {
        this.resourcesLoaded[GameView.TOWN_LOAD_WORKER] = true;
        this.loadResourcesDone(this);
      }.bind(this);
    }
    else if ((this.baseGameView instanceof TreasuryView)
        && (!this.resourcesLoaded[GameView.TREASURY_LOAD_WORKER])) {
      worker = new TreasuryLoadWorker(this.resourceManager, scale, PetType.CAT);
      worker.process = this.processLoadWorker.bind(this);
      worker.done = function () {
        this.resourcesLoaded[GameView.TREASURY_LOAD_WORKER] = true;
        this.loadResourcesDone(this);
      }.bind(this);
    } if ((this.baseGameView instanceof DressingRoomView)
        && (!this.resourcesLoaded[GameView.DRESSING_ROOM_LOAD_WORKER])) {
      worker = new DressingRoomLoadWorker(this.resourceManager, scale,
          PetType.CAT);
      worker.process = this.processLoadWorker.bind(this);
      worker.done = function() {
        this.resourcesLoaded[GameView.DRESSING_ROOM_LOAD_WORKER] = true;
        this.loadResourcesDone(this);
      }.bind(this);
    }
    else if ((this.baseGameView instanceof RubbishView)
        && (!this.resourcesLoaded[GameView.RUBBISH_LOAD_WORKER])) {
      worker = new RubbishLoadWorker(this.resourceManager, scale, PetType.CAT);
      worker.process = this.processLoadWorker.bind(this);
      worker.done = function() {
        this.resourcesLoaded[GameView.RUBBISH_LOAD_WORKER] = true;
        this.loadResourcesDone(this);
      }.bind(this);
    } else if ((this.baseGameView instanceof AfternoonTeaView)
        && (!this.resourcesLoaded[GameView.AFTERNOONTEA_LOAD_WORKER])) {
      worker = new AfternoonTeaLoadWorker(this.resourceManager, scale,
          PetType.CAT);
      worker.process = this.processLoadWorker.bind(this);
      worker.done = function() {
        this.resourcesLoaded[GameView.AFTERNOONTEA_LOAD_WORKER] = true;
        this.loadResourcesDone(this);
      }.bind(this);
    }
    this.progressInfoPanel.progressInfo = new ProgressInfo(0, '');
    this.progressInfoPanel.showView();
    this.#independentCanvas.canvas.style.display = 'none';
    if (worker != null) {
      this.baseGameView.allowDraw = false;
      worker.loadResourcesInBackground();
    } else {
      this.loadResourcesDone(null);
    }
  }

  processLoadWorker(progressInfoList) {
    const lastProgressInfo = progressInfoList[progressInfoList.length - 1];
    if (lastProgressInfo != null) {
      this.progressInfoPanel.progressInfo = lastProgressInfo;
    }
  }

  loadResourcesDone(worker) {
    console.debug('Load resources done');
    this.progressInfoPanel.hideView();
    this.#independentCanvas.canvas.style.display = 'block';
    //try {
    //  if (worker != null) {
    //    worker.get();
    //  }
    //  progressInfoPanel.setVisible(false);
    //  setResizable(true);
    //  boolean firstInit = false;
    //  if (gamePanel.getParent() == null) {
    //    firstInit = true;
    //    // gamePanel.initialize();
    //    add(gamePanel);
    //    // gamePanel.setMessageSource(messageSource);
    //  }
//
     // // gamePanel.setResourceManager(resourceManager);
      //gamePanel.setScale(scale);
     // int w = getContentPane().getWidth();
     // int h = getContentPane().getHeight();
    //  gamePanel.setLocation((int) (w / 2 - scale * ORIGINAL_WIDTH / 2),
    //      (int) (h / 2 - scale * ORIGINAL_HEIGHT / 2));
    //  gamePanel.setSize((int) (scale * ORIGINAL_WIDTH),
    //      (int) (scale * ORIGINAL_HEIGHT));
   this.baseGameView.scale = this.scale;
   this.#independentCanvas.scale = this.scale;
   this.reloadImages();
   this.start();
   this.baseGameView.allowDraw = true;
   if (this.#firstInit) {
     this.fireInitializationCompleted();
   }
   //} catch (Exception ex) {
   //   log.error("loadResources done processing error.", ex);
   //   String message = messageSource.getMessage(StringConstants.ERROR,
   //       null, null) + ": " + ex.toString();
   //   trayIcon.showTrayMessage(message, MessageType.ERROR);
//
   //  }
  }

  reloadImages() {
    this.baseGameView.reloadImages();
  }

    
  start() {
    this.baseGameView.start();
  }


  fireInitializationCompleted() {
    console.debug('fireInitializationCompleted.');
    this.baseGameView.fireInitializationCompleted();
    this.#firstInit = false;
    this.timer = setInterval(this.step.bind(this), 1000 / 60);
  }


  pause() {
    this.baseGameView.pause();
  }

  release() {
    baseGameView.release();
  }
    


  step() {
    this.baseGameView.step();
    if (this.baseGameView.allowDraw) {
      this.baseGameView.draw(this.#independentCanvas);
            
      //revalidate();
    }
  }
    
  calculateScale() {
    this.scale = mainContainerScale;
    this.#independentCanvas.scale = this.scale;
    console.debug('calculatedScale = %f, canvas = %o', this.scale, this.#independentCanvas);
    return this.scale;
  }

  
//  @Override
//  public void componentResized(ComponentEvent e) {
//    if (gamePanel != null) {
//      gamePanel.pause();
//    }
//    if (reloadResourcesTimer == null) {
//      reloadResourcesTimer = new Timer(5000, new ActionListener() {
//
//        @Override
//        public void actionPerformed(ActionEvent e) {
//          for (int n = 0; n < resourcesLoaded.length; n++) {
//            resourcesLoaded[n] = false;
//          }
//          resourceManager.removeResetInScaleResources();
//          reloadResources();
//        }
//      });
//      reloadResourcesTimer.setRepeats(false);
//      reloadResourcesTimer.start();
//    } else {
//      if (reloadResourcesTimer.isRunning()) {
//        reloadResourcesTimer.stop();
//      }
//      reloadResourcesTimer.start();
//    }
//
//  }

  showRoom() {
    this.baseGameView = new RoomView();
    this.baseGameView.viewImplFactory = this.viewImplFactory;
    this.#firstInit = true;
    return this.baseGameView;
  }

  showTown() {
    this.baseGameView = new TownView();
    this.baseGameView.viewImplFactory = this.viewImplFactory;
    this.#firstInit = true;
    return this.baseGameView;
  }


  showTreasury() {
    this.baseGameView = new TreasuryView();
    this.baseGameView.viewImplFactory = this.viewImplFactory;
    this.#firstInit = true;
    return this.baseGameView;
  }

  showRubbish(rubbishView) {
    this.baseGameView = new RubbishView();
    this.baseGameView.viewImplFactory = this.viewImplFactory;
    this.#firstInit = true;
    return this.baseGameView;
  }

  showAfternoonTea(afternoonTeaView) {
    this.baseGameView = new AfternoonTeaView();
    this.baseGameView.viewImplFactory = this.viewImplFactory;
    this.#firstInit = true;
    return this.baseGameView;
  }

  showDressingRoom(dressingRoomView) {
    this.baseGameView = new DressingRoomView();
    this.baseGameView.viewImplFactory = this.viewImplFactory;
    this.#firstInit = true;
    return this.baseGameView;
  }



//  private void releaseGamePanel() {
//    final GamePanel lastGamePanel = gamePanel;
//    SwingUtilities.invokeLater(new Runnable() {
//
//      @Override
//      public void run() {
//        lastGamePanel.release();
//      }
//    });
//  }

}

