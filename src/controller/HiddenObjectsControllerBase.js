// domain
import LabelGameObject from '../domain/LabelGameObject.js';
import GameObject from '../domain/GameObject.js';
import Point from '../domain/Point.js';
import Dimension from '../domain/Dimension.js';
import TreasuryData from '../domain/TreasuryData.js';
import HighlightGameObject from '../domain/HighlightGameObject.js';
import HiddenObjectsGameData from '../domain/HiddenObjectsGameData.js';
import MessageBoxGameObject from '../domain/MessageBoxGameObject.js';
import MessageBoxInnerGameObject from '../domain/MessageBoxInnerGameObject.js';


//rest
import FoodType from '../rest/domain/FoodType.js';
import DrinkType from '../rest/domain/DrinkType.js';
import BuildingMaterialType from '../rest/domain/BuildingMaterialType.js';
import JoinHiddenObjectsGameArg from '../rest/domain/JoinHiddenObjectsGameArg.js';
import CollectObjectArg from '../rest/domain/CollectObjectArg.js';

// resources
import ResourceManager from '../resources/ResourceManager.js';

// localization
import StringConstants from '../localization/StringConstants.js';
import MessageSource from '../localization/MessageSource.js';

// rest
import BackgroundWork from '../rest/multithreading/BackgroundWork.js';
import ConnectionExceptionSettings from '../rest/multithreading/ConnectionExceptionSettings.js';

// tray icon
import MessageType from '../trayicon/MessageType.js';

// controller
import BaseGameController from './BaseGameController.js';

export default class HiddenObjectsControllerBaseImpl extends BaseGameController {

  gameController;
  hiddenObjectsService;
  
  hiddenObjectsGameData;
  hiddenObjectsGameType;
  
  showView() {
    // TODO Auto-generated method stub

  }

  hideView() {
    // TODO Auto-generated method stub

  }

