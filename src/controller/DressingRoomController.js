// domain
import Point from '../domain/Point.js';
import GameObject from '../domain/GameObject.js';
import DressingRoomData from '../domain/DressingRoomData.js';
import HighlightGameObject from '../domain/HighlightGameObject.js';
import ClothGameObject from '../domain/ClothGameObject.js';
import MessageBoxGameObject from '../domain/MessageBoxGameObject.js';

//rest
import SavePetClothsArg from '../api/domain/SavePetClothsArg.js';

// resources
import ResourceManager from '../resources/ResourceManager.js';

// localization
import StringConstants from '../localization/StringConstants.js';

// rest
import BackgroundWork from '../api/multithreading/BackgroundWork.js';
import ConnectionExceptionSettings from '../api/multithreading/ConnectionExceptionSettings.js';

// tray icon
import MessageType from '../trayicon/MessageType.js';

// controller
import BaseGameController from './BaseGameController.js';


export default class DressingRoomController extends BaseGameController {

  dressingRoomView;
  gameController;
  backgroundWorkManager;

  dressingRoomData;

  showView() {
    // TODO Auto-generated method stub

  }

  hideView() {
    // TODO Auto-generated method stub

  }

  initialize() {
    this.dressingRoomView
        .addInitializationCompletedListener((sender, data) => {
          this.loadCloths(data);
        });
    this.dressingRoomData = new DressingRoomData();
    const background = new GameObject();
    background.position = new Point(0, 0);
    background.animationImageIds = [[ ResourceManager.IMAGE_DRESSING_ROOM_BACKGROUND ]];
    background.addMouseMoveListener((mouseMoveArg) => {
      this.dressingRoomView.showDefaultCursor();
      this.dressingRoomView.toolTipText = "";
      this.highlightObject = null;
    });
    background.addClickedListener((arg) => {
      this.baseGameView.toolTipText = "";
      this.baseGameView.showHandCursor();
      this.highlightObject = null;
      this.hideMenu();
    });
    this.addGameObject(background);
    this.dressingRoomData.background = background;

    const arrowLeft = new HighlightGameObject();
    arrowLeft.position = new Point(DressingRoomData.ORIGINAL_ARROW_LEFT_X,
        DressingRoomData.ORIGINAL_ARROW_LEFT_Y);
    arrowLeft.animationImageIds = [[ ResourceManager.IMAGE_DRESSING_ROOM_ARROW_LEFT ], [ ResourceManager.IMAGE_DRESSING_ROOM_ARROW_LEFT_HIGHLIGHT ]];
    arrowLeft.addMouseMoveListener((mouseMoveArg) => {
      this.dressingRoomView.showHandCursor();
      this.dressingRoomView.toolTipText = "";
      this.highlightObject = arrowLeft;
    });
    arrowLeft.addClickedListener((clickedArg) => {
      this.fireTownEvent();
    });
    this.addGameObject(arrowLeft);
    this.dressingRoomData.arrowLeft = arrowLeft;

    const pet = this.initializePetGameObject();
    pet.position = new Point(DressingRoomData.ORIGINAL_PET_X,
        DressingRoomData.ORIGINAL_PET_Y);
    this.dressingRoomData.pet = pet;

    const hatIcon = new HighlightGameObject();
    hatIcon.position = new Point(DressingRoomData.ORIGINAL_HAT_ICON_X,
        DressingRoomData.ORIGINAL_HAT_ICON_Y);
    
    hatIcon.animationImageIds = [[ ResourceManager.IMAGE_DRESSING_ROOM_HAT], [ ResourceManager.IMAGE_DRESSING_ROOM_HAT_HIGHLIGHT ]];
    hatIcon.addMouseMoveListener((mouseMoveArg) => {
      this.dressingRoomView.showHandCursor();
      this.dressingRoomView.toolTipText = "";
      this.highlightObject = hatIcon;
    });
    hatIcon.addClickedListener((clickedArg) => {
      this.showMenu(DressingRoomData.ORIGINAL_HAT_ICON_X,
          DressingRoomData.MENU_TYPE_HAT);
    });
    this.addGameObject(hatIcon);
    this.dressingRoomData.hatIcon = hatIcon;

    const clothIcon = new HighlightGameObject();
    clothIcon.position = new Point(DressingRoomData.ORIGINAL_CLOTH_ICON_X,
        DressingRoomData.ORIGINAL_CLOTH_ICON_Y);
    clothIcon.animationImageIds = [[ ResourceManager.IMAGE_DRESSING_ROOM_CLOTH], [ ResourceManager.IMAGE_DRESSING_ROOM_CLOTH_HIGHLIGHT ]];
    clothIcon.addMouseMoveListener((mouseMoveArg) => {
      this.dressingRoomView.showHandCursor();
      this.dressingRoomView.toolTipText = "";
      this.highlightObject = clothIcon;
    });
    clothIcon.addClickedListener((clickedArg) => {
      this.showMenu(DressingRoomData.ORIGINAL_CLOTH_ICON_X,
          DressingRoomData.MENU_TYPE_CLOTH);
    });
    this.addGameObject(clothIcon);
    this.dressingRoomData.clothIcon = clothIcon;

    const bowIcon = new HighlightGameObject();
    bowIcon.position = new Point(DressingRoomData.ORIGINAL_BOW_ICON_X,
        DressingRoomData.ORIGINAL_BOW_ICON_Y);
    bowIcon.animationImageIds = [[ ResourceManager.IMAGE_DRESSING_ROOM_BOW], [ResourceManager.IMAGE_DRESSING_ROOM_BOW_HIGHLIGHT ]];
    bowIcon.addMouseMoveListener((mouseMoveArg)  => {
      this.dressingRoomView.showHandCursor();
      this.dressingRoomView.toolTipText = "";
      this.highlightObject = bowIcon;
    });
    bowIcon.addClickedListener((clickedArg) => {
      this.showMenu(DressingRoomData.ORIGINAL_BOW_ICON_X,
          DressingRoomData.MENU_TYPE_BOW);
    });
    this.addGameObject(bowIcon);
    this.dressingRoomData.betBowIcon = bowIcon;

    this.dressingRoomData
        .menuClothGameObjects = new Map(); // new HashMap<Integer, ClothGameObject>();
    this.initializeHat(BaseGameController.HAT_RED_HAT, ResourceManager.IMAGE_CAT_HAT_1);
    this.initializeHat(BaseGameController.HAT_COWBOY_HAT, ResourceManager.IMAGE_CAT_HAT_2);
    this.initializeHat(BaseGameController.HAT_TIARA, ResourceManager.IMAGE_CAT_HAT_3);
    this.initializeCloth(BaseGameController.CLOTH_COLORED_BODY, ResourceManager.IMAGE_CAT_CLOTH_1);
    this.initializeCloth(BaseGameController.CLOTH_SUIT_JACKET, ResourceManager.IMAGE_CAT_CLOTH_2)
    this.initializeCloth(BaseGameController.CLOTH_PINKY_WINGS, ResourceManager.IMAGE_CAT_CLOTH_3);
    this.initializeBow(BaseGameController.BOW_RED_BOW, ResourceManager.IMAGE_CAT_BOW_1);
    this.initializeBow(BaseGameController.BOW_BLUE_BOW, ResourceManager.IMAGE_CAT_BOW_2);
    this.initializeBow(BaseGameController.BOW_BLUE_FLOWER, ResourceManager.IMAGE_CAT_BOW_3);
    

    this.initializeMessageBox();

    const messageBoxStrings = new Array(3);
    messageBoxStrings[0] = this.messageSource.getMessage(
        StringConstants.DRESSING_ROOM_HOW_TO_PLAY_1, null, null);
    messageBoxStrings[1] = this.messageSource.getMessage(
        StringConstants.DRESSING_ROOM_HOW_TO_PLAY_2, null, null);
    messageBoxStrings[2] = this.messageSource.getMessage(
        StringConstants.DRESSING_ROOM_HOW_TO_PLAY_3, null, null);
    this.showMessageBox(messageBoxStrings, null,
        null, MessageBoxGameObject.MESSAGE_BOX_TYPE_OK_BUTTON);

    const menuItems = []; //new ArrayList<GameObject>();
    for (let n = 0; n < 3; n++) {
      const mi = new GameObject();
      mi.animationImageIds = [[ ResourceManager.IMAGE_DRESSING_ROOM_MENU_ITEM ]];
      mi.addMouseMoveListener(mma => {
        this.baseGameView.showDefaultCursor();
        this.baseGameView.toolTipText = "";
        this.setHighlightObject = null;
      });
      mi.addClickedListener(cl => {
        this.baseGameView.showDefaultCursor();
        this.baseGameView.toolTipText = "";
        this.highlightObject = null;
      });
      mi.position = new Point(0, DressingRoomData.ORIGINAL_CLOTH_ICON_Y
          + DressingRoomData.MENU_ITEM_HEIGHT
          + DressingRoomData.MENU_ITEM_HEIGHT * n);
      this.addGameObject(mi);
      mi.visible = false;
      menuItems.push(mi);
    }
    this.dressingRoomData.menuItems = menuItems;
    const clothGameObjects = this
        .initializeClothGameObjects();
    for (let o of clothGameObjects.values()) {
      o.position = new Point(
          DressingRoomData.ORIGINAL_PET_X,
          DressingRoomData.ORIGINAL_PET_Y);
      o.visible = false;
    }
    this.dressingRoomData.clothGameObjects = clothGameObjects;
  }

