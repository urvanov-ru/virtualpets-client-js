import RoomController from './RoomController.js';
import TownController from './TownController.js';
import TreasuryController from './TreasuryController.js';
import RubbishController from './RubbishController.js';
import AfternoonTeaController from './AfternoonTeaController.js';
import DressingRoomController from './DressingRoomController.js';

export default class GameController {


  gameView;
  petService;
  trayIcon;
  messageSource;
  currentController;
  hiddenObjectsService;
  backgroundWorkManager;
  roomService;

  
  showView() {
    this.gameView.showView();
    this.showRoom();
  }

  hideView() {
    this.gameView.hideView();
  }

  initialize() {

  }

  showRoom() {
    // currentController = new RoomControllerImpl();
    // RoomControllerImpl rc = (RoomControllerImpl)currentController;
    // rc.setGameController(this);
    // rc.setPetService(petService);
    // rc.setRoomView(gameView.showRoom());
    // rc.setTrayIcon(trayIcon);
    // rc.setBackgroundWorkManager(backgroundWorkManager);
    // rc.setMessageSource(messageSource);
    // rc.setFoodService(foodService);
    // rc.setRoomService(roomService);
    // rc.setRucksackService(rucksackService);
    // rc.initialize();
    const roomController = this.createRoomController();
    this.currentController = roomController;
    roomController.gameController = this;
    roomController.roomView = this.gameView.showRoom();
    roomController.baseGameView = roomController.roomView;
    roomController.messageSource = this.messageSource;
    roomController.trayIcon = this.trayIcon;
    roomController.backgroundWorkManager = this.backgroundWorkManager;
    roomController.roomService = this.roomService;
    roomController.petService = this.petService;
    roomController.initialize();
    this.gameView.reloadResources();
    
  }

  showTown() {
    // currentController = new TownControllerImpl();
    // TownControllerImpl tc = (TownControllerImpl) currentController;
    // tc.setGameController(this);
    // tc.setPetService(petService);
    // tc.setTownView(gameView.showTown());
    // tc.setTrayIcon(trayIcon);
    // tc.initialize();
    const townController = this.createTownController();
    this.currentController = townController;
    townController.gameController = this;
    townController.townView = this.gameView.showTown();
    townController.baseGameView = townController.townView;
    townController.messageSource = this.messageSource;
    townController.trayIcon = this.trayIcon;
    townController.backgroundWorkManager = this.backgroundWorkManager;
    townController.townService = this.townService;
    townController.petService = this.petService;
    townController.initialize();
    this.gameView.reloadResources();
  }

  showTreasury() {
    // currentController = new TreasuryControllerImpl();
    // TreasuryControllerImpl tc = (TreasuryControllerImpl)
    // currentController;
    // tc.setGameController(this);
    // tc.setPetService(petService);
    // tc.setTreasuryView(gameView.showTreasury());
    // tc.setTrayIcon(trayIcon);
    // tc.setHiddenObjectsService(hiddenObjectsService);
    // tc.setMessageSource(messageSource);
    // tc.setBackgroundWorkManager(backgroundWorkManager);
    // tc.initialize();
    const treasuryController = this.createTreasuryController();
    this.currentController = treasuryController;
    treasuryController.gameController = this;
    treasuryController.baseGameView = this.gameView.showTreasury();
    treasuryController.messageSource = this.messageSource;
    treasuryController.trayIcon = this.trayIcon;
    treasuryController.backgroundWorkManager = this.backgroundWorkManager;
    treasuryController.hiddenObjectsService = this.hiddenObjectsService;
    treasuryController.petService = this.petService;
    treasuryController.initialize();
    this.gameView.reloadResources();
  }

  showRubbish() {
    const rubbishController = this.createRubbishController();
    this.currentController = rubbishController;
    rubbishController.petService = this.petService;
    rubbishController.gameController = this;
    rubbishController.baseGameView = this.gameView.showRubbish();
    rubbishController.messageSource = this.messageSource;
    rubbishController.trayIcon = this.trayIcon;
    rubbishController.backgroundWorkManager = this.backgroundWorkManager;
    rubbishController.hiddenObjectsService = this.hiddenObjectsService;
    rubbishController.petService = this.petService;
    rubbishController.initialize();
    this.gameView.reloadResources();
  }

  showAfternoonTea() {
    const afternoonTeaController = this.createAfternoonTeaController();
    this.currentController = afternoonTeaController;
    afternoonTeaController.gameController = this;
    afternoonTeaController.baseGameView = this.gameView.showAfternoonTea();
    afternoonTeaController.messageSource = this.messageSource;
    afternoonTeaController.trayIcon = this.trayIcon;
    afternoonTeaController.backgroundWorkManager = this.backgroundWorkManager;
    afternoonTeaController.hiddenObjectsService = this.hiddenObjectsService;
    afternoonTeaController.petService = this.petService;
    afternoonTeaController.initialize();
    this.gameView.reloadResources();
  }

  showDressingRoom() {
    const dressingRoomController = this.createDressingRoomController();
    this.currentController = dressingRoomController;
    dressingRoomController.gameController = this;
    dressingRoomController.dressingRoomView = this.gameView.showDressingRoom();
    dressingRoomController.baseGameView = dressingRoomController.dressingRoomView;
    dressingRoomController.trayIcon = this.trayIcon;
    dressingRoomController.messageSource = this.messageSource;
    dressingRoomController.backgroundWorkManager = this.backgroundWorkManager;
    dressingRoomController.petService = this.petService;
    dressingRoomController.initialize();
    this.gameView.reloadResources();
  }

  get mainView() {
      return this.gameView;
  }

  set mainView(mainView) {
      this.gameView = mainView;
  }

  createRoomController() {
    const roomController = new RoomController();
    return roomController;
  }

  createTownController() {
    return new TownController();
  }

  createTreasuryController() {
    return new TreasuryController();
    
  }

  createDressingRoomController() {
    return new DressingRoomController();
  }

  createRubbishController() {
    return new RubbishController();
  }

  createAfternoonTeaController() {
    return new AfternoonTeaController();
  }
  
  
}