  initialize() {
    this.baseGameView.addInitializationCompletedListener((sender, data) => {
      this.joinGame(null);
    });

    this.initializeHiddenObjects();

    const interfaceObject = new GameObject();
    interfaceObject.step = function() {
        Object.getPrototypeOf(interfaceObject).step()
        const position = interfaceObject.position;
        const pets = this.hiddenObjectsGameData.pets;
        const visibleObjectsIcons = this.hiddenObjectsGameData.visibleObjectsIcons;
        if (this.hiddenObjectsGameData.interfaceVisible) {
          if (position.y > TreasuryData.ORIGINAL_INTERFACE_OBJECT_Y) {
            position.y = position.y - TreasuryData.INTERFACE_OBJECT_MOVE_STEP;
            if (visibleObjectsIcons != null) {
              for (let n = 0; n < visibleObjectsIcons.length; n++) {
                const go = visibleObjectsIcons[n];
                if (go != null) {
                  go.position.y = go.position.y
                      - TreasuryData.INTERFACE_OBJECT_MOVE_STEP;
                }
              }
              for (let n = 0; n < pets.length; n++) {
                const go = pets[n];
                if (go != null) {
                  go.position.y = go.position.y
                      - TreasuryData.INTERFACE_OBJECT_MOVE_STEP;
                }
              }
            }
            if (position.y <= TreasuryData.ORIGINAL_INTERFACE_OBJECT_Y) {
              this.hiddenObjectsGameData.hideInterfaceButton.visible = true;
              position.y = TreasuryData.ORIGINAL_INTERFACE_OBJECT_Y;
              if (visibleObjectsIcons != null) {
                for (let n = 0; n < visibleObjectsIcons.length; n++) {
                  const go = visibleObjectsIcons[n];
                  if (go != null) {
                    go.position.y = TreasuryData.ORIGINAL_OBJECT_FOR_SEARCH_Y;
                  }
                }
                for (let n = 0; n < pets.length; n++) {
                  const go = pets[n];
                  if (go != null) {
                    go.position.y = TreasuryData.ORIGINAL_PLAYER_ICON_1_Y;
                  }
                }
              }
            }
          }
        } else {
          if (position.y < 600) {
            position.y = position.y + TreasuryData.INTERFACE_OBJECT_MOVE_STEP;
            if (visibleObjectsIcons != null) {
              for (let n = 0; n < visibleObjectsIcons.length; n++) {
                const go = visibleObjectsIcons[n];
                if (go != null) {
                  position.y = position.y
                      + TreasuryData.INTERFACE_OBJECT_MOVE_STEP;
                }
              }
              for (let n = 0; n < pets.length; n++) {
                const go = pets[n];
                if (go != null) {
                  go.position.y = go.position.y
                      + TreasuryData.INTERFACE_OBJECT_MOVE_STEP;
                }
              }
            }
            if (position.y >= 600) {
              this.hiddenObjectsGameData.showInterfaceButton.visible = true;
            }
          }
        }
    }.bind(this);
    interfaceObject.position = new Point(TreasuryData.ORIGINAL_INTERFACE_OBJECT_X, 600);
    interfaceObject.animationImageIds = [[ ResourceManager.IMAGE_TREASURY_INTERFACE ]];
    interfaceObject.addMouseMoveListener((mouseMoveArg) => {
        this.baseGameView.showDefaultCursor();
        this.baseGameView.toolTipText = "";
        this.highlightObject = null;
      });
    this.addGameObject(interfaceObject);
    this.hiddenObjectsGameData.interfaceObject = interfaceObject;

    this.initializeHiddenObjectsIcons();

    const pets = new Array(4);
    pets[0] = this.initializePlayerIcon(TreasuryData.ORIGINAL_PLAYER_ICON_1_X,
        TreasuryData.ORIGINAL_PLAYER_ICON_1_Y,
        ResourceManager.IMAGE_TREASURY_PLAYER_ICON_1);
    pets[1] = this.initializePlayerIcon(TreasuryData.ORIGINAL_PLAYER_ICON_2_X,
        TreasuryData.ORIGINAL_PLAYER_ICON_2_Y,
        ResourceManager.IMAGE_TREASURY_PLAYER_ICON_2);
    pets[2] = this.initializePlayerIcon(TreasuryData.ORIGINAL_PLAYER_ICON_3_X,
        TreasuryData.ORIGINAL_PLAYER_ICON_3_Y,
        ResourceManager.IMAGE_TREASURY_PLAYER_ICON_3);
    pets[3] = this.initializePlayerIcon(TreasuryData.ORIGINAL_PLAYER_ICON_4_X,
        TreasuryData.ORIGINAL_PLAYER_ICON_4_Y,
        ResourceManager.IMAGE_TREASURY_PLAYER_ICON_4);
    this.hiddenObjectsGameData.pets = pets;

    const hideInterfaceButton = new HighlightGameObject();
    hideInterfaceButton.position = new Point(TreasuryData.ORIGINAL_HIDE_INTERFACE_BUTTON_X, TreasuryData.ORIGINAL_HIDE_INTERFACE_BUTTON_Y);
    
    hideInterfaceButton.animationImageIds = [[ ResourceManager.IMAGE_TREASURY_HIDE_INTERFACE_BUTTON ], [ ResourceManager.IMAGE_TREASURY_HIDE_INTERFACE_BUTTON_HIGHLIGHT ]];
    hideInterfaceButton.addMouseMoveListener((mouseMoveArg) => {
        this.baseGameView.showHandCursor();
        this.baseGameView.toolTipText = "";
        this.highlightObject = hideInterfaceButton;
      });
    hideInterfaceButton.addClickedListener((clickedArg) => {
        this.hiddenObjectsGameData.interfaceVisible = false;
        this.hiddenObjectsGameData.hideInterfaceButton.visible = false;
      });
    hideInterfaceButton.visible = false;
    this.addGameObject(hideInterfaceButton);
    this.hiddenObjectsGameData.hideInterfaceButton = hideInterfaceButton;

    const showInterfaceButton = new HighlightGameObject();
    showInterfaceButton.position = new Point(TreasuryData.ORIGINAL_SHOW_INTERFACE_BUTTON_X, TreasuryData.ORIGINAL_SHOW_INTERFACE_BUTTON_Y);
    
    showInterfaceButton.animationImageIds = [[ ResourceManager.IMAGE_TREASURY_SHOW_INTERFACE_BUTTON], [ ResourceManager.IMAGE_TREASURY_SHOW_INTERFACE_BUTTON_HIGHLIGHT ]];
    showInterfaceButton.addMouseMoveListener((mouseMoveArg) => {
        this.baseGameView.showHandCursor();
        this.baseGameView.toolTipText = "";
        this.highlightObject = showInterfaceButton;
      });
    showInterfaceButton.addClickedListener((clickedArg) => {
        this.hiddenObjectsGameData.interfaceVisible = true;
        showInterfaceButton.visible = false;
        interfaceObject.position.y = 600;
      });
    showInterfaceButton.visible = false;
    this.addGameObject(showInterfaceButton);
    this.hiddenObjectsGameData.showInterfaceButton = showInterfaceButton;

//    GameObject messageBox = new GameObject() {
//      @Override
//      public void step() {
//        super.step();
//        Point position = getPosition();
//        if (isVisible()) {
//          if (this.getY() < ORIGINAL_MESSAGE_BOX_Y) {
//            this.setY(this.getY() + MESSAGE_BOX_MOVE_STEP);
//            if (this.getY() >= ORIGINAL_MESSAGE_BOX_Y) {
//              this.setY(ORIGINAL_MESSAGE_BOX_Y);
//              messageBoxButton.setVisible(true);
//              if (situation == Situation.GAME_OVER) {
//                logger.info("reward = "
//                    + hiddenObjectsGame.getReward());
//                FoodType foodType = hiddenObjectsGame
//                    .getReward().getFood();
//                logger.info("foodType = " + foodType);
//                int foodIndex = foodType.ordinal();
//                logger.info("foodIndex = " + foodIndex);
//                logger.info("foodIcons[foodIndex] = "
//                    + foodIcons[foodIndex]);
//                foodIcons[foodIndex].setVisible(true);
//                Integer clothId = hiddenObjectsGame.getReward()
//                    .getClothId();
//                if (clothId != null) {
//                  GameObject clothGameObject = clothObjects
//                      .get(clothId);
//                  clothGameObject.setVisible(true);
//                }
//              }
//            }
//          }
//        }
//      }
//    };
//    messageBox.setX(ORIGINAL_MESSAGE_BOX_X);
//    messageBox.setY(-600);
//    imgids = new int[1][];
//    imgids[0] = new int[1];
//    imgids[0][0] = ResourceManager.IMAGE_TREASURY_MESSAGE_BOX;
//    messageBox.setAnimationImageIds(imgids);
//    messageBox.addMouseMoveListener(new MouseMoveListener() {
//      @Override
//      public void mouseMove(MouseMoveArg arg) {
//        showDefaultCursor();
//        setToolTipText("");
//        setHighlightObject(null);
//      }
//    });
//    addGameObject(messageBox);
//
//    messageBoxButton = new GameObject();
//    messageBoxButton.setX(ORIGINAL_MESSAGE_BOX_BUTTON_X);
//    messageBoxButton.setY(ORIGINAL_MESSAGE_BOX_BUTTON_Y);
//    imgids = new int[2][];
//    imgids[0] = new int[1];
//    imgids[0][0] = ResourceManager.IMAGE_TREASURY_MESSAGE_BOX_BUTTON;
//    imgids[1] = new int[1];
//    imgids[1][0] = ResourceManager.IMAGE_TREASURY_MESSAGE_BOX_BUTTON_HIGHLIGHT;
//    messageBoxButton.setAnimationImageIds(imgids);
//    messageBoxButton.addMouseMoveListener(new MouseMoveListener() {
//      @Override
//      public void mouseMove(MouseMoveArg arg) {
//        showHandCursor();
//        setToolTipText("");
//        setHighlightObject(messageBoxButton);
//      }
//    });
//    messageBoxButton.addClickedListener(new ClickedListener() {
//      @Override
//      public void clicked(ClickedArg arg) {
//        switch (situation) {
//        case COLLECT_PLAYERS:
//          showHowToPlayMessage();
//          fireStartGameEvent();
//          break;
//        case HOW_TO_PLAY_MESSAGE:
//          startPlay();
//          break;
//        case GAME_OVER:
//          fireToTownEvent();
//          break;
//        default:
//          break;
//        }
//      }
//    });
//    messageBoxButton.setVisible(false);
//    addGameObject(messageBoxButton);

    const waitingPlayers1Message = this.messageSource.getMessage(
        StringConstants.HIDDEN_OBJECTS_WAITING_PLAYERS_1, null, null);
    const waitingPlayers2Message = this.messageSource.getMessage(
        StringConstants.HIDDEN_OBJECTS_WAITING_PLAYERS_2, null, null);

    this.hiddenObjectsGameData.waitingPlayers1Message = waitingPlayers1Message;
    this.hiddenObjectsGameData.waitingPlayers2Message = waitingPlayers2Message;

    this.initializeMessageBox();
    const waitingPlayerNameLabels = new Array(TreasuryData.MAX_PLAYERS_COUNT);
    this.hiddenObjectsGameData.waitingPlayerNameLabels = waitingPlayerNameLabels;
    for (let n  = 0; n < waitingPlayerNameLabels.length; n++) {
      const lgo = new LabelGameObject();
      lgo.text = this.messageSource.getMessage(StringConstants.HIDDEN_OBJECTS_WAITING_PLAYER, null, null);
      this.addGameObject(lgo);
      lgo.z = BaseGameController.MENU_Z_ORDER + 1;
      lgo.visible = false;
      waitingPlayerNameLabels[n] = lgo;
    }
    
    this.initializeFoodIcons();
    const clothGameObjects = this.initializeClothGameObjects();
    for (let [key, value] of clothGameObjects.entries()) {
      const cgo = value;
      cgo.visible = false;
      cgo.position = new Point(TreasuryData.ORIGINAL_CLOTH_REWARD_X,
          TreasuryData.ORIGINAL_CLOTH_REWARD_Y);
      cgo.z = BaseGameController.MENU_Z_ORDER;
    }
    this.hiddenObjectsGameData.clothObjects = clothGameObjects;
    const bookGameObjects = this.initializeBookGameObjects();
    for (let [key, bgo] of bookGameObjects.entries()) {
      bgo.visible = false;
      bgo.position = new Point(TreasuryData.ORIGINAL_CLOTH_REWARD_X,
          TreasuryData.ORIGINAL_CLOTH_REWARD_Y);
      bgo.z = BaseGameController.MENU_Z_ORDER;
    }
    this.hiddenObjectsGameData.bookObjects = bookGameObjects;
    
    this.initializeDrinkIcons();
    
    const clockLabel = new LabelGameObject();
    clockLabel.step = () => {
      clockLabel.text = this. hiddenObjectsGameData.secondsLeftString;
    };
    clockLabel.z = BaseGameController.MENU_Z_ORDER;
    this.addGameObject(clockLabel);
    clockLabel.position = new Point(TreasuryData.ORIGINAL_CLOCK_LABEL_X, TreasuryData.ORIGINAL_CLOCK_LABEL_Y);
    this.hiddenObjectsGameData.clockLabel = clockLabel;
    
    this.initializeRucksack();
    this.rucksack.visible = false;
    this.initializeLevelInfo();
    this.levelInfo.visible = false;
    this.initializeAchievementInfo();
  }

//  private class CollectObjectBackgroundWork extends BackgroundWork<CollectObjectArg, HiddenObjectsGame, Object> {
//    @Override
//    public HiddenObjectsGame doInBackground() throws Exception {
//      return hiddenObjectsService.collectObject(getArgument());
//    }
//    
//    @Override
//    public void completed(HiddenObjectsGame result) {
//    }
//    
//    @Override
//    public void failed(Exception ex) {
//      HiddenObjectsControllerBaseImpl.this.hiddenObjectsGameData.getHiddenObjects()[getArgument().getObjectId()].setVisible(true);
//      logger.error("CollectObjectBackgroundWork failed.", ex);
//      String message = messageSource.getMessage(StringConstants.ERROR, null, null)
//          + ": " + ex.toString();
//      trayIcon.showTrayMessage(message, MessageType.ERROR);
//    }
//  }
  
