// domain
import LabelGameObject from '../domain/LabelGameObject.js';
import BuildingGameObject from '../domain/BuildingGameObject.js';
import TileType from '../domain/TileType.js';
import HighlightGameObject from '../domain/HighlightGameObject.js';
import BoxGameObject from '../domain/BoxGameObject.js';
import PetGameObject from '../domain/PetGameObject.js';
import MachineWithDrinksInnerObject from './room/domain/MachineWithDrinksInnerObject.js';
import RefrigeratorInnerObject from './room/domain/RefrigeratorInnerObject.js';
import RoomData from '../domain/RoomData.js';
import BaseGameController from './BaseGameController.js';
import GameObject from '../domain/GameObject.js';
import Point from '../domain/Point.js';
import Dimension from '../domain/Dimension.js';
import ProgressBarGameObject from '../domain/ProgressBarGameObject.js';
import PopupMenuGameObject from '../domain/PopupMenuGameObject.js';
import MenuItem from '../domain/MenuItem.js';

//rest
import FoodType from '../rest/domain/FoodType.js';
import DrinkType from '../rest/domain/DrinkType.js';

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


export default class RoomController extends BaseGameController{

  roomData;
  roomView;
  petService;
  foodService;
  roomService;
  bookService;
  drinkService;

  gameController;
  
  
  getRoomInfoInProgress = false;

  showView() {

  }

  hideView() {

  }

  initialize() {
    super.initialize();
    this.roomView.addInitializationCompletedListener((sender, data) => {
      console.debug('RoomView initialization completed');
      this.getRoomInfo();
      this.getRoomInfoWithDelay();
      this.getBuildMenuCosts();
      this.getRucksackInner();
    });
    this.roomView.addClickedListener((sender, data) => {this.mouseClicked(sender, data);});
    this.roomData = new RoomData();
    this.initializeTilesEngineForRoom();

    const background = new GameObject();
    background.position = new Point(0, 0);
    background.z = -1;
    background.addMouseMoveListener((arg) => {
      this.roomView.showDefaultCursor();
      this.roomView.toolTipText = "";
      this.highlightObject = null;
    });
    
    const imgids = [[ResourceManager.IMAGE_ROOM_BACKGROUND]];
    background.animationImageIds = imgids;
    this.addGameObject(background);
    this.addGameObject(background);
    this.roomData.background = background;
    this.initRefrigerators();

    this.initializeBookcases();

    this.initializeMachineWithDrinksArray();
    
    // GameObject bedsidetable = new GameObject();
    // bedsidetable.setPosition(new Point(RoomData.ORIGINAL_BEDSIDETABLE_X,
    // RoomData.ORIGINAL_BEDSIDETABLE_Y));
    // bedsidetable.setVisible(false);
    // addGameObject(bedsidetable);
    // roomData.setBedsidetable(bedsidetable);
    //
    // GameObject tv = new GameObject();
    // tv.setPosition(new Point(RoomData.ORIGINAL_TV_X,
    // RoomData.ORIGINAL_TV_Y));
    // tv.setVisible(false);
    // addGameObject(tv);
    //
    // GameObject flower = new GameObject();
    // flower.setPosition(new Point(RoomData.ORIGINAL_FLOWER_X,
    // RoomData.ORIGINAL_FLOWER_Y));
    // addGameObject(flower);
    // roomData.setFlower(flower);

    this.initializeArrowRight();

    this.initializeNewbieBoxes();

    const pet = this.initializePetGameObject();

    pet.position = new Point(RoomData.ORIGINAL_PET_X, RoomData.ORIGINAL_PET_Y);
    this.roomData.pet = pet;

    const clothObjects = this.initializeClothGameObjects(); // Map<Integer, ClothGameObject> 
    for (const [key, value] of clothObjects.entries()) {
      const cgo = value;
      cgo.visible = false;
      cgo.position = new Point(RoomData.ORIGINAL_PET_X, RoomData.ORIGINAL_PET_Y);
    }
    this.roomData.clothObjects = clothObjects;

    this.initializeFood();

    this.initializeBook();

    this.initRefrigeratorInnerObjects();

    this.initializeBookcaseInnerObjects();

    this.initializeMachineWithDrinksInnerObjects();

    this.initializeRucksack();

    this.initializeBuildMenu();

    this.initializeJournal();

    this.initializeJournalOnFloor();

    this.roomData.refrigeratorInnerCounts = new Array(FoodType.VALUES_COUNT);
    this.roomData.machineWithDrinksInnerCounts = new Array(DrinkType.VALUES_COUNT);

    this.initializeMessageBox();
    this.initializeUpgrade();

    this.initializeIndicators();

    this.initializeRefrigeratorPopupMenu();
    this.initializeBookcasePopupMenu();
    this.initializeMachineWithDrinksPopupMenu();
    
    this.initializeAchievementInfo();
    
    this.roomView.roomData = this.roomData;
  }

  initializeIndicators() {
    const satietyLabel = new LabelGameObject();
    satietyLabel.visible = false;
    satietyLabel.position = new Point(10, 570);
    satietyLabel.text = this.messageSource.getMessage(StringConstants.FEED,
        null, null);
    this.addGameObject(satietyLabel);
    this.roomData.satietyLabel = satietyLabel;
    const satietyProgressBar = new ProgressBarGameObject();
    satietyProgressBar.visible = false;
    satietyProgressBar.position = new Point(100, 570);
    satietyProgressBar.dimension = new Dimension(100, 20);
    satietyProgressBar.maxValue = 100;
    this.addGameObject(satietyProgressBar);
    this.roomData.satietyProgressBar = satietyProgressBar;

    const drinkLabel = new LabelGameObject();
    drinkLabel.visible = false;
    drinkLabel.position = new Point(200, 570);
    drinkLabel.text = this.messageSource.getMessage(StringConstants.DRINK,
        null, null);
    this.addGameObject(drinkLabel);
    this.roomData.drinkLabel = drinkLabel;
    const drinkProgressBar = new ProgressBarGameObject();
    drinkProgressBar.visible = false;
    drinkProgressBar.position = new Point(300, 570);
    drinkProgressBar.dimension = new Dimension(100, 20);
    this.addGameObject(drinkProgressBar);
    this.roomData.drinkProgressBar = drinkProgressBar;

    const educationLabel = new LabelGameObject();
    educationLabel.visible = false;
    educationLabel.position = new Point(400, 570);
    educationLabel.text = this.messageSource.getMessage(StringConstants.TEACH,
        null, null);
    this.addGameObject(educationLabel);
    this.roomData.educationLabel = educationLabel;
    const educationProgressBar = new ProgressBarGameObject();
    educationProgressBar.visible = false;
    educationProgressBar.position = new Point(500, 570);
    educationProgressBar.dimension = new Dimension(100, 20);
    this.addGameObject(educationProgressBar);
    this.roomData.educationProgressBar = educationProgressBar;

    const moodLabel = new LabelGameObject();
    moodLabel.visible = false;
    moodLabel.position = new Point(600, 570);
    moodLabel.text = this.messageSource.getMessage(StringConstants.PLAY, null,
        null);
    this.addGameObject(moodLabel);
    this.roomData.moodLabel = moodLabel;
    const moodProgressBar = new ProgressBarGameObject();
    moodProgressBar.visible = false;
    moodProgressBar.position = new Point(700, 570);
    moodProgressBar.dimension = new Dimension(100, 20);
    this.addGameObject(moodProgressBar);
    this.roomData.moodProgressBar = moodProgressBar;

    const progressBar = new ProgressBarGameObject();
    progressBar.visible = false;
    progressBar.position = new Point(300, 500);
    progressBar.dimension = new Dimension(200, 20);
    this.addGameObject(progressBar);
    this.roomData.progressBar = progressBar;
  }

  initializeRucksack() {
    const rucksack = super.initializeRucksack();
    rucksack.visible = false;
    return rucksack;
  }

  initializeJournal() {
    super.initializeJournal();
    this.journal.close
        .addClickedListener((journalCloseClickedListenerArg) => {
          this.journalCloseClicked();
        });
    this.journal.visible = false;
  }


//  private class JournalCloseBackgroundWork extends
//      BackgroundWork<Void, Void, Void> {

//    @Override
//    public Void doInBackground() throws Exception {
//      roomService.journalClosed();
//      return null;
//    }

//    @Override
//    public void completed(Void result) {
//      getRoomInfo();
//    }

//    @Override
//    public void failed(Exception ex) {
//      log.error("journalCloseBackgroundWork failed.", ex);
//      trayIcon.showTrayMessage(
//          messageSource.getMessage(StringConstants.ERROR, null, null),
//          MessageType.ERROR);
//    }
//  }

  journalCloseClicked() {
    const work = new BackgroundWork();
    work.failed = (ex) => {
      console.error("journalCloseBackgroundWork failed %o.", ex);
      this.trayIcon.showTrayMessage(
      this.messageSource.getMessage(StringConstants.ERROR, null, null),
          MessageType.ERROR);
    }
    work.doInBackground = () => {
      this.roomService.journalClosed();
      return null;
    }
    work.completed = (journalCloseClicked) => {
      // we need to somehow synchronize calls of getRoomInfo in JavaScript
      // We cannot do it the way we did in in Java
      // getRoomInfo();
    }
    work.argument = null;
    work.view = this.roomView;
    const ces = new ConnectionExceptionSettings();
    ces.restart = true;
    work.connectionExceptionSettings = ces;
    this.backgroundWorkManager.startBackgroundWork(work);
  }

//  private class GetJournalEntriesBackgroundWork extends
//      BackgroundWork<Void, GetPetJournalEntriesResult, Void> {
//
//    @Override
//    public GetPetJournalEntriesResult doInBackground() throws Exception {
//      return journalEntryService.getPetJournalEntries(2);
//    }
//
//    @Override
//    public void completed(GetPetJournalEntriesResult result) {
//      PetJournalEntry[] entries = result.getEntries();
//      if (entries.length > 1) {
//        getJournal().getLeftText().setText(
//            messageSource.getMessage(
//                "JOURNAL_ENTRY_"
//                    + String.valueOf(entries[1].getCode()),
//                null, null));
//        getJournal().getRightText().setText(
//            messageSource.getMessage(
//                "JOURNAL_ENTRY_"
//                    + String.valueOf(entries[0].getCode()),
//                null, null));
//      } else if (entries.length == 1) {
//        getJournal().getLeftText().setText(
//            messageSource.getMessage(
//                "JOURNAL_ENTRY_"
//                    + String.valueOf(entries[0].getCode()),
//                null, null));
//        getJournal().getRightText().setText("");
//      } else {
//        getJournal().getLeftText().setText("");
//        getJournal().getRightText().setText("");
//      }
//    }
//
//    @Override
//    public void failed(Exception ex) {
//      log.error("GetJournalEntriesBackgroundWork failed.", ex);
//      trayIcon.showTrayMessage(
//          messageSource.getMessage(StringConstants.ERROR, null, null),
//          MessageType.ERROR);
//    }
//  }

//  private void getJournalEntries() {
//    GetJournalEntriesBackgroundWork work = new GetJournalEntriesBackgroundWork();
//    work.setArgument(null);
//    work.setView(roomView);
//    ConnectionExceptionSettings ces = new ConnectionExceptionSettings();
//    ces.setRestart(true);
//    work.setConnectionExceptionSettings(ces);
//    backgroundWorkManager.startBackgroundWork(work);
//  }

  initializeJournalOnFloor() {
    const journalOnFloor = new HighlightGameObject();
    const imgids = [[ ResourceManager.IMAGE_JOURNAL ],
        [ ResourceManager.IMAGE_JOURNAL_HIGHLIGHT ]];
    journalOnFloor.animationImageIds = imgids;
    journalOnFloor.position = new Point(
        RoomData.ORIGINAL_JOURNAL_ON_FLOOR_X,
        RoomData.ORIGINAL_JOURNAL_ON_FLOOR_Y);
    journalOnFloor.visible = false;
    journalOnFloor.addMouseMoveListener((journalOnFloorMouseMoveArg) => {
      console.debug('journalOnFloor mouseMove');
      this.highlightObject = journalOnFloor;
      this.roomView.showHandCursor();
      this.roomView.toolTipText = "";
    });
    journalOnFloor.addClickedListener((journalOnFloorClickedArg) => {
      console.debug('journalOnFloor clicked');
      const petTileCoordinates = this.tilesEngine
          .translateToTileCoordinates(this.roomData.pet);
      const journalOnFloorTileCoordinates = this.tilesEngine
          .translateToTileCoordinates(journalOnFloor);

      const tilesPath = this.tilesEngine.findPath(petTileCoordinates,
          journalOnFloorTileCoordinates);
      const path = new Array(tilesPath.length);
      for (let n = 0; n < tilesPath.length; n++) {
        path[n] = this.tilesEngine
            .translateFromTileCoordinates(tilesPath[n]);
      }
      this.roomData.situation = RoomData.SITUATION_COLLECTING_JOURNAL;
      this.roomData.pet.setMove(path, () => {

        this.showProgressBar(100, (a) => {
          this.pickJournalOnFloor();
          this.roomData.situation =RoomData.SITUATION_NORMAL;
        });
      });
    });
    this.addGameObject(journalOnFloor);
    this.roomData.journalOnFloor = journalOnFloor;
  }

//  private class PickJournalOnFloorBackgroundWork extends
//      BackgroundWork<Void, Void, Void> {

//    @Override
//    public Void doInBackground() throws Exception {
//      roomService.pickJournalOnFloor();
//      return null;
//    }

//    @Override
//    public void completed(Void result) {
//      getRoomInfo();
//      roomData.getJournalOnFloor().setVisible(false);
//    }

//    @Override
//    public void failed(Exception ex) {
//      log.error("PickJournalOnFloorBackgroundWork failed.", ex);
//      trayIcon.showTrayMessage(
//          messageSource.getMessage(StringConstants.ERROR, null, null),
//          MessageType.ERROR);
//    }
//  }