  hideMenu() {
    this.dressingRoomData.menuItems.forEach((o) => {
      o.visible = false;
    });
    const iterator = this.dressingRoomData.menuClothGameObjects.values();
    let iteratorResult = iterator.next();
    while (!iteratorResult.done) {
      iteratorResult.value.visible = false;
      iteratorResult = iterator.next();
    }
  }

  showMenu(originalHatIconX, menuType) {
    this.hideMenu();
    let cloths = null;
    switch (menuType) {
    case DressingRoomData.MENU_TYPE_HAT:
      cloths = this.dressingRoomData.hats;
      break;
    case DressingRoomData.MENU_TYPE_CLOTH:
      cloths = this.dressingRoomData.cloths;
      break;
    case DressingRoomData.MENU_TYPE_BOW:
      cloths = this.dressingRoomData.bows;
      break;
    }
    const hatIterator = cloths[Symbol.iterator]();
    let hatIteratorResult = hatIterator.next();
    for (let mi of this.dressingRoomData.menuItems) {
      mi.visible = true;
      mi.position = new Point(originalHatIconX, mi.position.y);
      if (!hatIteratorResult.done) {
        const nextCloth = hatIteratorResult.value;
        hatIteratorResult = hatIterator.next();
        nextCloth.position = mi.position.clone();
        nextCloth.visible = true;
        nextCloth.z = BaseGameController.MENU_Z_ORDER;
      }
    }
  }

//  private class SavePetClothsBackgroundWork extends
//      BackgroundWork<SavePetClothsArg, Void, Void> {

//    @Override
//    public Void doInBackground() throws Exception {
//      petService.saveCloth(getArgument());
//      return null;
//    }

//    @Override
//    public void completed(Void result) {
//      gameController.showTown();
//    }

//    @Override
//    public void failed(Exception ex) {
//      logger.error("SavePetClothsBackgroundWork failed.", ex);
//      String message = messageSource.getMessage(StringConstants.ERROR,
//          null, null) + ": " + ex.toString();
//      trayIcon.showTrayMessage(message, MessageType.ERROR);
//    }
//}