  collectObject(collectObjectArg) {
    const work = new BackgroundWork();
    work.doInBackground = () => {
      return this.hiddenObjectsService.collectObject(work.argument);
    };
    work.completed = () => {};
    work.failed = (exception) => {
      this.hiddenObjectsGameData.hiddenObjects[work.argument.objectId].visible = true;
      console.error("CollectObjectBackgroundWork failed.", ex);
      const message = this.messageSource.getMessage(StringConstants.ERROR, null, null)
          + ": " + exception;
      this.trayIcon.showTrayMessage(message, MessageType.ERROR);
    };
    work.argument = collectObjectArg;
    const ces = new ConnectionExceptionSettings();
    ces.restart = false;
    work.connectionExceptionSettings = ces;
    this.backgroundWorkManager.startBackgroundWork(work);
  }

//  private class StartGameWork extends BackgroundWork<Void, HiddenObjectsGame, Object> {
//    @Override
//    public HiddenObjectsGame doInBackground() throws Exception {
//      return hiddenObjectsService.startGame();
//    }
//    
//    @Override
//    public void completed(HiddenObjectsGame result) {
//      startGame(result);
//    }
//    
//    @Override
//    public void failed(Exception ex) {
//      logger.error("StartGameBackgroundWork failed.", ex);
//      String message = messageSource.getMessage(StringConstants.ERROR, null, null)
//          + ": " + ex.toString();
//      trayIcon.showTrayMessage(message, MessageType.ERROR);
//    }
//  }
  