  pickJournalOnFloor() {
    const work = new BackgroundWork();
    work.failed = (ex) => {
      console.error("PickJournalOnFloorBackgroundWork failed %s.", ex);
      this.trayIcon.showTrayMessage(
          this.messageSource.getMessage(StringConstants.ERROR, null, null),
          MessageType.ERROR);
    };
    work.completed = (pickJournalOnFloorResult) => {
      this.getRoomInfo();
      this.roomData.journalOnFloor.visible = false;
    };
    work.doInBackground = () => {
      this.roomService.pickJournalOnFloor();
    };
    work.view = this.roomView;
    const ces = new ConnectionExceptionSettings();
    ces.restart = true;
    work.connectionExceptionSettings = ces;
    this.backgroundWorkManager.startBackgroundWork(work);
  }

  initializeBookcaseInnerObjects() {
    const bookcaseInner = new GameObject();
    bookcaseInner.position = new Point(0, 0);
    bookcaseInner.z = BaseGameController.MENU_Z_ORDER;
    const imgids = [[ ResourceManager.IMAGE_ROOM_BOOKCASE_INNER ]];
    bookcaseInner.animationImageIds = imgids;
    bookcaseInner.visible = false;
    bookcaseInner.addMouseMoveListener((mouseMoveArg) => {
      this.roomView.showDefaultCursor();
      this.highlightObject = null;
      this.roomView.toolTipText = "";
    });
    this.addGameObject(bookcaseInner);
    this.roomData.bookcaseInner = bookcaseInner;

    const bookcaseInnerItems = new Array(RoomData.BOOKCASE_MAX_LEVEL);
    this.roomData.bookcaseInnerBooks = new Array(RoomData.MAX_BOOKS_COUNT);
    for (let n = 0; n < RoomData.BOOKCASE_MAX_LEVEL; n++) {
      const go = new GameObject();
      go.position = new Point(RoomData.ORIGINAL_BOOKCASE_INNER_X, n * 100);
      go.z = BaseGameController.MENU_Z_ORDER;
      go.animationImageIds = [[ ResourceManager.IMAGE_ROOM_BOOKCASE_INNER_ITEM ]];
      go.visible = false;
      go.addMouseMoveListener((mouseMoveArg) => {
        this.roomView.showDefaultCursor();
        this.highlightObject = null;
        this.roomView.toolTipTex = "";
      });
      this.addGameObject(go);
      bookcaseInnerItems[n] = go;
    }
    this.roomData.bookcaseInnerItems = bookcaseInnerItems;

    const bookcaseClose = new HighlightGameObject();
    bookcaseClose.position = new Point(RoomData.ORIGINAL_BOOKCASE_CLOSE_X,
        RoomData.ORIGINAL_BOOKCASE_CLOSE_Y);
    bookcaseClose.z = BaseGameController.MENU_Z_ORDER + 1;
    bookcaseClose.animationImageIds = [[ResourceManager.IMAGE_ROOM_BOOKCASE_CLOSE], [ResourceManager.IMAGE_ROOM_BOOKCASE_CLOSE_HIGHLIGHT]];
    bookcaseClose.visible = false;
    bookcaseClose.addMouseMoveListener((mouseMoveArg) => {
      this.roomView.showHandCursor();
      this.highlightObject = bookcaseClose;
      this.roomView.toolTipText = "";
    });
    bookcaseClose.addClickedListener((clickedArg) => {
      setBookcaseInnerVisible(false);
    });
    this.addGameObject(bookcaseClose);
    this.roomData.bookcaseClose = bookcaseClose;

    const bookcaseInnerObjects = new Array(18);
    this.roomData.bookcaseInnerObjects = bookcaseInnerObjects;
    this.initializeBookcaseInnerObject(0, ResourceManager.IMAGE_BOOK_1);
    this.initializeBookcaseInnerObject(1, ResourceManager.IMAGE_BOOK_2);
    this.initializeBookcaseInnerObject(2, ResourceManager.IMAGE_BOOK_3);
    this.initializeBookcaseInnerObject(3, ResourceManager.IMAGE_BOOK_4);
    this.initializeBookcaseInnerObject(4, ResourceManager.IMAGE_BOOK_5);
    this.initializeBookcaseInnerObject(5, ResourceManager.IMAGE_BOOK_6);
    this.initializeBookcaseInnerObject(6, ResourceManager.IMAGE_BOOK_7);
    this.initializeBookcaseInnerObject(7, ResourceManager.IMAGE_BOOK_8);
    this.initializeBookcaseInnerObject(8, ResourceManager.IMAGE_BOOK_9);
    this.initializeBookcaseInnerObject(9, ResourceManager.IMAGE_BOOK_10);
    this.initializeBookcaseInnerObject(10, ResourceManager.IMAGE_BOOK_11);
    this.initializeBookcaseInnerObject(11, ResourceManager.IMAGE_BOOK_12);
    this.initializeBookcaseInnerObject(12, ResourceManager.IMAGE_BOOK_13);
    this.initializeBookcaseInnerObject(13, ResourceManager.IMAGE_BOOK_14);
    this.initializeBookcaseInnerObject(14, ResourceManager.IMAGE_BOOK_15);
    this.initializeBookcaseInnerObject(15, ResourceManager.IMAGE_BOOK_16);
    this.initializeBookcaseInnerObject(16, ResourceManager.IMAGE_BOOK_17);
    this.initializeBookcaseInnerObject(17, ResourceManager.IMAGE_BOOK_18);
  }

  initializeBookcaseInnerObject(bookId, resourceId) {
    const go = new GameObject();

    const x = RoomData.ORIGINAL_BOOKCASE_INNER_OBJECT_X + (bookId % 3)
        * RoomData.ORIGINAL_BOOKCASE_INNER_OBJECT_STEP_X;
    const y = RoomData.ORIGINAL_BOOKCASE_INNER_OBJECT_Y + bookId / 3
        * RoomData.ORIGINAL_BOOKCASE_INNER_OBJECT_STEP_Y;
    go.position = new Point(x, y);

    go.z = BaseGameController.MENU_Z_ORDER + 1;
    const imgids = [[ resourceId ]];
    go.animationImageIds = imgids;
    go.addMouseMoveListener((mouseMoveArg) => {
      roomView.showHandCursor();
      roomView.setToolTipText("");
    });
    go.addClickedListener((clickedArg) => {
      this.bookcaseInnerVisible = false;
      const pet = roomData.pet;
      pet.position = new Point(RoomData.ORIGINAL_PET_X,
          RoomData.ORIGINAL_PET_Y);
      pet.setMove(null, null, null);
      pet.state = PetGameObject.STATE_EDUCATION;
      const book = roomData.book;
      book.state = bookId;
      book.visible = true;
      book.z = pet.z + 1;
      const food = roomData.food;
      food.visible = false;
      this.roomData.situation =RoomData.SITUATION_ANIMATION;
      this.showProgressBar(
          100,
          (progressBarAnimationOverArg) => {
            this.roomData.situation =RoomData.SITUATION_NORMAL;
            book.visible = false;
            pet.state = PetGameObject.STATE_NORMAL;
            this.education();
            const educationProgressBar = this.roomData
                .educationProgressBar;
            this.educationProgressBar.value = educationProgressBar
                .maxValue;
          });
    });
    go.visible = false;
    this.addGameObject(go);
    this.roomData.bookcaseInnerObjects[bookId] = go;
  }

  initializeArrowRight() {
    const arrowRight = new HighlightGameObject();
    const imgids = [[ ResourceManager.IMAGE_ROOM_ARROW_RIGHT ], [ ResourceManager.IMAGE_ROOM_ARROW_RIGHT_HIGHLIGHT ]];
    arrowRight.animationImageIds = imgids;
    arrowRight.position = new Point(RoomData.ORIGINAL_ARROW_RIGHT_X,
        RoomData.ORIGINAL_ARROW_RIGHT_Y);
    arrowRight.addMouseMoveListener((mouseMoveArg) => {
      this.roomView.showHandCursor();
      this.roomView.setToolTipText("");
      this.highlightObject = arrowRight;
    });
    arrowRight.addClickedListener((clickedArg) => {
      gameController.showTown();
    });
    this.addGameObject(arrowRight);
    this.roomData.arrowRight = arrowRight;
  }

  initializeBookcases() {
    const bookcases = new Array(RoomData.BOOKCASE_MAX_LEVEL);
    for (let n = 0; n < RoomData.BOOKCASE_MAX_LEVEL; n++) {
      bookcases[n] = this.initializeBookcase(n + 1);
    }
    this.roomData.bookcases = bookcases;
  }

  initializeMachineWithDrinksArray() {
    const machineWithDrinksArray = new Array(RoomData.MACHINE_WITH_DRINKS_MAX_LEVEL);
    for (let n = 0; n < RoomData.MACHINE_WITH_DRINKS_MAX_LEVEL; n++) {
      machineWithDrinksArray[n] = this.initializeMachineWithDrinks(n + 1);
    }
    this.roomData.machineWithDrinksArray = machineWithDrinksArray;
  }

  initializeBookcase(bookcaseLevelId) {
    const bookcase = new BuildingGameObject();
    bookcase.dimension = new Dimension(RoomData.ORIGINAL_BOOKCASE_WIDTH,
        RoomData.ORIGINAL_BOOKCASE_HEIGHT);
    bookcase.position = new Point(RoomData.ORIGINAL_BOOKCASE_X,
        RoomData.ORIGINAL_BOOKCASE_Y);
    const imgids = [[  ResourceManager.IMAGE_ROOM_BOOKCASE_1 + bookcaseLevelId - 1],
        [ ResourceManager.IMAGE_ROOM_BOOKCASE_HIGHLIGHT_1 + bookcaseLevelId - 1]];
    bookcase.animationImageIds = imgids;
    bookcase.addClickedListener((clickedArg) => {
      bookcaseClicked(arg);
    });
    bookcase.addMouseMoveListener((mouseMoveArg) => {
      this.roomView.showHandCursor();
      this.roomView.setToolTipText(getMessageSource().getMessage(
          StringConstants.TEACH, null, null));
      this.highlightObject = bookcase;
    });
    bookcase.addBuildListener(() => {
      this.roomData.situation =RoomData.SITUATION_NORMAL;
      const tilesPosition = new Point();
      const point = this.tilesEngine.translateToTileCoordinates(bookcase);
      tilesPosition.x = point.x;
      tilesPosition.y = point.y;
      this.buildBookcase(tilesPosition);
    });
    bookcase.addUpgradeListener(() => {
      this.roomData.situation =RoomData.SITUATION_NORMAL;
      this.upgradeBookcase();
    });
    bookcase.addMoveListener(() => {
      roomData.situation =RoomData.SITUATION_NORMAL;
      const tilesPosition = new Point();
      const point = this.tilesEngine.translateToTileCoordinates(bookcase);
      tilesPosition.x = point.x;
      tilesPosition.y = point.y;
      moveBookcase(tilesPosition);
    });
    bookcase.tileTypes = [[ TileType.NORMAL, TileType.NORMAL, TileType.WALL ],
        [ TileType.NORMAL, TileType.NORMAL, TileType.WALL ]];
    bookcase.visible = false;
    this.addGameObject(bookcase);
    return bookcase;
  }

  mouseClicked(arg) {
    const logicalMousePosition = arg.mousePosition;
    const mouseX = logicalMousePosition.x;
    const mouseY = logicalMousePosition.y;
    const pet = this.roomData.pet;
    switch (this.roomData.situation) {
    case RoomData.SITUATION_NORMAL:
      if (this.buildMenu.inner.visible
          || this.rucksack.inner.visible
          || this.pet.movePath != null) {
        return;
      }
      let x = mouseX;
      let y = mouseY;
      if (logicalMousePosition.y < RoomData.ORIGINAL_TILES_START_Y) {
        y = RoomData.ORIGINAL_TILES_START_Y;
      }

      const moveTilesTarget = this.tilesEngine
          .translateToTileCoordinates(x, y);

      if (this.tilesEngine.checkTileCoordinate(moveTilesTarget)
          && this.tilesEngine.getTileType(moveTilesTarget) === TileType.NORMAL) {
        const petTileCoordinates = this.tilesEngine
            .translateToTileCoordinates(pet);
        const tilesMovePath = this.tilesEngine.findPath(
            petTileCoordinates, moveTilesTarget);
        if (tilesMovePath != null) {
          const movePath = new Array(tilesMovePath.length);
          for (let n = 0; n < tilesMovePath.length; n++) {
            movePath[n] = this.tilesEngine.translateFromTileCoordinates(pet,
                tilesMovePath[n]);
          }
          pet.setMove(movePath);
        }
      }

      break;
    default:
      break;
    }
  }

  initializeBookcasePopupMenu() {
    const bookcasePopupMenu = new PopupMenuGameObject();

    const bookcaseMenuItems = [];
    const bookcaseUseItem = new MenuItem();
    bookcaseUseItem.text = this.messageSource.getMessage(
        StringConstants.USE, null, null);
    bookcaseUseItem.addClickedListener((arg) => {
      this.bookcaseInnerVisible = true;
    });
    bookcaseMenuItems.push(bookcaseUseItem);

    const bookcaseUpgradeItem = new MenuItem();
    bookcaseUpgradeItem.text = this.messageSource.getMessage(
        StringConstants.UPGRADE, null, null);
    bookcaseUpgradeItem.addClickedListener((arg) => RoomControllerImpl.this
        .showUpgradeBookcase());
    bookcaseMenuItems.push(bookcaseUpgradeItem);

    const bookcaseMoveItem = new MenuItem();
    bookcaseMoveItem.text = this.messageSource.getMessage(
        StringConstants.MOVE, null, null);
    bookcaseMoveItem.addClickedListener((bookcaseMoveClickedArg) => {
      this.roomData.setSituation(SITUATION_MOVE_BOOKCASE);
      this.startMove(roomData.getBookcase());
    });
    bookcaseMenuItems.push(bookcaseMoveItem);
    bookcasePopupMenu.menuItems = bookcaseMenuItems;
    bookcasePopupMenu.visible = false;
    this.addGameObject(bookcasePopupMenu);
    this.roomData.bookcasePopupMenu = bookcasePopupMenu;
  }