  saveCloth(saveClothArg) {
    const work = new BackgroundWork();
    work.doInBackground = () => {
      return this.petService.saveCloth(work.argument);
    };
    work.completed = () => {
      this.gameController.showTown();
    };
    work.failed = (exception) => {
      console.error("SavePetClothsBackgroundWork failed %o.", exception);
      const message = messageSource.getMessage(StringConstants.ERROR,
          null, null) + ": " + exception;
      this.trayIcon.showTrayMessage(message, MessageType.ERROR);
    };
    work.argument = saveClothArg;
    work.view = this.dressingRoomView;
    const ces = new ConnectionExceptionSettings();
    ces.restart = true;
    work.connectionExceptionSettings = ces;
    this.backgroundWorkManager.startBackgroundWork(work);
  }

//  private class LoadClothsBackgroundWork extends
//      BackgroundWork<Void, GetPetClothsResult, Void> {
//    @Override
//    public GetPetClothsResult doInBackground() throws Exception {
//      return petService.getPetCloths();
//    }
//
//    @Override
//    public void completed(GetPetClothsResult result) {
//      try {
//        setCloths(result);
//      } catch (Exception ex) {
//        logger.error("setCloths failed.", ex);
//        String message = messageSource.getMessage(StringConstants.ERROR,
//            null, null) + ": " + ex.toString();
//        trayIcon.showTrayMessage(message, MessageType.ERROR);
//      }
//    }
//
//    @Override
//    public void failed(Exception ex) {
//      logger.error("LoadClothsBackgroundWork failed.", ex);
//      String message = messageSource.getMessage(StringConstants.ERROR,
//          null, null) + ": " + ex.toString();
//      trayIcon.showTrayMessage(message, MessageType.ERROR);
//    }
//  }

