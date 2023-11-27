
// controller
import BaseGameController from './BaseGameController.js';

export default class HiddenObjectsControllerBaseImpl extends BaseGameController {

  petService;
  gameController;
  hiddenObjectsService;
  
  hiddenObjectsGameData;
  #hiddenObjectsGameType;
  
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
        super.step();
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
              this.position.y = TreasuryData.ORIGINAL_INTERFACE_OBJECT_Y;
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
      }
    };
    interfaceObject.position = new Point(TreasuryData.ORIGINAL_INTERFACE_OBJECT_X, 600);
    interfaceObject.animationImageIds = [[ ResourceManagerBase.IMAGE_TREASURY_INTERFACE ]];
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
    this.showInterfaceButton.position = new Point(TreasuryData.ORIGINAL_SHOW_INTERFACE_BUTTON_X, TreasuryData.ORIGINAL_SHOW_INTERFACE_BUTTON_Y);
    
    showInterfaceButton.animationImageIds = [[ ResourceManagerBase.IMAGE_TREASURY_SHOW_INTERFACE_BUTTON], [ ResourceManagerBase.IMAGE_TREASURY_SHOW_INTERFACE_BUTTON_HIGHLIGHT ]];
    showInterfaceButton.addMouseMoveListener((mouseMoveArg) => {
        this.baseGameView.showHandCursor();
        this.baseGameView.toolTipText = "";
        this.highlightObject = showInterfaceButton;
      });
    showInterfaceButton.addClickedListener((clickedArg) => {
        this.hiddenObjectsGameData.interfaceVisible = true;
        this.showInterfaceButton.visible = false;
        this.interfaceObject.position.y = 600;
      });
    showInterfaceButton.visible = false;
    this.addGameObject(showInterfaceButton);
    this.hiddenObjectsGameData.setShowInterfaceButton(showInterfaceButton);

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

    hiddenObjectsGameData.waitingPlayers1Message = waitingPlayers1Message;
    hiddenObjectsGameData.waitingPlayers2Message = waitingPlayers2Message;

    this.initializeMessageBox();
    const waitingPlayerNameLabels = new Array(TreasuryData.MAX_PLAYERS_COUNT);
    this.hiddenObjectsGameData.waitingPlayerNameLabels = waitingPlayerNameLabels;
    for (let n  = 0; n < waitingPlayerNameLabels.length; n++) {
      const lgo = new LabelGameObject();
      lgo.text = this.messageSource.getMessage(StringConstants.HIDDEN_OBJECTS_WAITING_PLAYER, null, null);
      this.addGameObject(lgo);
      lgo.z = MENU_Z_ORDER + 1;
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
    for (let [key, value] of bookGameObjects.entries()) {
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
      return hiddenObjectsService.collectObject(work.argument);
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
      return hiddenObjectsService.startGame();
    };
    work.completed = (hiddenObjectsGame) => {
      this.startGame(hiddenObjectsGame);
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
      return this.hiddenObjectsService.joinGame(argument);
    };
    work.completed = (hiddenObjectsGame) => {
      this.showCollectPlayers(hiddenObjectsGame);
      this.getGameInfo(null);
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
  
  getGameInfo(argument) {
    //const work = new BackgroundWork();
    //work.doInBackground = () => {
    //  Thread.sleep(1000);
    //  return hiddenObjectsService.getGameInfo();
    //};
    //work.argument = argument;
    //const ces = new ConnectionExceptionSettings();
    //ces.restart = true;
    //work.connectionExceptionSettings = ces;
    //this.backgroundWorkManager.startBackgroundWork(work);
  }

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
    foodIcons[FoodType.CARROT.ordinal()] = this.initFoodIcon(ResourceManager.IMAGE_CARROT_1);
    foodIcons[FoodType.DRY_FOOD.ordinal()] = this.initFoodIcon(ResourceManager.IMAGE_DRY_FOOD_1);
    foodIcons[FoodType.FISH.ordinal()] = this.initFoodIcon(ResourceManager.IMAGE_FISH_1);
    foodIcons[FoodType.ICE_CREAM.ordinal()] = this.initFoodIcon(ResourceManager.IMAGE_ICE_CREAM_1);
    foodIcons[FoodType.APPLE.ordinal()] = this.initFoodIcon(ResourceManager.IMAGE_APPLE_1);
    foodIcons[FoodType.CABBAGE.ordinal()] = this.initFoodIcon(ResourceManager.IMAGE_CABBAGE_1);
    foodIcons[FoodType.CHOCOLATE.ordinal()] = this.initFoodIcon(ResourceManager.IMAGE_CHOCOLATE_1);
    foodIcons[FoodType.FRENCH_FRIES.ordinal()] = this.initFoodIcon(ResourceManager.IMAGE_FRENCH_FRIES_1);
    foodIcons[FoodType.JAPANESE_ROLLS.ordinal()] = this.initFoodIcon(ResourceManager.IMAGE_JAPANESE_ROLLS_1);
    foodIcons[FoodType.PIE.ordinal()] = this.initFoodIcon(ResourceManager.IMAGE_PIE_1);
    foodIcons[FoodType.POTATOES.ordinal()] = this.initFoodIcon(ResourceManager.IMAGE_POTATOES_1);
    foodIcons[FoodType.SANDWICH.ordinal()] = this.initFoodIcon(ResourceManager.IMAGE_SANDWICH_1);
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
    addGameObject(go);
    return go;
  }

  setOneSizeAnimation(go, resourceId) {
    go.animationImageIds = [[ result ]];
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
          const objectsForSearch = this.hiddenObjectsGame.objects;
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
    this.hiddenObjectsGameData.situation = Situation.GAME;
  }

  showHowToPlayMessage() {
    this.hiddenObjectsGameData.situation = Situation.HOW_TO_PLAY_MESSAGE;
    const messageBoxStrings = new Array(3);
    messageBoxStrings[0] = this.messageSource.getMessage(
        StringConstants.HIDDEN_OBJECTS_HOW_TO_PLAY_1, null, null);
    messageBoxStrings[1] = this.messageSource.getMessage(
        StringConstants.HIDDEN_OBJECTS_HOW_TO_PLAY_2, null, null);
    messageBoxStrings[2] = this.messageSource.getMessage(
        StringConstants.HIDDEN_OBJECTS_HOW_TO_PLAY_3, null, null);
    this.showMessageBox(messageBoxStrings, (clickedArg) => {this.hideMessageBox();this.startPlay();}, null, MessageBoxGameObject.MessageBoxType.OK_BUTTON);
  }


  public void showCollectPlayers(HiddenObjectsGame hiddenObjectsGame) {
    hiddenObjectsGameData.setHiddenObjectsGame(hiddenObjectsGame);
    if (hiddenObjectsGameData.getSituation()  != Situation.SHOW_INTRO
      && hiddenObjectsGameData.getSituation() != Situation.COLLECT_PLAYERS) {
      return;
    }

    HiddenObjectsPlayer[] players = hiddenObjectsGame.getPlayers();
    for (int n = 0; n < players.length; n++) {
      HiddenObjectsPlayer player = players[n];
      if (player != null) {
        StringBuilder builder = new StringBuilder();
        builder.append(player.getUserName());
        builder.append("(");
        builder.append(player.getPetName());
        builder.append(")");
        builder.append("");
        hiddenObjectsGameData.getWaitingPlayerNameLabels()[n].setText(builder.toString());
      } else {
        hiddenObjectsGameData.getWaitingPlayerNameLabels()[n].setText(messageSource.getMessage(StringConstants.HIDDEN_OBJECTS_WAITING_PLAYER, null, null));
      }
    }
    
    
    if (this.hiddenObjectsGameData.situation != Situation.COLLECT_PLAYERS) {
      this.messageBox.innerGameObjects.splice(0);
      for (let n = 0; n < this.hiddenObjectsGameData.waitingPlayerNameLabels.length; n++) {
        const lgo = this.hiddenObjectsGameData.waitingPlayerNameLabels[n];
        MessageBoxGameObject.InnerGameObject igo =  new MessageBoxInnerGameObject();
        igo.gameObject = lgo;
        igo.position = new Point(10, 100 + n * lgo.size);
        lgo.visible = true;
        this.messageBox.innerGameObjects.add(igo);
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
        this.hiddenObjectsGameData.situation = Situation.HOW_TO_PLAY_MESSAGE;
      }, null, MessageBoxGameObject.MessageBoxType.OK_BUTTON);
      this.hiddenObjectsGameData.situation = Situation.COLLECT_PLAYERS;
    }

  }

  updateGameInfo(hiddenObjectsGame) {
    try {
      const hiddenObjectsIcons = this.hiddenObjectsGameData.hiddenObjectsIcons;
      const interfaceObject = this.hiddenObjectsGameData.interfaceObject;
      const hiddenObjects = this.hiddenObjectsGameData.hiddenObjects;
      this.hiddenObjectsGameData.hiddenObjectsGame(hiddenObjectsGame);
      const gameOver = hiddenObjectsGame.gameOver;
      if (gameOver) {
        this.hiddenObjectsGameData.situation = Situation.GAME_OVER;
      }
      if (this.hiddenObjectsGameData.situation == Situation.COLLECT_PLAYERS) {
        this.showHowToPlayMessage();
        return;
      }

      //double scale = getScale();

      const objects = result.objects;
      const visibleObjectsIcons = new Array(objects.length);
      for (let n = 0; n < objects.length; n++) {
        const objectId = objects[n];
        if (objectId != null) {
          const go = hiddenObjectsIcons[objectId];
          go.setVisible(true);
          int x = TreasuryData.ORIGINAL_OBJECT_FOR_SEARCH_X + n
              * TreasuryData.ORIGINAL_OBJECT_FOR_SEARCH_STEP + 30
              - go.getDimension().getWidth() / 2;
          int y = TreasuryData.ORIGINAL_OBJECT_FOR_SEARCH_Y
              + interfaceObject.getPosition().getY()
              - TreasuryData.ORIGINAL_INTERFACE_OBJECT_Y + 30
              - go.getDimension().getHeight() / 2;
          go.setPosition(new Point(x, y));
          visibleObjectsIcons[n] = go;
        }
      }
      GameObject[] pets = hiddenObjectsGameData.getPets();
      HiddenObjectsPlayer[] players = result.getPlayers();
      for (int n = 0; n < players.length; n++) {
        HiddenObjectsPlayer player = players[n];
        if (player != null) {
          if (!pets[n].isVisible()) {
            Integer hatId = player.getHatId();
            Integer clothId = player.getClothId();
            Integer bowId = player.getBowId();
            PetType petType = player.getPetType();
            pets[n].setVisible(true);
            int resourceId = pets[n].getAnimationImageIds()[0][0];
            updatePlayerIconResource(pets[n], resourceId, petType,
                hatId, clothId, bowId);
          }
        } else {
          pets[n].setVisible(false);
        }
      }

      HiddenObjectsCollected[] collected = result.getCollectedObjects();
      for (int n = 0; n < collected.length; n++) {
        HiddenObjectsCollected hoc = collected[n];
        Integer objectId = hoc.getObjectId();
        hiddenObjectsIcons[objectId].setVisible(false);
        hiddenObjects[objectId].setVisible(false);
      }

      if (hiddenObjectsGameData.getSituation() == Situation.GAME_OVER) {
        
        showGameOverMessage();
        return;
      }

      hiddenObjectsGameData.setSecondsLeftString(String.valueOf(result
          .getSecondsLeft()) + "s");
    } catch (Exception ex) {
      logger.error("updateGameInfo failed.", ex);
      String message = messageSource.getMessage(StringConstants.ERROR,
          null, null) + " (updateGameInfo failed): " + ex.toString();
      trayIcon.showTrayMessage(message, MessageType.ERROR);
    }
  }

  private void updatePlayerIconResource(GameObject go, int resourceId,
      PetType petType, Integer hatId, Integer clothId, Integer bowId) {
    Integer hatResourceId = null;
    Integer clothResourceId = null;
    Integer bowResourceId = null;
    if (hatId != null) hatResourceId = hiddenObjectsGameData.getClothObjects().get(hatId).getAnimationImageIds()[0][0];
    if (clothId != null) clothResourceId = hiddenObjectsGameData.getClothObjects().get(clothId).getAnimationImageIds()[0][0];
    if (bowId != null) bowId = hiddenObjectsGameData.getClothObjects().get(bowId).getAnimationImageIds()[0][0];
      baseGameView.updatePlayerIconResource(go, resourceId,
          petType, hatResourceId, 
          clothResourceId,
          bowResourceId);
  }


  private void showGameOverMessage() {
    getRucksack().setVisible(true);
    getLevelInfo().setVisible(true);
    hiddenObjectsGameData.setSituation(Situation.GAME_OVER);
    String[] messageBoxStrings = new String[3];
    messageBoxStrings[0] = messageSource.getMessage(
        StringConstants.HIDDEN_OBJECTS_GAME_OVER_1, null, null);
    messageBoxStrings[1] = messageSource.getMessage(
        StringConstants.HIDDEN_OBJECTS_GAME_OVER_2, null, null);
    messageBoxStrings[2] = messageSource.getMessage(
        StringConstants.HIDDEN_OBJECTS_GAME_OVER_3, null, null);
//    MessageBoxGameObject messageBox = getMessageBox();
//    List<MessageBoxGameObject.InnerGameObject> inners = messageBox.getInnerGameObjects();
    HiddenObjectsGame hiddenObjectsGame = hiddenObjectsGameData.getHiddenObjectsGame();
    
    if (hiddenObjectsGame.getReward() != null) {
      Integer clothRewardId = hiddenObjectsGame.getReward().getClothId();
      FoodType foodReward = hiddenObjectsGame.getReward().getFood();
      BuildingMaterialType buildingMaterialReward = hiddenObjectsGame.getReward().getBuildingMaterialType();
      Integer bookRewardId = hiddenObjectsGame.getReward().getBookId();
      DrinkType drinkTypeReward = hiddenObjectsGame.getReward().getDrinkType();
      if (clothRewardId != null) {
        ClothGameObject cgo = hiddenObjectsGameData.getClothObjects().get(
            clothRewardId);
        cgo.setVisible(false);
        cgo.setZ(MENU_Z_ORDER+2);
        //MessageBoxGameObject.InnerGameObject cgoi = messageBox.new InnerGameObject();
        //cgoi.setGameObject(cgo);
        //cgoi.setPosition(new Point(
        //    TreasuryData.ORIGINAL_CLOTH_REWARD_X,
        //    TreasuryData.ORIGINAL_CLOTH_REWARD_Y));
        //inners.add(cgoi);
        CollectableGameObject collectableGameObject = addCollectableGameObject(cgo, 400, 300);
        collectableGameObject.setZ(MENU_Z_ORDER+2);
      }

      if (foodReward != null) {
        GameObject foodIcon = hiddenObjectsGameData.getFoodIcons()[foodReward
            .ordinal()];
        foodIcon.setZ(MENU_Z_ORDER+2);
        foodIcon.setVisible(false);
        //MessageBoxGameObject.InnerGameObject fii = messageBox.new InnerGameObject();
        //fii.setGameObject(foodIcon);
        //fii.setPosition(new Point(TreasuryData.ORIGINAL_FOOD_REWARD_X,
        //    TreasuryData.ORIGINAL_FOOD_REWARD_Y));
        //inners.add(fii);
        CollectableGameObject collectableGameObject = addCollectableGameObject(foodIcon, 400, 300);
        collectableGameObject.setZ(MENU_Z_ORDER+2);
      }
      if (buildingMaterialReward != null) {
        CollectableGameObject collectableGameObject = addCollectableGameObject(buildingMaterialReward, 400, 300);
        collectableGameObject.setZ(MENU_Z_ORDER+2);
      }
      
      if (bookRewardId != null) {
        GameObject bookIcon = hiddenObjectsGameData.getBookObjects().get(bookRewardId);
        bookIcon.setZ(MENU_Z_ORDER+2);
        bookIcon.setVisible(false);
        CollectableGameObject collectableGameObject = addCollectableGameObject(bookIcon, 400, 300);
        collectableGameObject.setZ(MENU_Z_ORDER+2);
      }
      if (drinkTypeReward != null) {
        GameObject drinkIcon = hiddenObjectsGameData.getDrinkIcons()[drinkTypeReward.ordinal()];
        drinkIcon.setZ(MENU_Z_ORDER+2);
        drinkIcon.setVisible(false);
        CollectableGameObject collectableGameObject = addCollectableGameObject(drinkIcon, 400, 300);
        collectableGameObject.setZ(MENU_Z_ORDER+2);
      }
      int experienceReward = hiddenObjectsGame.getReward().getExperience();
      for (int n = 0; n < experienceReward; n++) {
        ExperienceGameObject experienceGameObject = addExperienceGameObject(400, 300);
        experienceGameObject.setZ(MENU_Z_ORDER+2);
      }
      updateLevelInfo(hiddenObjectsGame.getReward().getLevelInfo(), new Point(400, 300));
      this.updateAchievementInfo(hiddenObjectsGame.getReward().getAchievements());
    }
    
    showMessageBox(messageBoxStrings, (clickedArg)->{
      hideMessageBox();
      gameController.showTown();
    }, null, MessageBoxGameObject.MessageBoxType.OK_BUTTON);
  }

  public void startGame(HiddenObjectsGame result) {
    // Integer[] objects = result.getObjects();
  }

  public HiddenObjectsGameType getHiddenObjectsGameType() {
    return hiddenObjectsGameType;
  }

  public void setHiddenObjectsGameType(HiddenObjectsGameType hiddenObjectsGameType) {
    this.hiddenObjectsGameType = hiddenObjectsGameType;
  }

}