  showUpgradeBookcase() {
    try {
      this.roomData.situation =RoomData.SITUATION_UPGRADE_BOOKCASE_COST;
      const text = this.messageSource.getMessage(StringConstants.BOOKCASE,
          null, null);
      const newBookcaseId = roomData.bookcaseId + 1;
      const costs = this.roomData
          .buildMenuCosts.bookcaseCosts
          .get(newBookcaseId - 1);
      this.showUpgrade(text, costs, (aaa) => {
        this.startUpgrade(roomData.bookcase);
      }, (bbb) => {
        roomData.setSituation(SITUATION_NORMAL);
      });

    } catch (ex) {
      console.error("showUpgradeRefrigerator failed. %o", ex);
      const message = this.messageSource.getMessage(
          StringConstants.ERROR, null, null);
      this.trayIcon.showTrayMessage(message, MessageType.ERROR);
    }
  }

  showUpgradeMachineWithDrinks() {
    try {

      this.roomData.situation =RoomData.SITUATION_UPGRADE_MACHINE_WITH_DRINKS_COST;
      const text = this.messageSource.getMessage(StringConstants.DRINK, null, null);
      const newMachineWithDrinksId = this.roomData.machineWithDrinksId + 1;
      const costs = roomData
          .buildMenuCosts.machineWithDrinksCosts
          .get(newMachineWithDrinksId - 1);
      this.showUpgrade(text, costs, (aaa) => {
        this.startUpgrade(roomData.machineWithDrinks);
      }, (bbb) => {
        this.roomData.situation =RoomData.SITUATION_NORMAL;
      });

    } catch (ex) {
      console.error("showUpgradeRefrigerator failed. %o", ex);
      const message = this.messageSource.getMessage(StringConstants.ERROR, null, null);
      this.trayIcon.showTrayMessage(message, MessageType.ERROR);
    }
  }

  initializeMachineWithDrinks(level) {
    const machineWithDrinks = new BuildingGameObject();
    machineWithDrinks.dimension = new Dimension(
        RoomData.ORIGINAL_DRINK_WIDTH, RoomData.ORIGINAL_DRINK_HEIGHT);
    const imgids = [[ResourceManager.IMAGE_ROOM_MACHINE_WITH_DRINKS_1
        + level - 1 ], [ ResourceManager.IMAGE_ROOM_MACHINE_WITH_DRINKS_1_HIGHLIGHT
        + level - 1 ]];
    machineWithDrinks.animationImageIds = imgids;
    machineWithDrinks.position = new Point(RoomData.ORIGINAL_WATER_X,
        RoomData.ORIGINAL_WATER_Y);
    machineWithDrinks.addMouseMoveListener((mouseMoveArg) => {
      roomView.showHandCursor();
      roomView.setToolTipText(getMessageSource().getMessage(
          StringConstants.DRINK, null, null));
      setHighlightObject(machineWithDrinks);
    });
    machineWithDrinks.addClickedListener((clickedArg) => {
      drinkClicked(arg);
    });
    machineWithDrinks
        .addBuildListener(() => {
          roomData.situation =RoomData.SITUATION_NORMAL;
          const tilesPosition = new Point();
          const point = this.tilesEngine
              .translateToTileCoordinates(machineWithDrinks);
          tilesPosition.x = point.x;
          tilesPosition.y = point.y;
          this.buildMachineWithDrinks(tilesPosition);
        });
    machineWithDrinks.addUpgradeListener(() => {
      this.roomData.situation =RoomData.SITUATION_NORMAL;
      this.upgradeMachineWithDrinks();
    });
    machineWithDrinks
        .addMoveListener(() => {
          roomData.situation =RoomData.SITUATION_NORMAL;
          const tilesPosition = new Point();
          const point = this.tilesEngine
              .translateToTileCoordinates(machineWithDrinks);
          tilesPosition.x = point.x;
          tilesPosition.y = point.y;
          this.moveMachineWithDrinks(tilesPosition);
        });
    machineWithDrinks.tileTypes = [[ TileType.NORMAL,
        TileType.NORMAL, TileType.WALL ]];
    machineWithDrinks.visible = false;
    this.addGameObject(machineWithDrinks);
    this.roomData.machineWithDrinks = machineWithDrinks;
    return machineWithDrinks;
  }

//  private class UpgradeMachineWithDrinksBackgroundWork extends
//      BackgroundWork<Void, Void, Void> {
//
//    @Override
//    public Void doInBackground() throws Exception {
//      roomService.upgradeMachineWithDrinks();
//      return null;
//    }
//
//    @Override
//    public void completed(Void result) {
//      getRoomInfo();
//    }
//
//    @Override
//    public void failed(Exception ex) {
//      log.error("UpgradeMachineWithDrinks failed", ex);
//      trayIcon.showTrayMessage(
//          messageSource.getMessage(StringConstants.ERROR, null, null),
//          MessageType.ERROR);
//    }
//  }

  upgradeMachineWithDrinks() {
    //const work = new UpgradeMachineWithDrinksBackgroundWork();
    //work.view = roomView;
    //const ces = new ConnectionExceptionSettings();
    //ces.restart = true;
    //work.connectionExceptionSettings = ces;
    //backgroundWorkManager.startBackgroundWork(work);
  }

  initializeFood() {
    const food = new GameObject();
    food.position = new Point(RoomData.ORIGINAL_FOOD_X,
        RoomData.ORIGINAL_FOOD_Y);
    food.visible = false;
    const imgids = new Array(20);
    imgids[RoomData.FOOD_CARROT] = this.initializeFoodImageIds(
        ResourceManager.IMAGE_CARROT_1,
        ResourceManager.IMAGE_CARROT_2,
        ResourceManager.IMAGE_CARROT_3,
        ResourceManager.IMAGE_CARROT_4,
        ResourceManager.IMAGE_CARROT_5,
        ResourceManager.IMAGE_CARROT_6);
    imgids[RoomData.FOOD_DRY_FOOD] = this.initializeFoodImageIds(ResourceManager.IMAGE_DRY_FOOD_1);
    imgids[RoomData.FOOD_FISH] = this.initializeFoodImageIds(
        ResourceManager.IMAGE_FISH_1,
        ResourceManager.IMAGE_FISH_2,
        ResourceManager.IMAGE_FISH_3,
        ResourceManager.IMAGE_FISH_4,
        ResourceManager.IMAGE_FISH_5);
    imgids[RoomData.FOOD_ICE_CREAM] = this.initializeFoodImageIds(
        ResourceManager.IMAGE_ICE_CREAM_1,
        ResourceManager.IMAGE_ICE_CREAM_2,
        ResourceManager.IMAGE_ICE_CREAM_3,
        ResourceManager.IMAGE_ICE_CREAM_4,
        ResourceManager.IMAGE_ICE_CREAM_5,
        ResourceManager.IMAGE_ICE_CREAM_6);
    imgids[RoomData.FOOD_APPLE] = this.initializeFoodImageIds(
        ResourceManager.IMAGE_APPLE_1,
        ResourceManager.IMAGE_APPLE_2,
        ResourceManager.IMAGE_APPLE_3,
        ResourceManager.IMAGE_APPLE_4,
        ResourceManager.IMAGE_APPLE_5);
    imgids[RoomData.FOOD_CABBAGE] = this.initializeFoodImageIds(
        ResourceManager.IMAGE_CABBAGE_1,
        ResourceManager.IMAGE_CABBAGE_2,
        ResourceManager.IMAGE_CABBAGE_3,
        ResourceManager.IMAGE_CABBAGE_4,
        ResourceManager.IMAGE_CABBAGE_5,
        ResourceManager.IMAGE_CABBAGE_6);
    imgids[RoomData.FOOD_CHOCOLATE] = this.initializeFoodImageIds(
        ResourceManager.IMAGE_CHOCOLATE_1,
        ResourceManager.IMAGE_CHOCOLATE_2,
        ResourceManager.IMAGE_CHOCOLATE_3,
        ResourceManager.IMAGE_CHOCOLATE_4,
        ResourceManager.IMAGE_CHOCOLATE_5);
    imgids[RoomData.FOOD_FRENCH_FRIES] = this.initializeFoodImageIds(
        ResourceManager.IMAGE_FRENCH_FRIES_1,
        ResourceManager.IMAGE_FRENCH_FRIES_2,
        ResourceManager.IMAGE_FRENCH_FRIES_3,
        ResourceManager.IMAGE_FRENCH_FRIES_4,
        ResourceManager.IMAGE_FRENCH_FRIES_5,
        ResourceManager.IMAGE_FRENCH_FRIES_6);
    imgids[RoomData.FOOD_JAPANESE_ROLL] = this.initializeFoodImageIds(
        ResourceManager.IMAGE_JAPANESE_ROLLS_1,
        ResourceManager.IMAGE_JAPANESE_ROLLS_2,
        ResourceManager.IMAGE_JAPANESE_ROLLS_3,
        ResourceManager.IMAGE_JAPANESE_ROLLS_4,
        ResourceManager.IMAGE_JAPANESE_ROLLS_5,
        ResourceManager.IMAGE_JAPANESE_ROLLS_6);
    imgids[RoomData.FOOD_PIE] = this.initializeFoodImageIds(
        ResourceManager.IMAGE_PIE_1,
        ResourceManager.IMAGE_PIE_2,
        ResourceManager.IMAGE_PIE_3,
        ResourceManager.IMAGE_PIE_4,
        ResourceManager.IMAGE_PIE_5,
        ResourceManager.IMAGE_PIE_6,
        ResourceManager.IMAGE_PIE_7);

    imgids[RoomData.FOOD_POTATOES] = this.initializeFoodImageIds(
        ResourceManager.IMAGE_POTATOES_1,
        ResourceManager.IMAGE_POTATOES_2,
        ResourceManager.IMAGE_POTATOES_3,
        ResourceManager.IMAGE_POTATOES_4,
        ResourceManager.IMAGE_POTATOES_5,
        ResourceManager.IMAGE_POTATOES_6,
        ResourceManager.IMAGE_POTATOES_7,
        ResourceManager.IMAGE_POTATOES_8);

    imgids[RoomData.FOOD_SANDWICH] = this.initializeFoodImageIds(
        ResourceManager.IMAGE_SANDWICH_1,
        ResourceManager.IMAGE_SANDWICH_2,
        ResourceManager.IMAGE_SANDWICH_3,
        ResourceManager.IMAGE_SANDWICH_4,
        ResourceManager.IMAGE_SANDWICH_5,
        ResourceManager.IMAGE_SANDWICH_6);
    imgids[RoomData.FOOD_BANANA] = this.initializeFoodImageIds(
        ResourceManager.IMAGE_BANANA_1,
        ResourceManager.IMAGE_BANANA_2,
        ResourceManager.IMAGE_BANANA_3,
        ResourceManager.IMAGE_BANANA_4,
        ResourceManager.IMAGE_BANANA_5,
        ResourceManager.IMAGE_BANANA_6);

    imgids[RoomData.FOOD_WATERMELON] = this.initializeFoodImageIds(
        ResourceManager.IMAGE_WATERMELON_1,
        ResourceManager.IMAGE_WATERMELON_2,
        ResourceManager.IMAGE_WATERMELON_3,
        ResourceManager.IMAGE_WATERMELON_4,
        ResourceManager.IMAGE_WATERMELON_5,
        ResourceManager.IMAGE_WATERMELON_6,
        ResourceManager.IMAGE_WATERMELON_7,
        ResourceManager.IMAGE_WATERMELON_8);
    imgids[RoomData.FOOD_DRINK] = this.initializeFoodImageIds(
        ResourceManager.IMAGE_WATER_1,
        ResourceManager.IMAGE_WATER_2,
        ResourceManager.IMAGE_WATER_3,
        ResourceManager.IMAGE_WATER_4,
        ResourceManager.IMAGE_WATER_5);
    imgids[RoomData.FOOD_DRINK + 1] = this.initializeFoodImageIds(
        ResourceManager.IMAGE_MILK_1,
        ResourceManager.IMAGE_MILK_2,
        ResourceManager.IMAGE_MILK_3,
        ResourceManager.IMAGE_MILK_4,
        ResourceManager.IMAGE_MILK_5);
    imgids[RoomData.FOOD_DRINK + 2] = this.initializeFoodImageIds(ResourceManager.IMAGE_BOTTLE_1);
    imgids[RoomData.FOOD_DRINK + 3] = this.initializeFoodImageIds(
        ResourceManager.IMAGE_TEA_1,
        ResourceManager.IMAGE_TEA_2,
        ResourceManager.IMAGE_TEA_3);
    imgids[RoomData.FOOD_DRINK + 4] = this.initializeFoodImageIds(
        ResourceManager.IMAGE_COFFEE_1,
        ResourceManager.IMAGE_COFFEE_2,
        ResourceManager.IMAGE_COFFEE_3);
    imgids[RoomData.FOOD_DRINK + 5] = this.initializeFoodImageIds(
        ResourceManager.IMAGE_ORANGE_JUICE_1,
        ResourceManager.IMAGE_ORANGE_JUICE_2,
        ResourceManager.IMAGE_ORANGE_JUICE_3,
        ResourceManager.IMAGE_ORANGE_JUICE_4,
        ResourceManager.IMAGE_ORANGE_JUICE_5);
    food.animationImageIds = imgids;
    food.loopAnimation = true;
    this.addGameObject(food);
    this.roomData.food = food;
  }

  initializeFoodImageIds(...ids) {
    const COUNT = 100;
    const result = new Array(COUNT);
    for (let n = 0; n < COUNT; n++) {
      result[n] = ids[ Math.floor(n / COUNT * ids.length)];
    }
    return result;
  }