  loadCloths() {
    const work = new BackgroundWork();
    work.doInBackground = () => {
      return this.petService.getPetCloths();
    };
    work.completed = (getPetClothsResult) => {
      try {
        this.cloths = getPetClothsResult;
      } catch (exception) {
        console.error("setCloths failed %o.", exception);
        const message = this.messageSource.getMessage(StringConstants.ERROR,
            null, null) + ": " + exception;
        this.trayIcon.showTrayMessage(message, MessageType.ERROR);
      }
    };
    work.failed = (exception) => {
      console.error("LoadClothsBackgroundWork failed.", exception);
      const message = this.messageSource.getMessage(StringConstants.ERROR,
          null, null) + ": " + exception;
      this.trayIcon.showTrayMessage(message, MessageType.ERROR);
    };
    work.view = this.dressingRoomView;
    const ces = new ConnectionExceptionSettings();
    ces.restart = true;
    work.connectionExceptionSettings = ces;
    this.backgroundWorkManager.startBackgroundWork(work);
  }

  initializeBow(clothId, resourceId) {
    const go = new ClothGameObject();
    this.dressingRoomData
        .menuClothGameObjects.set(clothId, go);
    go.clothId = clothId;
    go.position = new Point(DressingRoomData.ORIGINAL_PET_X,
        DressingRoomData.ORIGINAL_PET_Y);
    
    go.animationImageIds = [[ resourceId ]];
    go.addMouseMoveListener((mouseMoveArg) => {
      this.dressingRoomView.showHandCursor();
      this.dressingRoomView.toolTipText = "";
    });
    go.addClickedListener((clickedArg) => {
      this.currentBow = clothId;
    });
    go.visible = false;
    this.addGameObject(go);
    return go;
  }

//  protected void nextBow() {
//    int currentBowIndex = dressingRoomData.getCurrentBowIndex();
//    List<ClothGameObject> bows = dressingRoomData.getBows();
//    if (currentBowIndex >= 0) {
//      bows.get(currentBowIndex).setVisible(false);
//    }
//    currentBowIndex++;
//    if (currentBowIndex == bows.size()) {
//      currentBowIndex = -1;
//    } else {
//      bows.get(currentBowIndex).setVisible(true);
//    }
//    dressingRoomData.setCurrentBowIndex(currentBowIndex);
//  }

  initializeCloth(clothId, resourceId) {
    const go = new ClothGameObject();
    this.dressingRoomData
        .menuClothGameObjects.set(clothId, go);
    go.clothId = clothId;
    go.position = new Point(DressingRoomData.ORIGINAL_PET_X,
        DressingRoomData.ORIGINAL_PET_Y);
    
    go.animationImageIds = [[ resourceId ]];
    go.addMouseMoveListener((mouseMoveArg) => {
      this.dressingRoomView.showHandCursor();
      this.dressingRoomView.toolTipText = "";
    });
    go.addClickedListener((clickedArg) => {
      this.currentCloth = clothId;
    });
    go.visible = false;
    this.addGameObject(go);
    return go;
  }

//  protected void nextCloth() {
//    int currentClothIndex = dressingRoomData.getCurrentClothIndex();
//    List<ClothGameObject> cloths = dressingRoomData.getCloths();
//    if (currentClothIndex >= 0) {
//      cloths.get(currentClothIndex).setVisible(false);
//    }
//    currentClothIndex++;
//    if (currentClothIndex == cloths.size()) {
//      currentClothIndex = -1;
//    } else {
//      cloths.get(currentClothIndex).setPosition(
//          new Point(DressingRoomData.ORIGINAL_PET_X,
//              DressingRoomData.ORIGINAL_PET_Y));
//      cloths.get(currentClothIndex).setVisible(true);
//    }
//    dressingRoomData.setCurrentClothIndex(currentClothIndex);
//  }

