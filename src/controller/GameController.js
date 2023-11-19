import RoomController from './RoomController.js';
import TownController from './TownController.js';

export default class GameController {


  gameView;
  petService;
  trayIcon;
  messageSource;
  currentController;
  hiddenObjectsService;
  backgroundWorkManager;
  foodService;
  clothService;
  roomService;
  rucksackService;
  journalEntryService;
  drinkService;
  bookService;

  
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
    if (this.baseGameView) this.baseGameView.release();
    const roomController = this.createRoomController();
    this.currentController = roomController;
    roomController.gameController = this;
    roomController.roomView = this.gameView.showRoom();
    roomController.baseGameView = roomController.roomView;
    roomController.messageSource = this.messageSource;
    roomController.backgroundWorkManager = this.backgroundWorkManager;
    roomController.roomService = this.roomService;
    roomController.journalEntryService = this.journalEntryService;
    roomController.rucksackService = this.rucksackService;
    roomController.drinkService = this.drinkService;
    roomController.petService = this.petService;
    roomController.foodService = this.foodService;
    roomController.bookService = this.bookService;
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
    if (this.baseGameView) this.baseGameView.release();
    const townController = this.createTownController();
    this.currentController = townController;
    townController.gameController = this;
    townController.townView = this.gameView.showTown();
    townController.baseGameView = townController.townView;
    townController.messageSource = this.messageSource;
    townController.backgroundWorkManager = this.backgroundWorkManager;
    townController.townService = this.townService;
    townController.journalEntryService = this.journalEntryService;
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
    this.gameView.showTreasury(treasuryController.getTreasuryView());
    this.treasuryController.initialize();
  }

  showRubbish() {
    const rubbishController = this.createRubbishController();
    this.currentController = rubbishController;
    this.gameView.showRubbish(rubbishController.rubbishView);
    this.rubbishController.initialize();
  }

  showAfternoonTea() {
    const afternoonTeaController = this.createAfternoonTeaController();
    this.currentController = afternoonTeaController;
    this.gameView.showAfternoonTea(afternoonTeaController.afternoonTeaView);
    this.afternoonTeaController.initialize();
  }

  showDressingRoom() {
    // currentController = new DressingRoomControllerImpl();
    // DressingRoomControllerImpl drc = (DressingRoomControllerImpl)
    // currentController;
    // drc.setGameController(this);
    // drc.setPetService(petService);
    // drc.setDressingRoomView(gameView.showDressingRoom());
    // drc.setTrayIcon(trayIcon);
    // drc.setHiddenObjectsService(hiddenObjectsService);
    // drc.setMessageSource(messageSource);
    // drc.setBackgroundWorkManager(backgroundWorkManager);
    // drc.setClothService(clothService);
    // drc.initialize();
    const dressingRoomController = this.createDressingRoomController();
    this.currentController = dressingRoomController;
    this.gameView.showDressingRoom(dressingRoomController.dressingRoomView);
    this.dressingRoomController.initialize();
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
    return new TeaController();
  }
}