  initializeRefrigeratorPopupMenu() {
    const refrigeratorPopupMenu = new PopupMenuGameObject();
    const refrigeratorMenuItems = [];
    const refrigeratorUseItem = new MenuItem();
    refrigeratorUseItem.text = this.messageSource.getMessage(
        StringConstants.USE, null, null);
    refrigeratorUseItem.addClickedListener((arg) => this
        .refrigeratorInnerVisible = true);
    refrigeratorMenuItems.push(refrigeratorUseItem);
    const refrigeratorUpgradeItem = new MenuItem();
    refrigeratorUpgradeItem.text = this.messageSource.getMessage(
        StringConstants.UPGRADE, null, null);
    refrigeratorUpgradeItem
        .addClickedListener((arg) => this
            .showUpgradeRefrigerator());
    refrigeratorMenuItems.push(refrigeratorUpgradeItem);
    const refrigeratorMoveItem = new MenuItem();
    refrigeratorMoveItem.text = this.messageSource.getMessage(
        StringConstants.MOVE, null, null);
    refrigeratorMoveItem.addClickedListener((arg) => {
      this.roomData.situation =RoomData.SITUATION_MOVE_REFRIGERATOR;
      this.startMove(this.roomData.getRefrigerator());
    });
    refrigeratorPopupMenu.menuItems = refrigeratorMenuItems;
    refrigeratorMenuItems.push(refrigeratorMoveItem);

    this.addGameObject(refrigeratorPopupMenu);
    this.roomData.refrigeratorPopupMenu = refrigeratorPopupMenu;
  }

//  private class GetBuildMenuCostsBackgroundWork extends
//      BackgroundWork<Void, RoomBuildMenuCosts, Void> {
//
//    @Override
//    public RoomBuildMenuCosts doInBackground() throws Exception {
//      return roomService.getBuildMenuCosts();
//    }
//
//    @Override
//    public void completed(RoomBuildMenuCosts result) {
//      RoomControllerImpl.this.setBuildMenuCosts(result);
//    }
//
//    @Override
//    public void failed(Exception ex) {
//      log.error("GetBuildMenuCostsBackgroundWork failed", ex);
//      String message = messageSource.getMessage(StringConstants.ERROR,
//          null, null) + ":" + ex.toString();
//      trayIcon.showTrayMessage(message, MessageType.ERROR);
//    }
//
//  }

  getBuildMenuCosts() {
    //GetBuildMenuCostsBackgroundWork work = new GetBuildMenuCostsBackgroundWork();
    //work.setView(roomView);
    //ConnectionExceptionSettings ces = new ConnectionExceptionSettings();
    //ces.setRestart(true);
    //work.setConnectionExceptionSettings(ces);
    //backgroundWorkManager.startBackgroundWork(work);
  }

//  private class MoveMachineWithDrinksBackgroundWork
//      extends
//      BackgroundWork<ru.urvanov.virtualpets.shared.domain.Point, Void, Void> {
//
//    @Override
//    public Void doInBackground() throws Exception {
//      roomService.moveMachineWithDrinks(getArgument());
//      return null;
//    }
//
//    @Override
//    public void completed(Void result) {
//      getRoomInfo();
//    }
//
//    @Override
//    public void failed(Exception ex) {
//      log.error("MoveMachineWithDrinksBackgroundWork failed", ex);
//      String message = messageSource.getMessage(StringConstants.ERROR,
//          null, null) + ":" + ex.toString();
//      trayIcon.showTrayMessage(message, MessageType.ERROR);
//      getRoomInfo();
//    }
//  }

  moveMachineWithDrinks(arg) {
    //MoveMachineWithDrinksBackgroundWork work = new MoveMachineWithDrinksBackgroundWork();
    //work.setArgument(arg);
    //work.setView(roomView);
    //ConnectionExceptionSettings ces = new ConnectionExceptionSettings();
    //ces.setRestart(true);
    //backgroundWorkManager.startBackgroundWork(work);
  }

//  private class BuildMachineWithDrinksBackgroundWork
//      extends
//      BackgroundWork<ru.urvanov.virtualpets.shared.domain.Point, Void, Void> {
//
//    @Override
//    public Void doInBackground() throws Exception {
//      roomService.buildMachineWithDrinks(getArgument());
//      return null;
//    }
//
//    @Override
//    public void completed(Void result) {
//      getRoomInfo();
//    }
//
//    @Override
//    public void failed(Exception ex) {
//      log.error("BuildMachineWithDrinksBackgroundWork failed", ex);
//      String message = messageSource.getMessage(StringConstants.ERROR,
//          null, null) + ":" + ex.toString();
//      trayIcon.showTrayMessage(message, MessageType.ERROR);
//      getRoomInfo();
//    }
//  }

  buildMachineWithDrinks(arg) {
    //BuildMachineWithDrinksBackgroundWork work = new BuildMachineWithDrinksBackgroundWork();
    //work.setArgument(arg);
    //work.setView(roomView);
    //ConnectionExceptionSettings ces = new ConnectionExceptionSettings();
    //ces.setRestart(true);
    //work.setConnectionExceptionSettings(ces);
    //backgroundWorkManager.startBackgroundWork(work);
  }

//  private class MoveBookcaseBackgroundWork
//      extends
//      BackgroundWork<ru.urvanov.virtualpets.shared.domain.Point, Void, Void> {
//
//    @Override
//    public Void doInBackground() throws Exception {
//      roomService.moveBookcase(getArgument());
//      return null;
//    }
//
//    @Override
//    public void completed(Void result) {
//      getRoomInfo();
//    }
//
//    @Override
//    public void failed(Exception ex) {
//      log.error("MoveBookcaseBackgroundWork failed", ex);
//      String message = messageSource.getMessage(StringConstants.ERROR,
//          null, null) + ":" + ex.toString();
//      trayIcon.showTrayMessage(message, MessageType.ERROR);
//      getRoomInfo();
//    }
//  }

  moveBookcase(arg) {
    //MoveBookcaseBackgroundWork work = new MoveBookcaseBackgroundWork();
    //work.setArgument(arg);
    //work.setView(roomView);
    //ConnectionExceptionSettings ces = new ConnectionExceptionSettings();
    //ces.setRestart(true);
    //work.setConnectionExceptionSettings(ces);
    //backgroundWorkManager.startBackgroundWork(work);
  }

//  private class BuildBookcaseBackgroundWork
//      extends
//      BackgroundWork<ru.urvanov.virtualpets.shared.domain.Point, Void, Void> {
//
//    @Override
//    public Void doInBackground() throws Exception {
//      roomService.buildBookcase(getArgument());
//      return null;
//    }
//
//    @Override
//    public void completed(Void result) {
//      getRoomInfo();
//    }
//
//    @Override
//    public void failed(Exception ex) {
//      log.error("BuildBookcaseBackgroundWork failed", ex);
//      String message = messageSource.getMessage(StringConstants.ERROR,
//          null, null) + ":" + ex.toString();
//      trayIcon.showTrayMessage(message, MessageType.ERROR);
//     getRoomInfo();
//   }
//
//  }

  buildBookcase(arg) {
    //BuildBookcaseBackgroundWork work = new BuildBookcaseBackgroundWork();
    //work.setArgument(arg);
    //ConnectionExceptionSettings ces = new ConnectionExceptionSettings();
    //ces.setRestart(true);
    //work.setConnectionExceptionSettings(ces);
    //work.setView(roomView);
    //backgroundWorkManager.startBackgroundWork(work);
  }

//  private class UpgradeRefrigeratorBackgroundWork extends
//      BackgroundWork<Void, Void, Void> {
//
//    @Override
//    public Void doInBackground() throws Exception {
//      roomService.upgradeRefrigerator();
//      return null;
//    }
//
//    @Override
//    public void completed(Void result) {
//      getRoomInfo();
//    }
//
//    @Override
//    public void failed(Exception ex) {
//      log.error("UpgradeRefrigeratorBackgroundWork failed", ex);
//      String message = messageSource.getMessage(StringConstants.ERROR,
//          null, null) + ":" + ex.toString();
//     trayIcon.showTrayMessage(message, MessageType.ERROR);
//      getRoomInfo();
//    }
//  }

  upgradeRefrigerator() {
    //UpgradeRefrigeratorBackgroundWork work = new UpgradeRefrigeratorBackgroundWork();
    //ConnectionExceptionSettings ces = new ConnectionExceptionSettings();
    //ces.setRestart(true);
    //work.setConnectionExceptionSettings(ces);
    //work.setView(roomView);
    //backgroundWorkManager.startBackgroundWork(work);
  }

//  private class UpgradeBookcaseBackgroundWork extends
//      BackgroundWork<Void, Void, Void> {
//
//    @Override
//    public Void doInBackground() throws Exception {
//      roomService.upgradeBookcase();
//      return null;
//    }
//
//    @Override
//    public void completed(Void result) {
//      getRoomInfo();
//    }
//
//    @Override
//    public void failed(Exception ex) {
//      log.error("UpgradeBookcaseBackgroundWork failed", ex);
//      String message = messageSource.getMessage(StringConstants.ERROR,
//          null, null) + ":" + ex.toString();
//      trayIcon.showTrayMessage(message, MessageType.ERROR);
//      getRoomInfo();
//    }
//  }

  upgradeBookcase() {
    //UpgradeBookcaseBackgroundWork work = new UpgradeBookcaseBackgroundWork();
    //ConnectionExceptionSettings ces = new ConnectionExceptionSettings();
    //ces.setRestart(true);
    //work.setConnectionExceptionSettings(ces);
    //work.setView(roomView);
    //backgroundWorkManager.startBackgroundWork(work);
  }

//  private class BuildRefrigeratorBackgroundWork
//      extends
//      BackgroundWork<ru.urvanov.virtualpets.shared.domain.Point, Void, Void> {
//
//    @Override
//    public Void doInBackground() throws Exception {
//      roomService.buildRefrigerator(getArgument());
//      return null;
//    }
//
//    @Override
//    public void completed(Void result) {
//    	getRoomInfo();
//    }
//
//    @Override
//    public void failed(Exception ex) {
//      log.error("BuildRefrigeratorBackgroundWork failed.", ex);
//      String message = messageSource.getMessage(StringConstants.ERROR,
//          null, null) + ": " + ex.toString();
//      trayIcon.showTrayMessage(message, MessageType.ERROR);
//    }
//  }

  buildRefrigerator(buildRefrigeratorArg) {
    //BuildRefrigeratorBackgroundWork work = new BuildRefrigeratorBackgroundWork();
    //work.setArgument(buildRefrigeratorArg);
    //work.setView(roomView);
    //ConnectionExceptionSettings ces = new ConnectionExceptionSettings();
    //ces.setRestart(true);
    //work.setConnectionExceptionSettings(ces);
    //backgroundWorkManager.startBackgroundWork(work);
  }

//  private class MoveRefrigeratorBackgroundWork
//      extends
//      BackgroundWork<ru.urvanov.virtualpets.shared.domain.Point, Void, Void> {
//
//    @Override
//    public Void doInBackground() throws Exception {
//      roomService.moveRefrigerator(getArgument());
//      return null;
//    }
//
//    @Override
//    public void completed(Void result) {
//
//    }
//
//    @Override
//    public void failed(Exception ex) {
//      log.error("MoveRefrigeratorBackgroundWork failed.", ex);
//      String message = messageSource.getMessage(StringConstants.ERROR,
//          null, null) + ": " + ex.toString();
//      trayIcon.showTrayMessage(message, MessageType.ERROR);
//    }
//  }

  moveRefrigerator(arg) {
    //MoveRefrigeratorBackgroundWork work = new MoveRefrigeratorBackgroundWork();
    //work.setArgument(arg);
    //work.setView(roomView);
    //ConnectionExceptionSettings ces = new ConnectionExceptionSettings();
    //ces.setRestart(true);
    //work.setConnectionExceptionSettings(ces);
    //backgroundWorkManager.startBackgroundWork(work);
  }
  
//  getRoomBackgroundWork() {
//    roomService.getRoomInfo()
//      .then(response => response.json())
//  .then(commits => alert(commits[0].author.login));
//  }
//
//  private class GetRoomInfoBackgroundWork extends
//      BackgroundWork<Void, GetRoomInfoResult, Void> {
//
//    @Override
//    public GetRoomInfoResult doInBackground() throws Exception {
//      
//      synchronized (getRoomInfoMonitor) {
//        while (getRoomInfoInProgress) {
//          getRoomInfoMonitor.wait();
//       }
//        getRoomInfoInProgress = true;
//      }
//      return roomService.getRoomInfo();
//    }
//
//    @Override
//    public void completed(GetRoomInfoResult result) {
//      synchronized (getRoomInfoMonitor) {
//        getRoomInfoInProgress = false;
//        getRoomInfoMonitor.notifyAll();
//      }
//      RoomControllerImpl.this.setRoomInfo(result);
//    }
//
//    @Override
//    public void failed(Exception ex) {
//    	synchronized (getRoomInfoMonitor) {
//        getRoomInfoInProgress = false;
//        getRoomInfoMonitor.notifyAll();
//      }
//     log.error("GetPetInfoBackgroundWork failed.", ex);
//      String message = messageSource.getMessage(StringConstants.ERROR,
//          null, null) + ": " + ex.toString();
//      trayIcon.showTrayMessage(message, MessageType.ERROR);
//    }
//  }

//  private class GetRoomInfoWithDelayBackgroundWork extends
//      BackgroundWork<Void, GetRoomInfoResult, Void> {
//
//    @Override
//    public GetRoomInfoResult doInBackground() throws Exception {
//      Thread.sleep(3600000);
//      synchronized (getRoomInfoMonitor) {
//        while (getRoomInfoInProgress) {
//          getRoomInfoMonitor.wait();
//        }
//      }
//      return roomService.getRoomInfo();
//    }
//
//    @Override
//    public void completed(GetRoomInfoResult result) {
//   	synchronized (getRoomInfoMonitor) {
//        getRoomInfoInProgress = false;
//        getRoomInfoMonitor.notifyAll();
//      }
//      RoomControllerImpl.this.setRoomInfo(result);
//      getRoomInfoWithDelay();
//    }
//
//    @Override
//    public void failed(Exception ex) {
//    	synchronized (getRoomInfoMonitor) {
//        getRoomInfoInProgress = false;
//        getRoomInfoMonitor.notifyAll();
//      }
//      if (ex instanceof ConnectionException) {
//        trayIcon.setConnectionAlive(false);
//      } else {
//        log.error("GetPetInfoWithDelayBackgroundWork failed.", ex);
//        String message = messageSource.getMessage(
//            StringConstants.ERROR, null, null)
//            + ": "
//            + ex.toString();
//        trayIcon.showTrayMessage(message, MessageType.ERROR);
//      }
//      getRoomInfoWithDelay();
//    }
//  }

