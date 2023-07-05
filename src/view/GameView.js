import RoomLoadWorker from '../resources/RoomLoadWorker.js';
import ProgressInfo from '../resources/ProgressInfo.js';

import MouseMoveArg from '../domain/MouseMoveArg.js';
import ClickedArg from '../domain/ClickedArg.js';
import Point from '../domain/Point.js';
import HighlightGameObject from '../domain/HighlightGameObject.js';

import PetType from '../rest/domain/PetType.js';

import IndependentCanvas from './component/IndependentCanvas.js';
import GameObjectRender from './component/GameObjectRender.js';
import ProgressInfoPanel from './component/ProgressInfoPanel.js';

import RoomView from './RoomView.js';


export default class GameView {

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
  #progressInfoPanel;
  
  baseGameView;
  timer;
  viewImplFactory;
  
  #firstInit = true;
    
  constructor() {
    const canvas = document.getElementById("canvas");
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
	this.#progressInfoPanel = new ProgressInfoPanel(canvas.clientWidth, canvas.clientHeight);
	this.#progressInfoPanel.element.style.display = 'none';
	document.body.append(this.#progressInfoPanel.element);
  }
  
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
    if (!this.initialized) {
      //this.progressInfoPanel = new ProgressInfoPanel();
      //this.mdiMainView
      //    .addActivatedListener((sender, data) => {
      //        //this.gamePanel.setAllowRepaint(true);
      //    });
      //mdiMainView
      //    .addDeactivatedListener((sender, data) => {
      //        //gamePanel.setAllowRepaint(false);
      //    });
    } else {
      //if ((getWidth() == 0) || (getHeight() == 0)) {
      //  defaultSizeAndLocation();
      //}
    }
  }

  reloadResources() {
    const scale = this.calculateScale();
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
    //else if ((gamePanel.getBaseGameView() instanceof TownView)
    //    && (!resourcesLoaded[TOWN_LOAD_WORKER])) {
    //  worker = new TownLoadWorker(resourceManager, scale, PetType.CAT) {
    //    @Override
    //    protected void process(List<ProgressInfo> progressInfoList) {
    //      processLoadWorker(progressInfoList);
    //    }
//
  //      public void done() {
    //      resourcesLoaded[TOWN_LOAD_WORKER] = true;
    //      loadResourcesDone(this);
    //    }
    //  };
    //} else if ((gamePanel.getBaseGameView() instanceof TreasuryView)
    //    && (!resourcesLoaded[TREASURY_LOAD_WORKER])) {
    //  worker = new TreasuryLoadWorker(resourceManager, scale, PetType.CAT) {
    //    @Override
    //    protected void process(List<ProgressInfo> progressInfoList) {
    //      processLoadWorker(progressInfoList);
    //    }
//
  //      public void done() {
  //        resourcesLoaded[TREASURY_LOAD_WORKER] = true;
  //        loadResourcesDone(this);
  //      }
  //    };
  //  } else if ((gamePanel.getBaseGameView() instanceof DressingRoomView)
  //      && (!resourcesLoaded[DRESSING_ROOM_LOAD_WORKER])) {
//      worker = new DressingRoomLoadWorker(resourceManager, scale,
//          PetType.CAT) {
//        @Override
//        protected void process(List<ProgressInfo> progressInfoList) {
//          processLoadWorker(progressInfoList);
//        }
//
//        public void done() {
 //         resourcesLoaded[DRESSING_ROOM_LOAD_WORKER] = true;
//          loadResourcesDone(this);
//        }
//      };
//    } else if ((gamePanel.getBaseGameView() instanceof RubbishView)
//        && (!resourcesLoaded[RUBBISH_LOAD_WORKER])) {
//      worker = new RubbishLoadWorker(resourceManager, scale, PetType.CAT) {
//        @Override
//        protected void process(List<ProgressInfo> progressInfoList) {
//          processLoadWorker(progressInfoList);
//        }
//
//        public void done() {
//          resourcesLoaded[RUBBISH_LOAD_WORKER] = true;
//          loadResourcesDone(this);
//        }
//      };
//
//    } else if ((gamePanel.getBaseGameView() instanceof AfternoonTeaView)
//        && (!resourcesLoaded[AFTERNOONTEA_LOAD_WORKER])) {
//      worker = new AfternoonTeaLoadWorker(resourceManager, scale,
//          PetType.CAT) {
//        @Override
//        protected void process(List<ProgressInfo> progressInfoList) {
//          processLoadWorker(progressInfoList);
//        }
//
//        public void done() {
//          resourcesLoaded[AFTERNOONTEA_LOAD_WORKER] = true;
//          loadResourcesDone(this);
//        }
//      };
//
//    }
    this.#progressInfoPanel.progressInfo = new ProgressInfo(0, '');
    this.#progressInfoPanel.element.style.display = 'block';
    this.#independentCanvas.canvas.style.display = 'none';
    if (worker != null) {
      worker.loadResourcesInBackground();
    } else {
      loadResourcesDone(null);
    }
  }

  processLoadWorker(progressInfoList) {
    const lastProgressInfo = progressInfoList[progressInfoList.length - 1];
    if (lastProgressInfo != null) {
      this.#progressInfoPanel.progressInfo = lastProgressInfo;
    }
  }

  loadResourcesDone(worker) {
    console.debug('Load resources done');
    this.#progressInfoPanel.element.style.display = 'none';
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
   this.allowRepaint = true;
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
	const width = this.#independentCanvas.canvas.clientWidth;
    const height = this.#independentCanvas.canvas.clientHeight;
    const xScale = width / GameView.ORIGINAL_WIDTH;
    const yScale = height / GameView.ORIGINAL_HEIGHT;
    this.scale = Math.min(xScale, yScale);
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
    this.reloadResources();
    return this.baseGameView;
  }

//  @Override
//  public TownView showTown(TownView townView) {
//
//    if (gamePanel != null) {
//      this.getContentPane().remove(gamePanel);
//      releaseGamePanel();
//    }
//    gamePanel = new GamePanel(townView);
//    gamePanel.setResourceManager(this.resourceManager);
//    reloadResources();
//    return (TownView) townView;
//  }

//  @Override
//  public TreasuryView showTreasury(TreasuryView treasuryView) {
//    if (gamePanel != null) {
//      this.getContentPane().remove(gamePanel);
//      releaseGamePanel();
//    }
//    gamePanel = new GamePanel(treasuryView);
//    reloadResources();
//    return (TreasuryView) gamePanel.getBaseGameView();
//  }

//  @Override
//  public RubbishView showRubbish(RubbishView rubbishView) {
//    if (gamePanel != null) {
//      this.getContentPane().remove(gamePanel);
//      releaseGamePanel();
//    }
//    gamePanel = new GamePanel(rubbishView);
//    reloadResources();
//    return (RubbishView) gamePanel.getBaseGameView();
//  }

//  @Override
//  public AfternoonTeaView showAfternoonTea(AfternoonTeaView afternoonTeaView) {
//    if (gamePanel != null) {
//      this.getContentPane().remove(gamePanel);
//      releaseGamePanel();
//    }
//    gamePanel = new GamePanel(afternoonTeaView);
//    reloadResources();
//    return (AfternoonTeaView) gamePanel.getBaseGameView();
//  }

//  @Override
//  public DressingRoomView showDressingRoom(DressingRoomView dressingRoomView) {
//    if (gamePanel != null) {
//      this.getContentPane().remove(gamePanel);
//      releaseGamePanel();
//    }
//    gamePanel = new GamePanel(dressingRoomView);
//    reloadResources();
//    return (DressingRoomView) gamePanel.getBaseGameView();
//  }

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