  initializeHat(clothId, resourceId) {
    const go = new ClothGameObject();
    this.dressingRoomData
        .menuClothGameObjects.set(clothId, go);
    go.clothId = clothId;
    go.position = new Point(DressingRoomData.ORIGINAL_PET_X,
        DressingRoomData.ORIGINAL_PET_Y);
    go.animationImageIds = [[ resourceId ]];
    go.addMouseMoveListener((mouseMoveArg) => {
      this.dressingRoomView.showHandCursor();
      this.dressingRoomView.toolTipText = "";
    });
    go.addClickedListener((clickedArg) => {
      this.currentHat = clothId;
    });
    go.visible = false;
    this.addGameObject(go);
    return go;
  }

//  protected void nextHat() {
//    int currentHatIndex = dressingRoomData.getCurrentHatIndex();
//    List<ClothGameObject> hats = dressingRoomData.getHats();
//    if (currentHatIndex >= 0) {
//      hats.get(currentHatIndex).setVisible(false);
//    }
//    currentHatIndex++;
//    if (currentHatIndex == hats.size()) {
//      currentHatIndex = -1;
//    } else {
//      hats.get(currentHatIndex).setPosition(
//          new Point(DressingRoomData.ORIGINAL_PET_X,
//              DressingRoomData.ORIGINAL_PET_Y));
//      hats.get(currentHatIndex).setVisible(true);
//    }
//    dressingRoomData.setCurrentHatIndex(currentHatIndex);
//  }

  fireTownEvent() {
    try {

      const pet = this.dressingRoomData.pet;
      
      const saveClothArg = new SavePetClothsArg();
      if (pet.hat != null) {
        saveClothArg.hatId = pet.hat.clothId;
      }
      if (pet.cloth != null) {
        saveClothArg.clothId = pet.cloth.clothId;
      }
      if (pet.bow != null) {
        saveClothArg.bowId = pet.bow.clothId;
      }
      this.saveCloth(saveClothArg);
    } catch (exception) {
      console.error("fireTownEvent failed %o.", exception);
      const message = this.messageSource.getMessage(
          StringConstants.ERROR, null, null)
          + ": " + exception;
      this.trayIcon.showTrayMessage(message, MessageType.ERROR);
    }
  }

  set currentCloth(clothId) {
    const pet = this.dressingRoomData.pet;
    if (pet.cloth != null) {
      pet.cloth.visible = false;
    }
    pet.cloth = this.dressingRoomData.clothGameObjects.get(clothId);
    pet.cloth.visible = true;
  }

  set currentBow(bowId) {
    const pet = this.dressingRoomData.pet;
    if (pet.bow != null) {
      pet.bow.visible = false;
    }
    pet.bow = this.dressingRoomData.clothGameObjects.get(bowId);
    pet.bow.visible = true;
  }

  set currentHat(hatId) {
    const pet = this.dressingRoomData.pet;
    if (pet.hat != null) {
      pet.hat.visible = false;
    }
    pet.hat = this.dressingRoomData.clothGameObjects.get(hatId);
    pet.hat.visible = true;
  }

  set cloths(getPetClothsResult) {
    const hats = this.dressingRoomData.hats;
    const cloths = this.dressingRoomData.cloths;
    const bows = this.dressingRoomData.bows;
    const menuClothGameObjects = this.dressingRoomData
        .menuClothGameObjects;

    const arr = getPetClothsResult.cloths;
    for (let cloth of arr) {
      const clothType = cloth.clothType;
      switch (clothType) {
      case 'HAT':
        hats.push(menuClothGameObjects.get(cloth.id));
        break;
      case 'CLOTH':
        cloths.push(menuClothGameObjects.get(cloth.id));
        break;
      case 'BOW':
        bows.push(menuClothGameObjects.get(cloth.id));
        break;
      }
    }
    const hatId = getPetClothsResult.hatId;
    const clothId = getPetClothsResult.clothId;
    const bowId = getPetClothsResult.bowId;
    if (hatId != null) {
      this.currentHat = hatId;
    }
    if (clothId != null) {
      this.currentCloth = clothId;
    }
    if (bowId != null) {
      this.currentBow = bowId;
    }
  }

  set dressingRoomView(dressingRoomView) {
    super.baseGameView = dressingRoomView;
    this.dressingRoomView = dressingRoomView;
  }

}