  getRoomInfo() {
    const work = new BackgroundWork();
    work.view = this.roomView;
    work.failed = (ex) => {
//      synchronized (getRoomInfoMonitor) {
//        getRoomInfoInProgress = false;
//        getRoomInfoMonitor.notifyAll();
//      }
        console.error("GetPetInfoBackgroundWork failed %s.", ex);
        const message = this.messageSource.getMessage(StringConstants.ERROR,
            null, null) + ": " + ex;
        this.trayIcon.showTrayMessage(message, MessageType.ERROR);
    }
    work.doInBackground = () => {
      return this.roomService.getRoomInfo();
    }
    work.completed = (getRoomInfoResult) => {
      this.roomInfo = getRoomInfoResult;
      //getRoomInfoWithDelay();
    }
    const ces = new ConnectionExceptionSettings();
    ces.restart = true;
    work.connectionExceptionSettings = ces;
    this.backgroundWorkManager.startBackgroundWork(work);
  }

  set roomInfo(getRoomInfoResult) {
    // petInfo = result;
    if (getRoomInfoResult.journalOnFloor == false) {
      this.journal.visible = true;
    } else
      this.roomData.journalOnFloor.visible = true;

    this.journal.visible = getRoomInfoResult.haveJournal;
    this.buildMenu.visible = getRoomInfoResult.haveHammer;
    this.rucksack.visible = getRoomInfoResult.haveRucksack;
    this.roomData.arrowRight.visible = getRoomInfoResult.haveToTownArrow;
    this.roomData.satietyLabel.visible = getRoomInfoResult.haveIndicators;
    this.roomData.drinkLabel.visible = getRoomInfoResult.haveIndicators;
    this.roomData.educationLabel.visible = getRoomInfoResult.haveIndicators;
    this.roomData.moodLabel.visible = getRoomInfoResult.haveIndicators;
    this.roomData.satietyProgressBar.visible = getRoomInfoResult.haveIndicators;
    this.roomData.drinkProgressBar.visible = getRoomInfoResult.haveIndicators;
    this.roomData.educationProgressBar.visible = 
        getRoomInfoResult.haveIndicators;
    this.roomData.moodProgressBar.visible = getRoomInfoResult.haveIndicators;

    const boxes = this.roomData.boxes;
    const boxesNewbie = getRoomInfoResult.boxesNewbie;
    for (let n = 0; n < boxesNewbie.length && n < RoomData.BOXES_COUNT; n++) {
      boxes[n].visible = boxesNewbie[n];
    }
    this.roomData.satietyProgressBar.value = getRoomInfoResult.satiety;
    this.roomData.drinkProgressBar.value = getRoomInfoResult.drink;
    this.roomData.educationProgressBar.value = getRoomInfoResult.education;
    this.roomData.moodProgressBar.value = getRoomInfoResult.mood;
    this.journal.newEntriesCountLabel.text = 
        getRoomInfoResult.newJournalEntriesCount == 0 ? "" : ""
            + getRoomInfoResult.newJournalEntriesCount;
    this.journal.newEntriesCountLabel.visible = 
        getRoomInfoResult.newJournalEntriesCount > 0;
    const hatId = getRoomInfoResult.hatId;
    const clothId = getRoomInfoResult.clothId;
    const bowId = getRoomInfoResult.bowId;
    const clothObjects = this.roomData.clothObjects;
    if (hatId != null) {
      const hat = clothObjects.get(hatId);
      hat.visible = true;
      this.roomData.pet.hat = hat;
    }
    if (clothId != null) {
      const cloth = clothObjects.get(clothId);
      cloth.visible = true;
      this.roomData.pet.cloth = cloth;
    }
    if (bowId != null) {
      const bow = clothObjects.get(bowId);
      bow.visible = true;
      this.roomData.pet.bow = bow;
    }
    this.roomData.refrigeratorId = getRoomInfoResult.refrigeratorId;
    if (this.roomData.refrigeratorId != null) {
      this.refrigeratorLevel = roomData.refrigeratorId - 1;
      this.roomData.refrigerator.position = 
          this.tilesEngine.translateFromTileCoordinates(
              this.roomData.refrigerator,
              new Point(getRoomInfoResult.refrigeratorX, result
                  .refrigeratorY));
    }
    this.roomData.bookcaseId = getRoomInfoResult.bookcaseId;
    if (this.roomData.bookcaseId != null) {
      this.bookcaseLevel = roomData.bookcaseId - 1;
      this.roomData.bookcase.visible = true;
      this.roomData.bookcase.position = 
          this.tilesEngine.translateFromTileCoordinates(this.roomData
              .bookcase, new Point(getRoomInfoResult.bookcaseX,
              getRoomInfoResult.bookcaseY));
    }
    this.roomData.machineWithDrinksId = getRoomInfoResult.machineWithDrinksId;
    if (this.roomData.machineWithDrinksId != null) {
      this.machineWithDrinksLevel = this.roomData.machineWithDrinksId - 1;
      roomData.machineWithDrinks.visible = true;
      roomData.machineWithDrinks.position = 
          this.tilesEngine.translateFromTileCoordinates(
              roomData.machineWithDrinks,
              new Point(getRoomInfoResult.machineWithDrinksX, result
                  .machineWithDrinksY));
    }
    
    this.updateAchievementInfo(getRoomInfoResult.achievements);

  }

  getRoomInfoWithDelay() {
    //GetRoomInfoWithDelayBackgroundWork work = new GetRoomInfoWithDelayBackgroundWork();
    //work.setView(roomView);
    //ConnectionExceptionSettings ces = new ConnectionExceptionSettings();
    //ces.setRestart(true);
    //work.setConnectionExceptionSettings(ces);
    //backgroundWorkManager.startBackgroundWork(work);
  }

//  private class ShowRefrigeratorBackgroundWork extends
//      BackgroundWork<Void, GetPetFoodsResult, Void> {
//
//    @Override
//    public GetPetFoodsResult doInBackground() throws Exception {
//      return foodService.getPetFoods();
//    }
//
//    @Override
//    public void completed(GetPetFoodsResult result) {
//      setFoods(result);
//    }
//
//    @Override
//    public void failed(Exception ex) {
//      log.error("ShowRefrigeratorBackgroundWork failed.", ex);
//      String message = messageSource.getMessage(StringConstants.ERROR,
//          null, null) + ": " + ex.toString();
//      trayIcon.showTrayMessage(message, MessageType.ERROR);
//    }
//  }

  showRefrigerator() {
    //ShowRefrigeratorBackgroundWork work = new ShowRefrigeratorBackgroundWork();
    //work.setView(roomView);
    //ConnectionExceptionSettings ces = new ConnectionExceptionSettings();
    //ces.setRestart(true);
    //work.setConnectionExceptionSettings(ces);
    //backgroundWorkManager.startBackgroundWork(work);
  }

//  private class ShowBookcaseBackgroundWork extends
//      BackgroundWork<Void, GetPetBooksResult, Void> {
//
//    @Override
//    public GetPetBooksResult doInBackground() throws Exception {
//      return bookService.getPetBooks();
//    }
//
//    @Override
//    public void completed(GetPetBooksResult result) {
///     setBooks(result);
//    }
//
//    @Override
//    public void failed(Exception ex) {
//      log.error("ShowBookcaseBackgroundWork failed.", ex);
//      String message = messageSource.getMessage(StringConstants.ERROR,
//          null, null) + ": " + ex.toString();
//      trayIcon.showTrayMessage(message, MessageType.ERROR);
//    }
//  }

  showBookcase() {
    //ShowBookcaseBackgroundWork work = new ShowBookcaseBackgroundWork();
    //work.setView(roomView);
    //ConnectionExceptionSettings ces = new ConnectionExceptionSettings();
    //ces.setRestart(true);
    //work.setConnectionExceptionSettings(ces);
    //backgroundWorkManager.startBackgroundWork(work);
  }

//  private class EducationBackgroundWork extends
//      BackgroundWork<Void, Void, Object> {
//
//    @Override
//    public Void doInBackground() throws Exception {
//      petService.education();
//      return null;
//    }
//
//    @Override
//    public void completed(Void result) {
//      RoomControllerImpl.this.getRoomInfo();
//    }
//
//    @Override
//    public void failed(Exception ex) {
//      log.error("EducationBackgroundWork failed.", ex);
//      String message = messageSource.getMessage(StringConstants.ERROR,
//          null, null) + ": " + ex.toString();
//      trayIcon.showTrayMessage(message, MessageType.ERROR);
//    }
//  }

  education() {
    //EducationBackgroundWork work = new EducationBackgroundWork();
    //work.setView(roomView);
    //ConnectionExceptionSettings ces = new ConnectionExceptionSettings();
    //ces.setRestart(false);
    //work.setConnectionExceptionSettings(ces);
    //backgroundWorkManager.startBackgroundWork(work);
  }

//  private class SatietyBackgroundWork extends
//      BackgroundWork<SatietyArg, Void, Object> {
//
//    @Override
//    public Void doInBackground() throws Exception {
//      petService.satiety(getArgument());
//      return null;
//    }
//
//    @Override
//    public void completed(Void result) {
//    	RoomControllerImpl.this.getRoomInfo();
//    }
//
//    @Override
//    public void failed(Exception ex) {
//      log.error("SatietyBackgroundWork failed.", ex);
//      String message = messageSource.getMessage(StringConstants.ERROR,
//          null, null) + ": " + ex.toString();
//      trayIcon.showTrayMessage(message, MessageType.ERROR);
//    }
//
//  }

  satiety(satietyArg) {
    //SatietyBackgroundWork work = new SatietyBackgroundWork();
    //work.setView(roomView);
    //work.setArgument(satietyArg);
    //ConnectionExceptionSettings ces = new ConnectionExceptionSettings();
    //ces.setRestart(false);
    //work.setConnectionExceptionSettings(ces);
    //backgroundWorkManager.startBackgroundWork(work);
  }

//  private class DrinkBackgroundWork extends
//      BackgroundWork<DrinkArg, Void, Object> {
//
//    @Override
//    public Void doInBackground() throws Exception {
//      petService.drink(getArgument());
//      return null;
//    }
//
//    @Override
//    public void completed(Void result) {
//      RoomControllerImpl.this.getRoomInfo();
//    }
//
//    @Override
//    public void failed(Exception ex) {
//      log.error("DrinkBackgroundWork failed.", ex);
//      String message = messageSource.getMessage(StringConstants.ERROR,
//          null, null) + ": " + ex.toString();
//      trayIcon.showTrayMessage(message, MessageType.ERROR);
//    }
//  }

  drink(arg) {
    //DrinkBackgroundWork work = new DrinkBackgroundWork();
    //work.setArgument(arg);
    //work.setView(roomView);
    //ConnectionExceptionSettings ces = new ConnectionExceptionSettings();
    //ces.setRestart(false);
    //work.setConnectionExceptionSettings(ces);
    //backgroundWorkManager.startBackgroundWork(work);
  }

//  private class OpenBoxNewbieBackgroundWork extends
//      BackgroundWork<Integer, OpenBoxNewbieResult, Void> {
//
//    @Override
//    public OpenBoxNewbieResult doInBackground() throws Exception {
//      return roomService.openBoxNewbie(getArgument());
//    }
//
//    @Override
//    public void completed(OpenBoxNewbieResult result) {
//      createOpenBoxReward(result);
//    }
//
//    @Override
//    public void failed(Exception ex) {
//      log.error("OpenBoxNewbieBackgoundWork failed", ex);
//      String message = messageSource.getMessage(StringConstants.ERROR,
//          null, null) + ": " + ex.toString();
//      trayIcon.showTrayMessage(message, MessageType.ERROR);
//    }
//  }

  openBox(index) {
    const work = new BackgroundWork();
    work.doInBackground = () => {
      return this.roomService.openBoxNewbie(work.argument);
    };
    work.completed = (openBoxResult) => {
      this.createOpenBoxReward(openBoxResult);
    };
    work.failed = (ex) => {
      console.error("OpenBoxNewbieBackgoundWork failed %o", ex);
      const message = this.messageSource.getMessage(StringConstants.ERROR,
          null, null) + ": " + ex.toString();
      this.trayIcon.showTrayMessage(message, MessageType.ERROR);
    };
    work.view = this.roomView;
    work.argument = index;
    const ces = new ConnectionExceptionSettings();
    ces.restart = false;
    work.connectionExceptionSettings = ces;
    this.backgroundWorkManager.startBackgroundWork(work);
  }

  set roomView(roomView) {
    super.baseGameView = roomView;
    this.roomView = roomView;
  }

  initializeNewbieBoxes() {
    const boxes = new Array(RoomData.BOXES_COUNT);
    for (let n = 0; n < RoomData.BOXES_COUNT; n++) {
      const box = new BoxGameObject();
      const imgids = [[ ResourceManager.IMAGE_ROOM_BOX ]];
      box.animationImageIds = imgids;
      box.tileTypes = [[ TileType.NORMAL, TileType.WALL ]];
      box.index = n;
      box.addMouseMoveListener((mouseMoveArg) => {
        this.roomView.showHandCursor();
        this.roomView.toolTipText = this.messageSource.getMessage(
          StringConstants.USE, null, null);
      });
      box.addClickedListener((clickedArg) => {
       this.showProgressBar(100, boxClickedArg => {
        this.openBox(clickedArg.sender.index);
        });
      });
      box.visible = false;
      this.addGameObject(box);
      boxes[n] = box;
    }
    boxes[0].position = new Point(RoomData.ORIGINAL_BOX_0_X,
        RoomData.ORIGINAL_BOX_0_Y);
    boxes[1].position = new Point(RoomData.ORIGINAL_BOX_1_X,
        RoomData.ORIGINAL_BOX_1_Y);
    boxes[2].position = new Point(RoomData.ORIGINAL_BOX_2_X,
        RoomData.ORIGINAL_BOX_2_Y);
    this.roomData.boxes = boxes;
  }