  startGame(argument) {
    const work = new BackgroundWork();
    work.doInBackground = () => {
      return this.hiddenObjectsService.startGame();
    };
    work.completed = (hiddenObjectsGame) => {
    };
    work.failed = (exception) => {
      console.error("StartGameBackgroundWork failed.", ex);
      const message = this.messageSource.getMessage(StringConstants.ERROR, null, null)
          + ": " + exception;
      this.trayIcon.showTrayMessage(message, MessageType.ERROR);
    };
    work.argument = argument;
    const ces = new ConnectionExceptionSettings();
    ces.restart = false;
    work.connectionExceptionSettings = ces;
    this.backgroundWorkManager.startBackgroundWork(work);
  }
  
  onTimer() {
    return this.hiddenObjectsService.getGameInfo();
  }
  
  onTimerCompleted(hiddenObjectsGame) {
      if (hiddenObjectsGame.gameOver) {
        this.updateGameInfo(hiddenObjectsGame);
        this.stopTimer();
      } else if (hiddenObjectsGame.gameStarted) {
        this.updateGameInfo(hiddenObjectsGame);
      } else {
        this.showCollectPlayers(hiddenObjectsGame);
      }
  }

//  private class GetGameInfoWork extends BackgroundWork<Void, HiddenObjectsGame, Object> {
//    @Override
//    public HiddenObjectsGame doInBackground() throws Exception {
//      Thread.sleep(1000);
//      return hiddenObjectsService.getGameInfo();
//    }
//    
//    @Override
//    public void completed(HiddenObjectsGame result) {
//      if (result.isGameOver()) {
//        updateGameInfo(result);
//      } else if (result.isGameStarted()) {
//        updateGameInfo(result);
//        getGameInfo(getArgument());
//      } else {
//        showCollectPlayers(result);
//        getGameInfo(getArgument());
//      }
//    }
//    
//    @Override
//    public void failed(Exception ex) {
//      logger.error("GetGameInfoWork failed.", ex);
//      String message = messageSource.getMessage(StringConstants.ERROR, null, null)
//          + ": " + ex.toString();
//      trayIcon.showTrayMessage(message, MessageType.ERROR); 
//    }
//  }
  
//  private class JoinGameBackgroundWork extends BackgroundWork<Void, HiddenObjectsGame, Object> {
//
//    @Override
//    public HiddenObjectsGame doInBackground() throws Exception {
//      JoinHiddenObjectsGameArg arg = new JoinHiddenObjectsGameArg();
//      arg.setHiddenObjectsGameType(getHiddenObjectsGameType());
//      return hiddenObjectsService.joinGame(arg);
//    }
//    
//    @Override
//    public void completed(HiddenObjectsGame result) {
//      showCollectPlayers(result);
//      getGameInfo(null);
//    }
//    
//    @Override
//    public void failed(Exception ex) {
//      logger.error("JoinGameBackgroundWork failed.", ex);
//      String message = messageSource.getMessage(StringConstants.ERROR, null, null)
//          + ": " + ex.toString();
//      trayIcon.showTrayMessage(message, MessageType.ERROR); 
//    }
//  }
  
