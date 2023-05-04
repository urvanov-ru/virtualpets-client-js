
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
      getRoomInfo();
      getRoomInfoWithDelay();
      getBuildMenuCosts();
      getRucksackInner();
    });
    this.roomView.addClickedListener((sender, data) => {this.mouseClicked(sender, data);});
    this.roomData = new RoomData();
    this.initializeTilesEngineForRoom();

    const background = new GameObject();
    background.position = new Point(0, 0);
    background.z = -1;
    background.addMouseMoveListener((arg) => {
      roomView.showDefaultCursor();
      roomView.toolTipText = "";
      this.highlightObject = null;
    });
    
    const imgids = [[ResourceManagerBase.IMAGE_ROOM_BACKGROUND]];
    background.animationImageIds = imgids;
    addGameObject(background);
    addGameObject(background);
    this.roomData.setBackground(background);
    initRefrigerators();

    initializeBookcases();

    initializeMachineWithDrinksArray();
    //
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

    initializeArrowRight();

    initializeNewbieBoxes();

    const pet = initializePetGameObject();

    pet.position = new Point(RoomData.ORIGINAL_PET_X, RoomData.ORIGINAL_PET_Y);
    this.roomData.pet = pet;

    const clothObjects = initializeClothGameObjects(); // Map<Integer, ClothGameObject> 
    for (const entry of clothObjects.entries()) {
      const cgo = entry.value;
      cgo.visible = false;
      cgo.position = new Point(RoomData.ORIGINAL_PET_X, RoomData.ORIGINAL_PET_Y);
    }
    this.roomData.clothObjects = clothObjects;

    initializeFood();

    initializeBook();

    initRefrigeratorInnerObjects();

    initializeBookcaseInnerObjects();

    initializeMachineWithDrinksInnerObjects();

    initializeRucksack();

    initializeBuildMenu();

    initializeJournal();

    initializeJournalOnFloor();

    this.roomData.refrigeratorInnerCounts = new int[FoodType.values().length];
    this.roomData.machineWithDrinksInnerCounts = new int[DrinkType.values().length];

    initializeMessageBox();
    initializeUpgrade();

    initializeIndicators();

    initializeRefrigeratorPopupMenu();
    initializeBookcasePopupMenu();
    initializeMachineWithDrinksPopupMenu();
    
    initializeAchievementInfo();
    
    this.roomView.setRoomData(roomData);
  }

  initializeIndicators() {
    const satietyLabel = new LabelGameObject();
    satietyLabel.visible = false;
    satietyLabel.position = new Point(10, 570);
    satietyLabel.text = this.messageSource.getMessage(StringConstants.FEED,
        null, null);
    addGameObject(satietyLabel);
    roomData.satietyLabel = satietyLabel;
    const satietyProgressBar = new ProgressBarGameObject();
    satietyProgressBar.visible = false;
    satietyProgressBar.position = new Point(100, 570);
    satietyProgressBar.dimension = new Dimension(100, 20);
    satietyProgressBar.maxValue = 100;
    addGameObject(satietyProgressBar);
    this.roomDatasatietyProgressBar = satietyProgressBar;

    const drinkLabel = new LabelGameObject();
    drinkLabel.visible = false;
    drinkLabel.position = new Point(200, 570);
    drinkLabel.text = messageSource.getMessage(StringConstants.DRINK,
        null, null);
    addGameObject(drinkLabel);
    this.roomData.drinkLabel = drinkLabel;
    const drinkProgressBar = new ProgressBarGameObject();
    drinkProgressBar.visible = false;
    drinkProgressBar.position = new Point(300, 570);
    drinkProgressBar.dimension = new Dimension(100, 20);
    addGameObject(drinkProgressBar);
    this.roomData.drinkProgressBar = drinkProgressBar;

    const educationLabel = new LabelGameObject();
    educationLabel.setVisible(false);
    educationLabel.setPosition(new Point(400, 570));
    educationLabel.setText(messageSource.getMessage(StringConstants.TEACH,
        null, null));
    addGameObject(educationLabel);
    this.roomData.educationLabel = educationLabel;
    const educationProgressBar = new ProgressBarGameObject();
    educationProgressBar.visible = false;
    educationProgressBar.position = new Point(500, 570);
    educationProgressBar.dimension = new Dimension(100, 20);
    addGameObject(educationProgressBar);
    this.roomData.educationProgressBar = educationProgressBar;

    const moodLabel = new LabelGameObject();
    moodLabel.visible = false;
    moodLabel.position = new Point(600, 570);
    moodLabel.text = messageSource.getMessage(StringConstants.PLAY, null,
        null);
    addGameObject(moodLabel);
    roomData.moodLabel = moodLabel;
    const moodProgressBar = new ProgressBarGameObject();
    moodProgressBar.visible = false;
    moodProgressBar.position = new Point(700, 570);
    moodProgressBar.dimension = new Dimension(100, 20);
    addGameObject(moodProgressBar);
    this.roomData.moodProgressBar = moodProgressBar;

    const progressBar = new ProgressBarGameObject();
    progressBar.visible = false;
    progressBar.position = new Point(300, 500);
    progressBar.dimension = new Dimension(200, 20);
    addGameObject(progressBar);
    this.roomData.setProgressBar(progressBar);
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
          journalCloseClicked();
        });
    this.journal.visible = false;
  }


}