  initializeMachineWithDrinksPopupMenu() {
    const machineWithDrinksPopupMenu = new PopupMenuGameObject();
    const machineWithDrinksMenuItems = [];
    const machineWithDrinksUseItem = new MenuItem();
    machineWithDrinksUseItem.text = this.messageSource.getMessage(
        StringConstants.USE, null, null);
    machineWithDrinksUseItem.addClickedListener((drinkUseClickedArg) => {
      machineWithDrinksInnerVisible = true;
    });

    machineWithDrinksMenuItems.push(machineWithDrinksUseItem);

    const machineWithDrinksUpgradeItem = new MenuItem();
    machineWithDrinksUpgradeItem.text = this.messageSource.getMessage(
        StringConstants.UPGRADE, null, null);
    machineWithDrinksUpgradeItem
        .addClickedListener((arg) => this.showUpgradeMachineWithDrinks());
    machineWithDrinksMenuItems.push(machineWithDrinksUpgradeItem);

    const machineWithDrinksMoveItem = new MenuItem();
    machineWithDrinksMoveItem.text = this.messageSource.getMessage(
        StringConstants.MOVE, null, null);
    machineWithDrinksMoveItem.addClickedListener((drinkMoveClickedArg) => {
      this.roomData.situation =RoomData.SITUATION_MOVE_DRINK;
      this.startMove(roomData.machineWithDrinks);
    });
    machineWithDrinksMenuItems.push(machineWithDrinksMoveItem);
    machineWithDrinksPopupMenu.menuItems = machineWithDrinksMenuItems;
    machineWithDrinksPopupMenu.visible = false;
    this.addGameObject(machineWithDrinksPopupMenu);
    this.roomData.machineWithDrinksPopupMenu = machineWithDrinksPopupMenu;
  }

  drinkClicked(clickedArg) {
    switch (this.roomData.situation) {
    case NORMAL:
      this.roomData.machineWithDrinksPopupMenu.visible = true;
    default:
      break;
    }
  }

  bookcaseClicked(clickedArg) {
    if (this.roomData.situation == RoomData.SITUATION_NORMAL) {
      roomData.bookcasePopupMenu.visible = true;
    }
  }

  initializeBuildMenu() {
    const buildMenu = super.initializeBuildMenu();
    const buildMenuItems = new Array(RoomData.BUILD_MENU_ITEM_COUNT);
    for (let n = 0; n < buildMenuItems.length; n++) {
      buildMenuItems[n] = new GameObject();
      buildMenuItems[n]
          .animationImageIds = [[ ResourceManager.IMAGE_BUILD_MENU_ITEM ]];
      buildMenuItems[n].position = new Point(250 + 100 * n, 250);
      buildMenuItems[n].z = BaseGameController.MENU_Z_ORDER;
      buildMenuItems[n].addMouseMoveListener((mouseMoveArg) => {
        roomView.showDefaultCursor();
        roomView.setToolTipText("");
        setHighlightObject(null);
      });
      buildMenuItems[n].visible = false;
      this.addGameObject(buildMenuItems[n]);
    }
    const buildObjects = new Array(RoomData.BUILD_MENU_ITEM_COUNT);

    buildObjects[RoomData.BUILD_MENU_REFRIGERATOR] = new GameObject();
    buildObjects[RoomData.BUILD_MENU_REFRIGERATOR]
        .animationImageIds = [[ ResourceManager.IMAGE_BUILD_REFRIGERATOR_1 ]];
    buildObjects[RoomData.BUILD_MENU_REFRIGERATOR].position = new Point(250, 250);
    buildObjects[RoomData.BUILD_MENU_REFRIGERATOR].z = BaseGameController.MENU_Z_ORDER;
    buildObjects[RoomData.BUILD_MENU_REFRIGERATOR].visible = false;
    buildObjects[RoomData.BUILD_MENU_REFRIGERATOR]
        .addMouseMoveListener((mouseMoveArg) => {
            this.roomView.showHandCursor();
            this.roomView.toolTipText = "";
            this.highlightObject = null;
            this.showBuildObjectToolTip(0, arg.mousePosition);
        });
    buildObjects[RoomData.BUILD_MENU_REFRIGERATOR]
        .addClickedListener((clickedArg) => {
            const refrigerator = this.roomData.refrigerator;
            if (refrigerator != null) {
              return;
            }
            if (this.roomData.machineWithDrinks == null
                || !roomData.machineWithDrinks.visible) {
              return;
            }
            if (this.checkBuildingMaterialsCount(0)) {

              this.hideBuildMenuInner(buildMenu);

              this.refrigeratorLevel = 0;
              this.roomData.refrigeratorId = 1;
              // TODO: ???
              // refrigerator.setCurrentAnimationId(0);
              // refrigerator.setVisible(true);
              this.roomData.situation = RoomData.SITUATION_SELECT_REFRIGERATOR_POSITION;
              this.refrigerator = this.roomData.refrigerators[0];
              this.startBuild(refrigerator);
            } else {
              const message = this.messageSource.getMessage(
                  StringConstants.INSUFFICIENT_RESOURCES,
                  null, null);
              trayIcon.showTrayMessage(message, MessageType.INFO);
            }
        });
    this.addGameObject(buildObjects[RoomData.BUILD_MENU_REFRIGERATOR]);

    buildObjects[RoomData.BUILD_MENU_MACHINE_WITH_DRINKS] = new GameObject();
    buildObjects[RoomData.BUILD_MENU_MACHINE_WITH_DRINKS]
        .animationImageIds = [[ ResourceManager.IMAGE_BUILD_MACHINE_WITH_DRINKS ]];
    buildObjects[RoomData.BUILD_MENU_MACHINE_WITH_DRINKS]
        .position = new Point(350, 250);
    buildObjects[RoomData.BUILD_MENU_MACHINE_WITH_DRINKS]
        .z = BaseGameController.MENU_Z_ORDER;
    buildObjects[RoomData.BUILD_MENU_MACHINE_WITH_DRINKS].visible = false;
    buildObjects[RoomData.BUILD_MENU_MACHINE_WITH_DRINKS]
        .addMouseMoveListener((mouseMoveArg) => {
            this.roomView.showHandCursor();
            this.roomView.toolTipText = "";
            this.highlightObject = null;
            this.showBuildObjectToolTip(1, arg.mousePosition);
        });
    buildObjects[RoomData.BUILD_MENU_MACHINE_WITH_DRINKS]
        .addClickedListener((clickedArg) => {
            const machineWithDrinks = this.roomData
                .machineWithDrinks;
            if (machineWithDrinks != null
                && machineWithDrinks.visible) {
              return;
            }
            if (this.checkBuildingMaterialsCount(1)) {
              this.hideBuildMenuInner(buildMenu);
              // TODO: ???
              // drink.setCurrentAnimationId(0);
              this.machineWithDrinksLevel = 0;
              machineWithDrinks = this.roomData.machineWithDrinks;
              roomData.situation = RoomData.SITUATION_SELECT_DRINK_POSITION;
              this.startBuild(machineWithDrinks);
            } else {
              const message = this.messageSource.getMessage(
                  StringConstants.INSUFFICIENT_RESOURCES,
                  null, null);
              this.trayIcon.showTrayMessage(message, MessageType.INFO);
            }
        });
    this.addGameObject(buildObjects[RoomData.BUILD_MENU_MACHINE_WITH_DRINKS]);

    buildObjects[RoomData.BUILD_MENU_BOOKCASE] = new GameObject();
    buildObjects[RoomData.BUILD_MENU_BOOKCASE]
        .animationImageIds = [[ ResourceManager.IMAGE_BUILD_BOOKCASE ]];
    buildObjects[RoomData.BUILD_MENU_BOOKCASE].position = new Point(450,
        250);
    buildObjects[RoomData.BUILD_MENU_BOOKCASE].z = BaseGameController.MENU_Z_ORDER;
    buildObjects[RoomData.BUILD_MENU_BOOKCASE].visible = false;
    buildObjects[RoomData.BUILD_MENU_BOOKCASE]
        .addMouseMoveListener((mouseMoveArg) => {
            this.roomView.showHandCursor();
            this.roomView.toolTipText = "";
            this.highlightObject = null;
            this.showBuildObjectToolTip(2, arg.mousePosition);
        });
    buildObjects[RoomData.BUILD_MENU_BOOKCASE]
        .addClickedListener((clickedArg) => {
            const bookcase = this.roomData.bookcase;
            if (bookcase != null && bookcase.visible) {
              return;
            }
            if (this.roomData.machineWithDrinks == null
                || !this.roomData.machineWithDrinks.isVisible()
                || this.roomData.refrigerator == null
                || !this.roomData.refrigerator.visible) {
              return;
            }
            if (this.checkBuildingMaterialsCount(2)) {
              this.hideBuildMenuInner(buildMenu);
              // TODO: ???
              // bookcase.setCurrentAnimationId(0);
              this.bookcaseLevel = 0;
              const bookcase = this.roomData.bookcase;
              this.roomData.situation = RoomData.SITUATION_SELECT_BOOKCASE_POSITION;
              this.startBuild(bookcase);
            } else {
              const message = this.messageSource.getMessage(
                  StringConstants.INSUFFICIENT_RESOURCES,
                  null, null);
              this.trayIcon.showTrayMessage(message, MessageType.INFO);
            }
        });
    this.addGameObject(buildObjects[RoomData.BUILD_MENU_BOOKCASE]);

    buildMenu.menuItems = buildMenuItems;
    buildMenu.buildObjects = buildObjects;
    const names = [
        this.messageSource.getMessage(StringConstants.REFRIGERATOR, null,
            null),
        this.messageSource.getMessage(StringConstants.WATER_SOURCE, null,
            null),
        this.messageSource.getMessage(StringConstants.BOOKCASE, null, null) ];
    buildMenu.names = names;
    const costs = Array.from({ length:  buildMenu.buildingMaterialObjects.length}).map(() => Array.from({ length: buildMenuItems.length }).fill(0));
    buildMenu.costs = costs;
    buildMenu.visible = false;
    return buildMenu;
  }

  initRefrigerators() {
    const refrigerators = new Array(RoomData.REFRIGERATOR_MAX_LEVEL);
    for (let n = 0; n < RoomData.REFRIGERATOR_MAX_LEVEL; n++) {
      refrigerators[n] = this.initRefrigerator(n + 1);
    }
    this.roomData.refrigerators = refrigerators;
  }

  initRefrigerator(refrigeratorLevel) {
    const go = new BuildingGameObject();
    go.dimension = new Dimension(RoomData.ORIGINAL_REFRIGERATOR_WIDTH,
        RoomData.ORIGINAL_REFRIGERATOR_HEIGHT);
    go.position = new Point(RoomData.ORIGINAL_REFRIGERATOR_X,
        RoomData.ORIGINAL_REFRIGERATOR_Y);
    const imgids = [[ ResourceManager.IMAGE_ROOM_REFRIGERATOR_1
        + refrigeratorLevel - 1],
        [ ResourceManager.IMAGE_ROOM_REFRIGERATOR_1_HIGHLIGHT
        + refrigeratorLevel - 1]];
    go.animationImageIds = imgids;
    go.addClickedListener((clickedArg) => {
      refrigeratorClicked(arg);
    });
    go.addMouseMoveListener((mouseMoveArg) => {
      roomView.showHandCursor();
      roomView.setToolTipText(getMessageSource().getMessage(
          StringConstants.FEED, null, null));
      setHighlightObject(go);
    });
    go.addBuildListener(() => {
      roomData.situation =RoomData.SITUATION_NORMAL;
      const point = new Point();
      const tilesPoint = tilesEngine.translateToTileCoordinates(roomData.refrigerator);
      point.x = tilesPoint.x;
      point.y = tilesPoint.y;
      this.buildRefrigerator(point);
    });
    go.addUpgradeListener(() => {
      roomData.situation =RoomData.SITUATION_NORMAL;
      this.upgradeRefrigerator();
    });
    go.addMoveListener(() => {
      roomData.situation =RoomData.SITUATION_NORMAL;
      const point = new Point();
      const tilesPoint = tilesEngine.translateToTileCoordinates(roomData
          .Refrigerator);
      point.x = tilesPoint.x;
      point.y = tilesPoint.y;
      this.moveRefrigerator(point);
    });
    this.addGameObject(go);
    go.tileTypes = [[ TileType.NORMAL, TileType.NORMAL,
        TileType.NORMAL, TileType.NORMAL, TileType.WALL ]];
    go.visible = false;
    return go;
  }

  refrigeratorClicked(clickedArg) {
    if (this.roomData.situation ==RoomData.SITUATION_NORMAL) {
      this.roomData.refrigeratorPopupMenu.visible = true;
    }
  }