  joinGame(argument) {
    const work = new BackgroundWork();
    work.doInBackground = () => {
      const arg = new JoinHiddenObjectsGameArg();
      arg.hiddenObjectsGameType = this.hiddenObjectsGameType;
      return this.hiddenObjectsService.joinGame(arg);
    };
    work.completed = (hiddenObjectsGame) => {
      this.showCollectPlayers(hiddenObjectsGame);
      this.startTimer();
    };
    work.failed = (exception) => {
      console.error("JoinGameBackgroundWork failed %o.", exception);
      const message = this.messageSource.getMessage(StringConstants.ERROR, null, null)
          + ": " + exception;
      this.trayIcon.showTrayMessage(message, MessageType.ERROR); 
    };
    work.argument = argument;
    const ces = new ConnectionExceptionSettings();
    ces.restart = false;
    work.connectionExceptionSettings = ces;
    this.backgroundWorkManager.startBackgroundWork(work);
  }
  
//  #getGameInfoInner(argument) {
//    const work = new BackgroundWork();
//    work.doInBackground = () => {
//      this.getGameInfo();
//    };
//    work.completed = (getGameInfoResult) {
//      this.showCollectPlayers(getGameInfoResult);
//    }
//    work.failed = (exception) => {
//      console.error("JoinGameBackgroundWork failed %o.", exception);
//      const message = this.messageSource.getMessage(StringConstants.ERROR, null, null)
//          + ": " + exception;
//      this.trayIcon.showTrayMessage(message, MessageType.ERROR); 
//    }
//    work.argument = argument;
//    const ces = new ConnectionExceptionSettings();
//    ces.restart = true;
//    work.connectionExceptionSettings = ces;
//    this.backgroundWorkManager.startBackgroundWork(work);
//  }
  
  initializePlayerIcon(x, y, resourceId) {
    const go = new GameObject();
    go.position = new Point(x, y);
    go.animationImageIds = [[ resourceId ]];
    go.addMouseMoveListener((mouseMoveArg) => {
        this.highlightObject = null;
        this.baseGameView.showDefaultCursor();
        this.baseGameView.toolTipText = "";
      });
    this.addGameObject(go);
    go.visible = false;
    return go;
  }

  initializeFoodIcons() {
    const foodTypeCount = FoodType.VALUES_COUNT;
    
    const foodIcons = new Array(foodTypeCount);
    this.hiddenObjectsGameData.foodIcons = foodIcons;
    foodIcons[FoodType.ordinal(FoodType.CARROT)] = this.initFoodIcon(ResourceManager.IMAGE_CARROT_1);
    foodIcons[FoodType.ordinal(FoodType.DRY_FOOD)] = this.initFoodIcon(ResourceManager.IMAGE_DRY_FOOD_1);
    foodIcons[FoodType.ordinal(FoodType.FISH)] = this.initFoodIcon(ResourceManager.IMAGE_FISH_1);
    foodIcons[FoodType.ordinal(FoodType.ICE_CREAM)] = this.initFoodIcon(ResourceManager.IMAGE_ICE_CREAM_1);
    foodIcons[FoodType.ordinal(FoodType.APPLE)] = this.initFoodIcon(ResourceManager.IMAGE_APPLE_1);
    foodIcons[FoodType.ordinal(FoodType.CABBAGE)] = this.initFoodIcon(ResourceManager.IMAGE_CABBAGE_1);
    foodIcons[FoodType.ordinal(FoodType.CHOCOLATE)] = this.initFoodIcon(ResourceManager.IMAGE_CHOCOLATE_1);
    foodIcons[FoodType.ordinal(FoodType.FRENCH_FRIES)] = this.initFoodIcon(ResourceManager.IMAGE_FRENCH_FRIES_1);
    foodIcons[FoodType.ordinal(FoodType.JAPANESE_ROLLS)] = this.initFoodIcon(ResourceManager.IMAGE_JAPANESE_ROLLS_1);
    foodIcons[FoodType.ordinal(FoodType.PIE)] = this.initFoodIcon(ResourceManager.IMAGE_PIE_1);
    foodIcons[FoodType.ordinal(FoodType.POTATOES)] = this.initFoodIcon(ResourceManager.IMAGE_POTATOES_1);
    foodIcons[FoodType.ordinal(FoodType.SANDWICH)] = this.initFoodIcon(ResourceManager.IMAGE_SANDWICH_1);
  }

  initFoodIcon(resourceId) {
    const go = new GameObject();
    go.position = new Point(TreasuryData.ORIGINAL_FOOD_REWARD_X, TreasuryData.ORIGINAL_FOOD_REWARD_Y);
    go.visible = false;
    this.setOneSizeAnimation(go, resourceId);
    go.addMouseMoveListener((mouseMoveArg) => {
        this.baseGameView.showDefaultCursor();
        this.baseGameView.toolTipText = "";
      });
    this.addGameObject(go);
    return go;
  }
  