  initRefrigeratorInnerObjects() {
    const refrigeratorInner = new GameObject();
    refrigeratorInner.position = new Point(0, 0);
    refrigeratorInner.z = BaseGameController.MENU_Z_ORDER;
    refrigeratorInner.animationImageIds = [[ ResourceManager.IMAGE_ROOM_REFRIGERATOR_INNER ]];
    refrigeratorInner.visible = false;
    refrigeratorInner.addMouseMoveListener((mouseMoveArg) => {
      this.roomView.showDefaultCursor();
      this.highlightObject = null;
      this.roomView.toolTipText = "";
    });
    this.addGameObject(refrigeratorInner);
    this.roomData.refrigeratorInner = refrigeratorInner;

    const refrigeratorInnerItems = new Array(RoomData.REFRIGERATOR_MAX_LEVEL);
    for (let n = 0; n < RoomData.REFRIGERATOR_MAX_LEVEL; n++) {
      const go = new GameObject();
      go.position = new Point(RoomData.ORIGINAL_REFRIGERATOR_INNER_X,
          n * 100);
      go.z = BaseGameController.MENU_Z_ORDER;
      go.animationImageIds = [[ ResourceManager.IMAGE_ROOM_REFRIGERATOR_INNER_ITEM ]];
      go.visible = false;
      go.addMouseMoveListener((mouseMoveArg) => {
        roomView.showDefaultCursor();
        setHighlightObject(null);
        roomView.setToolTipText("");
      });
      this.addGameObject(go);
      refrigeratorInnerItems[n] = go;
    }
    this.roomData.refrigeratorInnerItems = refrigeratorInnerItems;

    const refrigeratorClose = new HighlightGameObject();
    refrigeratorClose.position = new Point(
        RoomData.ORIGINAL_REFRIGERATOR_CLOSE_X,
        RoomData.ORIGINAL_REFRIGERATOR_CLOSE_Y);
    refrigeratorClose.z = BaseGameController.MENU_Z_ORDER + 1;
    refrigeratorClose.animationImageIds = [[ ResourceManager.IMAGE_ROOM_REFRIGERATOR_CLOSE ], [ ResourceManager.IMAGE_ROOM_REFRIGERATOR_CLOSE_HIGHLIGHT ]];
    refrigeratorClose.visible = false;
    refrigeratorClose.addMouseMoveListener((mouseMoveArg) => {
      this.roomView.showHandCursor();
      this.highlightObject = refrigeratorClose;
      this.roomView.toolTipText = "";
    });
    refrigeratorClose.addClickedListener((clickedArg) => {
      this.refrigeratorInnerVisible = false;
    });
    this.addGameObject(refrigeratorClose);
    this.roomData.refrigeratorClose = refrigeratorClose;

    const refrigeratorInnerObjects = new Array(14);
    const refrigeratorInnerObjectLabels = new Array(14);
    this.roomData.refrigeratorInnerObjects = refrigeratorInnerObjects;
    this.roomData.refrigeratorInnerObjectLabels = refrigeratorInnerObjectLabels;
    let refrigeratorInnerObjectId = 0;
    this.initRefrigeratoInnerObject(FoodType.CARROT,
        ResourceManager.IMAGE_CARROT_1, refrigeratorInnerObjectId++);
    this.initRefrigeratoInnerObject(FoodType.DRY_FOOD,
        ResourceManager.IMAGE_DRY_FOOD_1, refrigeratorInnerObjectId++);
    this.initRefrigeratoInnerObject(FoodType.FISH,
        ResourceManager.IMAGE_FISH_1, refrigeratorInnerObjectId++);
    this.initRefrigeratoInnerObject(FoodType.ICE_CREAM,
        ResourceManager.IMAGE_ICE_CREAM_1, refrigeratorInnerObjectId++);
    this.initRefrigeratoInnerObject(FoodType.APPLE,
        ResourceManager.IMAGE_APPLE_1, refrigeratorInnerObjectId++);
    this.initRefrigeratoInnerObject(FoodType.CABBAGE,
        ResourceManager.IMAGE_CABBAGE_1, refrigeratorInnerObjectId++);
    this.initRefrigeratoInnerObject(FoodType.CHOCOLATE,
        ResourceManager.IMAGE_CHOCOLATE_1, refrigeratorInnerObjectId++);
    this.initRefrigeratoInnerObject(FoodType.FRENCH_FRIES,
        ResourceManager.IMAGE_FRENCH_FRIES_1, refrigeratorInnerObjectId++);
    this.initRefrigeratoInnerObject(FoodType.JAPANESE_ROLLS,
        ResourceManager.IMAGE_JAPANESE_ROLLS_1, refrigeratorInnerObjectId++);
    this.initRefrigeratoInnerObject(FoodType.PIE,
        ResourceManager.IMAGE_PIE_1, refrigeratorInnerObjectId++);
    this.initRefrigeratoInnerObject(FoodType.POTATOES,
        ResourceManager.IMAGE_POTATOES_1, refrigeratorInnerObjectId++);
    this.initRefrigeratoInnerObject(FoodType.SANDWICH,
        ResourceManager.IMAGE_SANDWICH_1, refrigeratorInnerObjectId++);
    this.initRefrigeratoInnerObject(FoodType.BANANA,
        ResourceManager.IMAGE_BANANA_1, refrigeratorInnerObjectId++);
    this.initRefrigeratoInnerObject(FoodType.WATERMELON,
        ResourceManager.IMAGE_WATERMELON_1, refrigeratorInnerObjectId++);
  }

  initializeMachineWithDrinksInnerObjects() {
    const machineWithDrinksInner = new GameObject();
    machineWithDrinksInner.position = new Point(0, 0);
    machineWithDrinksInner.z = BaseGameController.MENU_Z_ORDER;
    machineWithDrinksInner.animationImageIds = [[ ResourceManager.IMAGE_ROOM_MACHINE_WITH_DRINKS_INNER ]];
    machineWithDrinksInner.visible = false;
    machineWithDrinksInner.addMouseMoveListener((mouseMoveArg) => {
      this.roomView.showDefaultCursor();
      this.highlightObject = null;
      this.roomView.toolTipText = "";
    });
    this.addGameObject(machineWithDrinksInner);
    this.roomData.machineWithDrinksInner = machineWithDrinksInner;

    const machineWithDrinksInnerItems = new Array(RoomData.MACHINE_WITH_DRINKS_MAX_LEVEL);
    for (let n = 0; n < RoomData.MACHINE_WITH_DRINKS_MAX_LEVEL; n++) {
      const go = new GameObject();
      go.position = new Point(
          RoomData.ORIGINAL_MACHINE_WITH_DRINKS_INNER_X
              + RoomData.ORIGINAL_MACHINE_WITH_DRINKS_INNER_OBJECT_STEP_Y
              * (n % 2),
          RoomData.ORIGINAL_MACHINE_WITH_DRINKS_INNER_Y
              + RoomData.ORIGINAL_MACHINE_WITH_DRINKS_INNER_OBJECT_STEP_Y
              * (n / 2));
      go.z = BaseGameController.MENU_Z_ORDER;
      go.animationImageIds = [[ ResourceManager.IMAGE_ROOM_MACHINE_WITH_DRINKS_INNER_ITEM ]];
      go.visible = false;
      go.addMouseMoveListener((mouseMoveArg) => {
        this.roomView.showDefaultCursor();
        this.highlightObject = null;
        this.roomView.toolTipText = "";
      });
      this.addGameObject(go);
      machineWithDrinksInnerItems[n] = go;
    }
    this.roomData.machineWithDrinksInnerItems = machineWithDrinksInnerItems;

    const machineWithDrinksClose = new HighlightGameObject();
    machineWithDrinksClose.position = new Point(
        RoomData.ORIGINAL_MACHINE_WITH_DRINKS_CLOSE_X,
        RoomData.ORIGINAL_MACHINE_WITH_DRINKS_CLOSE_Y);
    machineWithDrinksClose.z = BaseGameController.MENU_Z_ORDER + 1;
    machineWithDrinksClose.animationImageIds = [[ ResourceManager.IMAGE_ROOM_MACHINE_WITH_DRINKS_CLOSE ], [ ResourceManager.IMAGE_ROOM_MACHINE_WITH_DRINKS_CLOSE_HIGHLIGHT ]];
    machineWithDrinksClose.visible = false;
    machineWithDrinksClose.addMouseMoveListener((mouseMoveArg) => {
      this.roomView.showHandCursor();
      this.highlightObject = machineWithDrinksClose;
      this.roomView.toolTipText = "";
    });
    machineWithDrinksClose.addClickedListener((clickedArg) => {
      this.machineWithDrinksInnerVisible = false;
    });
    this.addGameObject(machineWithDrinksClose);
    this.roomData.machineWithDrinksClose = machineWithDrinksClose;

    this.roomData.machineWithDrinksInnerObjects = new Array(6);
    this.roomData.machineWithDrinksInnerObjectLabels = new Array(6);
    let machineWithDrinksInnerObjectId = 0;
    this.initializeMachineWithDrinksInnerObject(DrinkType.WATER,
        ResourceManager.IMAGE_WATER_1, machineWithDrinksInnerObjectId++);
    this.initializeMachineWithDrinksInnerObject(DrinkType.MILK,
        ResourceManager.IMAGE_MILK_1, machineWithDrinksInnerObjectId++);
    this.initializeMachineWithDrinksInnerObject(DrinkType.BOTTLE,
        ResourceManager.IMAGE_BOTTLE_1, machineWithDrinksInnerObjectId++);
    this.initializeMachineWithDrinksInnerObject(DrinkType.TEA,
        ResourceManager.IMAGE_TEA_1, machineWithDrinksInnerObjectId++);
    this.initializeMachineWithDrinksInnerObject(DrinkType.COFFEE,
        ResourceManager.IMAGE_COFFEE_1, machineWithDrinksInnerObjectId++);
    this.initializeMachineWithDrinksInnerObject(DrinkType.ORANGE_JUICE,
        ResourceManager.IMAGE_ORANGE_JUICE_1, machineWithDrinksInnerObjectId++);
  }

  initializeMachineWithDrinksInnerObject(drinkType, resourceId, machineWithDrinksInnerObjectId) {
    const go = new MachineWithDrinksInnerObject();
    const gol = new LabelGameObject();

    go.drinkType = drinkType;
    const x = RoomData.ORIGINAL_MACHINE_WITH_DRINKS_INNER_OBJECT_X
        + (machineWithDrinksInnerObjectId % 2)
        * RoomData.ORIGINAL_MACHINE_WITH_DRINKS_INNER_OBJECT_STEP_X;
    const y = RoomData.ORIGINAL_MACHINE_WITH_DRINKS_INNER_OBJECT_Y + machineWithDrinksInnerObjectId
       / 2 * RoomData.ORIGINAL_MACHINE_WITH_DRINKS_INNER_OBJECT_STEP_Y;
    go.position = new Point(x, y);
    gol.position = new Point(x, y + 40);
    gol.visible = false;
    gol.z = BaseGameController.MENU_Z_ORDER + 2;
    this.addGameObject(gol);

    go.z = BaseGameController.MENU_Z_ORDER + 1;
    const imgids = [[ resourceId ]];
    go.animationImageIds = imgids;
    go.addMouseMoveListener((mouseMoveArg) => {
        this.roomView.showHandCursor();
        this.roomView.toolTipText = "";
    });
    go.addClickedListener((clickedArg) => {
        const rio = clickedArg.sender;
        const foodId = rio.drinkType.ordinal();
        const machineWithDrinksInnerCounts = this.roomData
            .getMachineWithDrinksInnerCounts();
        machineWithDrinksInnerCounts[foodId]--;
        const machineWithDrinksInnerObjectLabels = this.roomData
            .getMachineWithDrinksInnerObjectLabels();
        machineWithDrinksInnerObjectLabels[foodId].text = "" + machineWithDrinksInnerCounts[foodId];
        this.machineWithDrinksInnerVisible = false;
        this.roomView.showHandCursor();
        const pet = this.roomData.pet;
        pet.position = new Point(RoomData.ORIGINAL_PET_X,
            RoomData.ORIGINAL_PET_Y);
        pet.move = null;
        pet.state = PetGameObject.STATE_EAT;
        const food = roomData.food;
        food.state = RoomData.FOOD_DRINK + foodId;
        food.visible = true;
        food.z = pet.z + 1;
        roomData.situation =RoomData.SITUATION_ANIMATION;
        this.showProgressBar(
            100,
            (animationOverArg) => {
              this.roomData.situation =RoomData.SITUATION_NORMAL;
              food.visible = false;
              pet.state = PetGameObject.STATE_NORMAL;
              const drinkArg = new DrinkArg();
              drinkArg.drinkType = rio.drinkType;
              this.drink(drinkArg);
              const drinkProgressBar = this.roomData
                  .drinkProgressBar;
              drinkProgressBar.value = drinkProgressBar
                  .maxValue;
            });
    });
    go.visible = false;
    this.addGameObject(go);
    this.roomData.machineWithDrinksInnerObjects[machineWithDrinksInnerObjectId] = go;
    this.roomData.machineWithDrinksInnerObjectLabels[machineWithDrinksInnerObjectId] = gol;
  }

  initRefrigeratoInnerObject(foodType, resourceId, refrigeratorInnerObjectId) {
    const go = new RefrigeratorInnerObject();
    const gol = new LabelGameObject();

    go.foodType = foodType;
    go.id = refrigeratorInnerObjectId;
    const x = RoomData.ORIGINAL_REFRIGERATOR_INNER_OBJECT_X + (refrigeratorInnerObjectId % 3)
        * RoomData.ORIGINAL_REFRIGERATOR_INNER_OBJECT_STEP_X;
    const y = RoomData.ORIGINAL_REFRIGERATOR_INNER_OBJECT_Y + refrigeratorInnerObjectId / 3
        * RoomData.ORIGINAL_REFRIGERATOR_INNER_OBJECT_STEP_Y;
    go.position = new Point(x, y);
    gol.position = new Point(x, y + 40);
    gol.visible = false;
    gol.z = BaseGameController.MENU_Z_ORDER + 2;
    this.addGameObject(gol);

    go.z = BaseGameController.MENU_Z_ORDER + 1;
    const imgids = [[ resourceId ]];
    go.animationImageIds = imgids;
    go.addMouseMoveListener((mouseMoveArg) => {
      this.roomView.showHandCursor();
      this.roomView.toolTipText = "";
    });
    go.addClickedListener((clickedArg) => {
        const rio = arg.getSender();
        const foodId = rio.id;
        const refrigeratorInnerCounts = this.roomData
            .getRefrigeratorInnerCounts();
        refrigeratorInnerCounts[foodId]--;
        const refrigeratorInnerObjectLabels = this.roomData.refrigeratorInnerObjectLabels;
        refrigeratorInnerObjectLabels[foodId].text = refrigeratorInnerCounts[foodId];
        this.refrigeratorInnerVisible = false;
        this.roomView.showHandCursor();
        const pet = roomData.pet;
        pet.position = new Point(RoomData.ORIGINAL_PET_X,
            RoomData.ORIGINAL_PET_Y);
        pet.move = null;
        pet.state = PetGameObject.STATE_EAT;
        const food = roomData.food;
        food.state = foodId;
        food.visible = true;
        food.z = pet.z + 1;
        this.roomData.situation =RoomData.SITUATION_ANIMATION;
        this.showProgressBar(
            100,
            (animationOverArg) => {
              this.roomData.situation =RoomData.SITUATION_NORMAL;
              food.visible = false;
              pet.state = PetGameObject.STATE_NORMAL;
              const satietyArg = new SatietyArg();
              satietyArg.foodType = foodType;
              this.satiety(satietyArg);
              this.roomData.satietyProgressBar.value = 
                  this.roomData.satietyProgressBar
                      .maxValue;
            });
    });
    go.visible = false;
    this.addGameObject(go);
    this.roomData.refrigeratorInnerObjects[refrigeratorInnerObjectId] = go;
    this.roomData.refrigeratorInnerObjectLabels[refrigeratorInnerObjectId] = gol;
  }

  set machineWithDrinksInnerVisible(b) {
    const machineWithDrinksInner = this.roomData
        .machineWithDrinksInner;
    const machineWithDrinksInnerItems = this.roomData
        .machineWithDrinksInnerItems;
    const machineWithDrinksInnerObjects = this.roomData
        .machineWithDrinksInnerObjects;
    const machineWithDrinksInnerObjectLabels = this.roomData
        .machineWithDrinksInnerObjectLabels;
    const machineWithDrinksInnerCounts = this.roomData
        .machineWithDrinksInnerCounts;
    const machineWithDrinksClose = this.roomData
        .machineWithDrinksClose;

    machineWithDrinksInner.visible = b;
    for (let n = 0; n < machineWithDrinksInnerItems.length; n++) {
      if (n < this.roomData.machineWithDrinksId) {
        machineWithDrinksInnerItems[n].visible = b;
      }
    }
    for (let n = 0; n < machineWithDrinksInnerObjects.length; n++) {
      if (machineWithDrinksInnerCounts[n] > 0) {
        machineWithDrinksInnerObjects[n].visible = b;
        machineWithDrinksInnerObjectLabels[n].visible = b;
      } else {
        machineWithDrinksInnerObjects[n].visible = false;
        machineWithDrinksInnerObjectLabels[n].visible = false;
      }
    }
    machineWithDrinksClose.visible = b;
    if (!roomData.machineWithDrinksInnerCountsInitialized) {
      this.showMachineWithDrinks();
    }
    this.roomData.moodProgressBar.visible = !b;
    this.roomData.satietyProgressBar.visible = !b;
    this.roomData.drinkProgressBar.visible = !b;
    this.roomData.educationProgressBar.visible = !b;
  }

//  private class ShowMachineWithDrinksBackgroundWork extends
//      BackgroundWork<Void, GetPetDrinksResult, Void> {
//
//    @Override
//    public GetPetDrinksResult doInBackground() throws Exception {
//      return drinkService.getPetDrinks();
//    }
//
//    @Override
//    public void completed(GetPetDrinksResult result) {
//      setDrinks(result);
//    }
//
//    @Override
//    public void failed(Exception ex) {
//      log.error("ShowMachineWithDrinksBackgroundWork failed.", ex);
//      trayIcon.showTrayMessage(
//          messageSource.getMessage(StringConstants.ERROR, null, null),
//          MessageType.ERROR);
//    }
//  }

  showMachineWithDrinks() {
    //ShowMachineWithDrinksBackgroundWork work = new ShowMachineWithDrinksBackgroundWork();
    //work.setView(roomView);
    //ConnectionExceptionSettings ces = new ConnectionExceptionSettings();
    //ces.setRestart(true);
    //work.setConnectionExceptionSettings(ces);
    //backgroundWorkManager.startBackgroundWork(work);
  }

  set drinks(result) {
    const machineWithDrinksInnerCounts = this.roomData
        .machineWithDrinksInnerCounts();
    const machineWithDrinksInner = this.roomData
        .machineWithDrinksInner;
    const machineWithDrinksInnerObjects = this.roomData
        .machineWithDrinksInnerObjects;
    const machineWithDrinksInnerObjectLabels = this.roomData
        .machineWithDrinksInnerObjectLabels;
    const drinkCounts = result.drinkCounts;
    for (let entry of drinkCounts.entries()) {
      const drinkId = entry.key.ordinal();
      const drinkCount = entry.value;
      machineWithDrinksInnerCounts[drinkId] = drinkCount;
      if (machineWithDrinksInner.visible) {
        machineWithDrinksInnerObjects[drinkId]
            .visible = drinkCount > 0;
        machineWithDrinksInnerObjectLabels[drinkId]
            .visible = drinkCount > 0;
        machineWithDrinksInnerObjectLabels[drinkId].text = "" + drinkCount;
      }
    }
    this.roomData.machineWithDrinksInnerCountsInitialized = true;
  }

  set refrigeratorInnerVisible(b) {
    const refrigeratorInner = this.roomData.refrigeratorInner;
    const refrigeratorInnerItems = this.roomData
        .refrigeratorInnerItems;
    const refrigeratorInnerObjects = this.roomData
        .refrigeratorInnerObjects;
    const refrigeratorInnerObjectLabels = this.roomData
        .refrigeratorInnerObjectLabels;
    const refrigeratorInnerCounts = this.roomData.refrigeratorInnerCounts;
    const refrigeratorClose = this.roomData
        .refrigeratorClose;

    refrigeratorInner.visible = b;
    for (const n = 0; n < refrigeratorInnerItems.length; n++) {
      if (n < roomData.refrigeratorId) {
        refrigeratorInnerItems[n].visible = b;
      }
    }
    for (const n = 0; n < refrigeratorInnerObjects.length; n++) {
      if (refrigeratorInnerCounts[n] > 0) {
        refrigeratorInnerObjects[n].visible = b;
        refrigeratorInnerObjectLabels[n].visible = b;
      } else {
        refrigeratorInnerObjects[n].visible = false;
        refrigeratorInnerObjectLabels[n].visible = false;
      }
    }
    refrigeratorClose.visible = b;
    if (!roomData.refrigeratorInnerCountsInitialized) {
      this.showRefrigerator();
    }
    this.roomData.moodProgressBar.visible = !b;
    this.roomData.satietyProgressBar.visible = !b;
    this.roomData.drinkProgressBar.visible = !b;
    this.roomData.educationProgressBar.visible = !b;
  }

  set bookcaseInnerVisible(b) {
    const bookcaseInner = this.roomData.bookcaseInner;
    const bookcaseInnerItems = this.roomData.bookcaseInnerItems;
    const bookcaseInnerObjects = this.roomData.bookcaseInnerObjects;
    const books = this.roomData.bookcaseInnerBooks;
    const bookcaseClose = this.roomData.bookcaseClose;

    bookcaseInner.visible = b;
    for (let n = 0; n < bookcaseInnerItems.length; n++) {
      if (n < this.roomData.refrigeratorId) {
        bookcaseInnerItems[n].visible = b;
      }
    }
    for (let n = 0; n < bookcaseInnerObjects.length; n++) {
      bookcaseInnerObjects[n].visible = b;
      if (books[n]) {
        bookcaseInnerObjects[n].visible = b;
      } else {
        bookcaseInnerObjects[n].visible = false;
      }
    }
    bookcaseClose.visible = b;
    if (!this.roomData.bookcaseInnerBooksInitialized) {
      this.showBookcase();
    }
    this.roomData.moodProgressBar.visible = !b;
    this.roomData.satietyProgressBar.visible = !b;
    this.roomData.drinkProgressBar.visible = !b;
    this.roomData.educationProgressBar.visible = !b;
  }

  initializeBook() {
    const book = new GameObject();
    const imgids = new Array(RoomData.MAX_BOOKS_COUNT);

    for (let n = 0; n < RoomData.MAX_BOOKS_COUNT; n++) {
      imgids[n] = new Array(1);
      imgids[n][0] = ResourceManager.IMAGE_BOOK_1 + n;
    }
    book.animationImageIds = imgids;
    book.position = new Point(RoomData.ORIGINAL_BOOK_1_X,
        RoomData.ORIGINAL_BOOK_1_Y);
    book.addMouseMoveListener((mouseMoveArg) => {
      this.roomView.showDefaultCursor();
      this.roomView.toolTipText = "";
    });
    book.visible = false;
    this.addGameObject(book);
    this.roomData.book = book;
  }

  showProgressBar(maxValue, listener) {
    const progressBar = this.roomData.progressBar;
    progressBar.maxValue = maxValue;
    progressBar.value = 0;
    this.roomData.progressBarOverListener = listener;
    progressBar.visible = true;
  }

  set foods(getPetFoodResult) {
    const refrigeratorInnerCounts = this.roomData.refrigeratorInnerCounts;
    const refrigeratorInner = this.roomData.refrigeratorInner;
    const refrigeratorInnerObjects = this.roomData
        .refrigeratorInnerObjects;
    const refrigeratorInnerObjectLabels = this.roomData
        .refrigeratorInnerObjectLabels;
    const foodCounts = getPetFoodResult.foodCounts;
    for (let entry of foodCounts.entries()) {
      const foodId = entry.key.ordinal();
      const foodCount = entry.value;
      refrigeratorInnerCounts[foodId] = foodCount;
      if (refrigeratorInner.visible) {
        refrigeratorInnerObjects[foodId].visible = foodCount > 0;
        refrigeratorInnerObjectLabels[foodId].visible = foodCount > 0;
        refrigeratorInnerObjectLabels[foodId].text = "" + foodCount;
      }
    }
    this.roomData.refrigeratorInnerCountsInitialized = true;
  }

  set books(getPetBooksResult) {
    this.roomData.bookcaseInnerBooks = result.books;
    const books = this.roomData.bookcaseInnerBooks;
    const bookcaseInner = this.roomData.bookcaseInner;
    const bookcaseInnerObjects = this.roomData.bookcaseInnerObjects;
    for (let n = 0; n < books.length; n++) {
      if (bookcaseInner.visible) {
        bookcaseInnerObjects[n].visible = books[n];
      }
    }
    this.roomData.bookcaseInnerBooksInitialized = true;
  }

  set refrigeratorLevel(level) {
    this.roomData.refrigerator = this.roomData.refrigerators[level];
    const refrigerator = this.roomData.refrigerator;
    if (refrigerator != null) {
      refrigerator.visible = false;
      refrigerator.visible = true;
      if (level > 0) {
        this.roomData.refrigerators[level - 1].visible = false;
      }
    }
  }

  set bookcaseLevel(level) {
    this.roomData.bookcase = this.roomData.bookcases[level];
    const bookcase = this.roomData.bookcase;
    if (bookcase != null) {
      bookcase.visible = false;
      bookcase.visible = true;
      if (level > 0) {
        this.roomData.bookcases[level - 1].visible = false;
      }
    }
  }

  set machineWithDrinksLevel(level) {
    this.roomData.machineWithDrinks = this.roomData.machineWithDrinksArray[level];
    const machineWithDrinks = this.roomData.machineWithDrinks;
    if (machineWithDrinks != null) {
      machineWithDrinks.visible = false;
      machineWithDrinks.visible = true;
      if (level > 0) {
        this.roomData.machineWithDrinksArray[level - 1]
            .visible = false;
      }
    }
  }

  createOpenBoxReward(openBoxNewbieResult) {
    const boxes = this.roomData.boxes;
    const box = boxes[openBoxNewbieResult.index];
    box.visible = false;
    const rucksack = this.rucksack;
    const bmgos = this.rucksack.buildingMaterials;
    for (let key in openBoxNewbieResult
        .buildingMaterials) {
      const value = openBoxNewbieResult.buildingMaterials[key];
      const bmgo = bmgos[key];
      bmgo.buildingMaterialCount = bmgo.buildingMaterialCount
          + value;
      for (let n = 0; n < value; n++) {
        const position = box.position;
        const dimension = box.dimension;
        this.addCollectableGameObject(key, position.x
            + dimension.width / 2,
            position.y + dimension.width / 2);
      }
    }
  }

  showUpgradeRefrigerator() {
    try {

      this.roomData.situation =RoomData.SITUATION_UPGRADE_REFRIGERATOR_COST;
      const text = this.messageSource.getMessage(
          StringConstants.REFRIGERATOR, null, null);

      const newRefrigeratorId = this.roomData.refrigeratorId + 1;
      const costs = this.roomData
          .buildMenuCosts.refrigeratorCosts
          .get(newRefrigeratorId - 1);
      this.showUpgrade(text, costs, (aaa) => {
        this.startUpgrade(this.roomData.refrigerator);
      }, (bbb) => {
        this.roomData.situation =RoomData.SITUATION_NORMAL;
      });

    } catch (ex) {
      console.error("showUpgradeRefrigerator failed. %o", ex);
      const message = getMessageSource().getMessage(
          StringConstants.ERROR, null, null);
      this.trayIcon.showTrayMessage(message, MessageType.ERROR);
    }
  }

  set buildMenuCosts(roomBuildMenuCosts) {
    this.roomData.buildMenuCosts = result;
    const buildMenu = this.buildMenu;
    const refrigeratorCost = roomBuildMenuCosts
        .refrigeratorCosts.get(0);
    const costs = buildMenu.costs;
    for (const entry of refrigeratorCost
        .entries()) {
      costs[0][entry.key.ordinal()] = entry.value == null ? 0
          : entry.value;
    }
    const bookcaseCost = result
        .bookcaseCosts.get(0);
    for (const entry of bookcaseCost
        .entries()) {
      costs[2][entry.key.ordinal()] = entry.value == null ? 0
          : entry.value;
    }
    const machineWithDrinksCost = result
        .machineWithDrinksCosts.get(0);
    for (const entry of machineWithDrinksCost
        .entries()) {
      costs[1][entry.key.ordinal()] = entry.value == null ? 0
          : entry.value;
    }
  }

}