  initializeDrinkIcons() {
    const drinkTypeCount = DrinkType.VALUES_COUNT
    const drinkIcons = new Array(drinkTypeCount);
    this.hiddenObjectsGameData.drinkIcons = drinkIcons;
    drinkIcons[0] = this.initDrinkIcon(ResourceManager.IMAGE_WATER_1);
    drinkIcons[1] = this.initDrinkIcon(ResourceManager.IMAGE_MILK_1);
    drinkIcons[2] = this.initDrinkIcon(ResourceManager.IMAGE_BOTTLE_1);
    drinkIcons[3] = this.initDrinkIcon(ResourceManager.IMAGE_TEA_1);
    drinkIcons[4] = this.initDrinkIcon(ResourceManager.IMAGE_COFFEE_1);
    drinkIcons[5] = this.initDrinkIcon(ResourceManager.IMAGE_ORANGE_JUICE_1);
  }
  
  initDrinkIcon(resourceId) {
    const go = new GameObject();
    go.position = new Point(0, 0);
    go.visible = false;
    this.setOneSizeAnimation(go, resourceId);
    go.addMouseMoveListener((mouseMoveArg) => {
        this.baseGameView.showDefaultCursor();
        this.baseGameView.toolTipText = "";
      });
    this.addGameObject(go);
    return go;
  }

  initHiddenObjectIcon(resourceId) {
    const go = new GameObject();
    go.position = new Point(0, 0);
    go.dimension = new Dimension(TreasuryData.ICON_WIDTH, TreasuryData.ICON_HEIGHT);
    go.visible = false;
    this.setOneSizeAnimation(go, resourceId);
    go.addMouseMoveListener((mouseMoveArg) => {
        this.baseGameView.showDefaultCursor();
        this.baseGameView.toolTipText = "";
        this.highlightObject = null;
      });
    this.addGameObject(go);
    return go;
  }

  setOneSizeAnimation(go, resourceId) {
    go.animationImageIds = [[ resourceId ]];
  }

  initHiddenObject(x, y, resourceId) {
    const go = new GameObject();
    go.position = new Point(x, y);
    this.setOneSizeAnimation(go, resourceId);
    go.addMouseMoveListener((mouseMoveArg) => {
        this.baseGameView.showDefaultCursor();
        this.baseGameView.toolTipText = "";
        this.highlightObject = null;
      });
    go.addClickedListener((clickedArg) => {
      const hiddenObjectsGame = this.hiddenObjectsGameData.hiddenObjectsGame;
      const hiddenObjects = this.hiddenObjectsGameData.hiddenObjects;
        if (hiddenObjectsGame != null) {
          const objectsForSearch = hiddenObjectsGame.objects;
          if (objectsForSearch != null) {
            for (let objectIndex of objectsForSearch) {
              if (objectIndex != null) {
                const object = hiddenObjects[objectIndex];
                if (object == clickedArg.sender) {
                  object.visible = false;
                  const collectObjectArg = new CollectObjectArg();
                  collectObjectArg.objectId = objectIndex;
                  this.collectObject(collectObjectArg);
                }
              }
            }
          }
        }
      });
    this.addGameObject(go);
    return go;
  }

  startPlay() {
    this.hiddenObjectsGameData.situation = HiddenObjectsGameData.SITUATION_GAME;
  }

  showHowToPlayMessage() {
    this.hiddenObjectsGameData.situation = HiddenObjectsGameData.SITUATION_HOW_TO_PLAY_MESSAGE;
    const messageBoxStrings = new Array(3);
    messageBoxStrings[0] = this.messageSource.getMessage(
        StringConstants.HIDDEN_OBJECTS_HOW_TO_PLAY_1, null, null);
    messageBoxStrings[1] = this.messageSource.getMessage(
        StringConstants.HIDDEN_OBJECTS_HOW_TO_PLAY_2, null, null);
    messageBoxStrings[2] = this.messageSource.getMessage(
        StringConstants.HIDDEN_OBJECTS_HOW_TO_PLAY_3, null, null);
    this.showMessageBox(messageBoxStrings, (clickedArg) => {this.hideMessageBox();this.startPlay();}, null, MessageBoxGameObject.MESSAGE_BOX_TYPE_OK_BUTTON);
  }


  showCollectPlayers(hiddenObjectsGame) {
    this.hiddenObjectsGameData.hiddenObjectsGame = hiddenObjectsGame;
    if (this.hiddenObjectsGameData.situation  !== HiddenObjectsGameData.SITUATION_SHOW_INTRO
        && this.hiddenObjectsGameData.situation !== HiddenObjectsGameData.SITUATION_COLLECT_PLAYERS) {
      return;
    }

    const players = hiddenObjectsGame.players;
    for (let n = 0; n < players.length; n++) {
      const player = players[n];
      if (player != null) {
        let text = player.userName;
        text += "(";
        text += player.petName;
        text += ")";
        this.hiddenObjectsGameData.waitingPlayerNameLabels[n].text = text;
      } else {
        this.hiddenObjectsGameData.waitingPlayerNameLabels[n].text = this.messageSource.getMessage(StringConstants.HIDDEN_OBJECTS_WAITING_PLAYER, null, null);
      }
    }
    
    
    if (this.hiddenObjectsGameData.situation != HiddenObjectsGameData.SITUATION_COLLECT_PLAYERS) {
      this.messageBox.innerGameObjects.splice(0);
      for (let n = 0; n < this.hiddenObjectsGameData.waitingPlayerNameLabels.length; n++) {
        const lgo = this.hiddenObjectsGameData.waitingPlayerNameLabels[n];
        const igo =  new MessageBoxInnerGameObject();
        igo.gameObject = lgo;
        igo.position = new Point(10, 100 + n * lgo.size);
        lgo.visible = true;
        this.messageBox.innerGameObjects.push(igo);
      }
      this.showMessageBox([
          this.messageSource.getMessage(StringConstants.HIDDEN_OBJECTS_WAITING_PLAYERS_1, null, null),
          this.messageSource.getMessage(StringConstants.HIDDEN_OBJECTS_WAITING_PLAYERS_2, null, null)
      ], (clickedArg) => {
        this.hideMessageBox();
        this.messageBox.innerGameObjects.splice(0);
        this.hideMessageBox();
        this.showHowToPlayMessage();
        this.startGame(null);
        this.hiddenObjectsGameData.situation = HiddenObjectsGameData.SITUATION_HOW_TO_PLAY_MESSAGE;
      }, null, MessageBoxGameObject.MESSAGE_BOX_TYPE_OK_BUTTON);
      this.hiddenObjectsGameData.situation = HiddenObjectsGameData.SITUATION_COLLECT_PLAYERS;
    }

  }

  updateGameInfo(hiddenObjectsGame) {
    try {
      const hiddenObjectsIcons = this.hiddenObjectsGameData.hiddenObjectsIcons;
      const interfaceObject = this.hiddenObjectsGameData.interfaceObject;
      const hiddenObjects = this.hiddenObjectsGameData.hiddenObjects;
      this.hiddenObjectsGameData.hiddenObjectsGame = hiddenObjectsGame;
      const gameOver = hiddenObjectsGame.gameOver;
      if (gameOver) {
        this.hiddenObjectsGameData.situation = HiddenObjectsGameData.SITUATION_GAME_OVER;
      }
      if (this.hiddenObjectsGameData.situation == HiddenObjectsGameData.SITUATION_COLLECT_PLAYERS) {
        this.showHowToPlayMessage();
        return;
      }

      //double scale = getScale();

      const objects = hiddenObjectsGame.objects;
      const visibleObjectsIcons = new Array(objects.length);
      for (let n = 0; n < objects.length; n++) {
        const objectId = objects[n];
        if (objectId != null) {
          const go = hiddenObjectsIcons[objectId];
          go.visible = true;
          const x = TreasuryData.ORIGINAL_OBJECT_FOR_SEARCH_X + n
              * TreasuryData.ORIGINAL_OBJECT_FOR_SEARCH_STEP + 30
              - go.dimension.width / 2;
          const y = TreasuryData.ORIGINAL_OBJECT_FOR_SEARCH_Y
              + interfaceObject.position.y
              - TreasuryData.ORIGINAL_INTERFACE_OBJECT_Y + 30
              - go.dimension.height / 2;
          go.position = new Point(x, y);
          visibleObjectsIcons[n] = go;
        }
      }
      const pets = this.hiddenObjectsGameData.pets;
      const players = hiddenObjectsGame.players;
      for (let n = 0; n < players.length; n++) {
        const player = players[n];
        if (player != null) {
          if (!pets[n].visible) {
            const hatId = player.hatId;
            const clothId = player.clothId;
            const bowId = player.bowId;
            const petType = player.petType;
            pets[n].visible = true;
            const resourceId = pets[n].animationImageIds[0][0];
            this.updatePlayerIconResource(pets[n], resourceId, petType,
                hatId, clothId, bowId);
          }
        } else {
          pets[n].visible = false;
        }
      }

      const collected = hiddenObjectsGame.collectedObjects;
      for (let n = 0; n < collected.length; n++) {
        const hoc = collected[n];
        const objectId = hoc.objectId;
        hiddenObjectsIcons[objectId].visible = false;
        hiddenObjects[objectId].visible = false;
      }

      if (this.hiddenObjectsGameData.situation == HiddenObjectsGameData.SITUATION_GAME_OVER) {
        this.showGameOverMessage();
        return;
      }

      this.hiddenObjectsGameData.secondsLeftString = hiddenObjectsGame
          .secondsLeft + "s";
    } catch (exception) {
      console.error("updateGameInfo failed %o.", exception);
      const message = this.messageSource.getMessage(StringConstants.ERROR,
          null, null) + " (updateGameInfo failed): " + exception;
      this.trayIcon.showTrayMessage(message, MessageType.ERROR);
    }
  }

  updatePlayerIconResource(go, resourceId,
      petType, hatId, clothId, bowId) {
    let hatResourceId = null;
    let clothResourceId = null;
    let bowResourceId = null;
    if (hatId != null) hatResourceId = this.hiddenObjectsGameData.clothObjects.get(hatId).animationImageIds[0][0];
    if (clothId != null) clothResourceId = this.hiddenObjectsGameData.clothObjects.get(clothId).animationImageIds[0][0];
    if (bowId != null) bowResourceId = this.hiddenObjectsGameData.clothObjects.get(bowId).animationImageIds[0][0];
      this.baseGameView.updatePlayerIconResource(go, resourceId,
          petType, hatResourceId, 
          clothResourceId,
          bowResourceId);
  }


  showGameOverMessage() {
    this.rucksack.visible = true;
    this.levelInfo.visible = true;
    this.hiddenObjectsGameData.situation = HiddenObjectsGameData.SITUATION_GAME_OVER;
    const messageBoxStrings = new Array(3);
    messageBoxStrings[0] = this.messageSource.getMessage(
        StringConstants.HIDDEN_OBJECTS_GAME_OVER_1, null, null);
    messageBoxStrings[1] = this.messageSource.getMessage(
        StringConstants.HIDDEN_OBJECTS_GAME_OVER_2, null, null);
    messageBoxStrings[2] = this.messageSource.getMessage(
        StringConstants.HIDDEN_OBJECTS_GAME_OVER_3, null, null);
//    MessageBoxGameObject messageBox = getMessageBox();
//    List<MessageBoxGameObject.InnerGameObject> inners = messageBox.getInnerGameObjects();
    const hiddenObjectsGame = this.hiddenObjectsGameData.hiddenObjectsGame;
    
    if (hiddenObjectsGame.reward != null) {
      const clothRewardId = hiddenObjectsGame.reward.clothId;
      const foodReward = hiddenObjectsGame.reward.food;
      const buildingMaterialReward = hiddenObjectsGame.reward.buildingMaterialType;
      const bookRewardId = hiddenObjectsGame.reward.getBookId;
      const drinkTypeReward = hiddenObjectsGame.reward.drinkType;
      if (clothRewardId != null) {
        const cgo = this.hiddenObjectsGameData.clothObjects.get(
            clothRewardId);
        cgo.visible = false;
        cgo.z = BaseGameController.MENU_Z_ORDER + 2;
        //MessageBoxGameObject.InnerGameObject cgoi = messageBox.new InnerGameObject();
        //cgoi.setGameObject(cgo);
        //cgoi.setPosition(new Point(
        //    TreasuryData.ORIGINAL_CLOTH_REWARD_X,
        //    TreasuryData.ORIGINAL_CLOTH_REWARD_Y));
        //inners.add(cgoi);
        const collectableGameObject = this.addCollectableGameObject(cgo, 400, 300);
        collectableGameObject.z = BaseGameController.MENU_Z_ORDER + 2;
      }

      if (foodReward != null) {
        const foodIcon = this.hiddenObjectsGameData.foodIcons[FoodType.ordinal(foodReward)];
        foodIcon.z = BaseGameController.MENU_Z_ORDER + 2;
        foodIcon.visible = false;
        //MessageBoxGameObject.InnerGameObject fii = messageBox.new InnerGameObject();
        //fii.setGameObject(foodIcon);
        //fii.setPosition(new Point(TreasuryData.ORIGINAL_FOOD_REWARD_X,
        //    TreasuryData.ORIGINAL_FOOD_REWARD_Y));
        //inners.add(fii);
        const collectableGameObject = this.addCollectableGameObject(foodIcon, 400, 300);
        collectableGameObject.z = BaseGameController.MENU_Z_ORDER + 2;
      }
      if (buildingMaterialReward != null) {
        const collectableGameObject = this.addCollectableGameObject(buildingMaterialReward, 400, 300);
        collectableGameObject.z = BaseGameController.MENU_Z_ORDER + 2;
      }
      
      if (bookRewardId != null) {
        const bookIcon = this.hiddenObjectsGameData.bookObjects.get(bookRewardId);
        bookIcon.z = BaseGameController.MENU_Z_ORDER + 2;
        bookIcon.visible = false;
        const collectableGameObject = this.addCollectableGameObject(bookIcon, 400, 300);
        collectableGameObject.z = BaseGameController.MENU_Z_ORDER + 2;
      }
      if (drinkTypeReward != null) {
        const drinkIcon = this.hiddenObjectsGameData.drinkIcons[DrinkType.ordinal(drinkTypeReward)];
        drinkIcon.z = BaseGameController.MENU_Z_ORDER + 2;
        drinkIcon.visible = false;
        const collectableGameObject = this.addCollectableGameObject(drinkIcon, 400, 300);
        collectableGameObject.z = BaseGameController.MENU_Z_ORDER + 2;
      }
      const experienceReward = hiddenObjectsGame.reward.experience;
      for (let n = 0; n < experienceReward; n++) {
        const experienceGameObject = this.addExperienceGameObject(400, 300);
        experienceGameObject.z = BaseGameController.MENU_Z_ORDER + 2;
      }
      this.updateLevelInfo(hiddenObjectsGame.reward.levelInfo, new Point(400, 300));
      this.updateAchievementInfo(hiddenObjectsGame.reward.achievements);
    }
    
    this.showMessageBox(messageBoxStrings, (clickedArg) => {
      this.hideMessageBox();
      this.stopTimer();
      this.gameController.showTown();
    }, null, MessageBoxGameObject.MESSAGE_BOX_TYPE_OK_BUTTON);
  }

}
