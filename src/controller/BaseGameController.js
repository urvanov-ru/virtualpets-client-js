import UpgradeInfo from './base/domain/UpgradeInfo.js';

export default class BaseGameController {

  messageSource;
  backgroundWorkManager;
  baseGameView;
  rucksackService;
  journalEntryService;
  trayIcon;

  static get ORIGINAL_RUCKSACK_X() { return 700; }
  static get ORIGINAL_RUCKSACK_Y() { return 500; }

  static get ORIGINAL_RUCKSACK_CLOSE_X() { return 700; }
  static get ORIGINAL_RUCKSACK_CLOSE_Y() { return 10; }

  static get MENU_Z_ORDER() { return 10000; }

  static get RUCKSACK_MENU_ITEM_COUNT() { return 9; }

  static get ORIGINAL_BUILD_MENU_X() { return 600; }
  static get ORIGINAL_BUILD_MENU_Y() { return 500; }

  static get ORIGINAL_BUILD_MENU_CLOSE_X() { return 700; }
  static get ORIGINAL_BUILD_MENU_CLOSE_Y() { return 10; }

  static get ORIGINAL_JOURNAL_X() { return 500; }
  static get ORIGINAL_JOURNAL_Y() { return 500; }

  static get ORIGINAL_JOURNAL_CLOSE_X() { return 700; }
  static get ORIGINAL_JOURNAL_CLOSE_Y() { return 10; }

  rucksack;

  buildMenu;

  journal;

  tilesEngine;

  #insufficientResourcesString;

  #showRucksackInnerListeners = []; //new ArrayList<SimpleEvent<BaseGameView, Void>>();

  #gameObjects = []; // new ArrayList<GameObject>();

  #pet;

  #progressBar;

  #messageBox;

  #levelInfo;

  #achievementInfo;

  initialize() {
    this.addShowRucksackInnerListener((sender, data) => {
      getRucksackInner();
    });
    this.initializeProgressBar();
    this.baseGameView
        .addClickedListener((arg) => {this.mouseClicked(arg);});
    baseGameView
        .addMouseMoveListener((arg) => {this.mouseMoved(arg);});
  }

  initializeProgressBar() {
    this.#progressBar = new ProgressBarGameObject();
    this.#progressBar.step = function() {
      if (this.visible) {
        this.value = value + 1;
        if (this.value == this.maxValue)
          this.fireAnimationOver(new AnimationOverArg());
    };
    this.#progressBar.visible = false;
    this.#progressBar.position = new Point(300, 500);
    this.#progressBar.dimension = new Dimension(200, 20);
    this.addGameObject(progressBar);
  }

  mouseClicked(clickedArg) {
    if (this.buildingGameObject != null
        && this.buildingState == BuildingState.SELECT_POSITION) {
      clickedArg.handled = true;
      this.buildingState = BuildingState.MOVE_PET;
      const moveTilesTarget = this.tilesEngine
          .translateToTileCoordinates(buildingGameObject);
      this.buildingGameObject.visible = false;
      const petTileCoordinates = this.tilesEngine
          .translateToTileCoordinates(pet);
      const tilesMovePath = this.tilesEngine.findPath(petTileCoordinates,
          moveTilesTarget);
      if (tilesMovePath != null) {
        const movePath = new Point[tilesMovePath.length];
        for (let n = 0; n < movePath.length; n++) {
          const tilePoint = tilesMovePath[n];
          movePath[n] = this.tilesEngine.translateFromTileCoordinates(pet,
              tilePoint);
        }
        // buildingGameObject
        // .setZ((buildingGameObject.getPosition().getY() +
        // buildingGameObject.getDimension().getHeight()) *
        // GameObject.TILE_Z_STEP);
        pet.setMove(
            movePath,
            () -> {
              // Начать постройку.
              this.buildingState = BuildingState.BUILDING;
              this.progressBar.visible = true;
              this.progressBar.value = 0;
              this.progressBar.removeAllAnimationOverListeners();
              this.progressBar
                  .addAnimationOverListener((progressBarOverListener) => {
                    this.buildingState = BuildingState.OVER;
                    this.progressBar.visible = false;
                    this.buildingGameObject
                        .visible = false;
                    this.buildingGameObject.fireBuildEvent();
                    this.buildingGameObject = null;

                  });
            });
        this.buildingGameObject.visible = false;
      }
    } else if (this.movingState == MovingState.SELECT_POSITION
        && this.movingGameObject != null) {
      clickedArg.handled = true;
      this.movingGameObject.fireMoveEvent();
      this.movingGameObject = null;
      this.movingState = MovingState.IDDLE;
    }
  }

  mouseMoved(mouseMoveArg) {
    if (this.buildingGameObject != null
        && (this.buildingState == BuildingState.STARTED || this.buildingState == BuildingState.SELECT_POSITION)) {
      this.buildingState = BuildingState.SELECT_POSITION;
      this.buildingGameObject.position = this.tilesEngine
          .translateFromTileCoordinates(this.buildingGameObject,
              this.tilesEngine.translateToTileCoordinates(arg
                  .mousePosition));
      mouseMoveArg.handled = true;
    } else if (this.movingGameObject != null
        && (this.movingState == MovingState.STARTED || this.movingState == MovingState.SELECT_POSITION)) {
      this.movingState = MovingState.SELECT_POSITION;
      this.movingGameObject.position = this.tilesEngine
          .translateFromTileCoordinates(this.movingGameObject,
              this.tilesEngine.translateToTileCoordinates(arg
                  .mousePosition));
      mouseMoveArg.handled = true;
    } else if (this.upgradingGameObject != null
        && this.upgradingState == UpgradingState.STARTED) {
      this.upgradingState = UpgradingState.MOVE_PET;
      mouseMoveArg.handled = true;
    }
  }

//  private class ShowBuildMaterialsBackgroundWork extends
//      BackgroundWork<Void, GetPetRucksackInnerResult, Void> {
//
//    @Override
//    public GetPetRucksackInnerResult doInBackground() throws Exception {
//      return rucksackService.getPetRucksackInner();
//    }
//
//    @Override
//    public void completed(GetPetRucksackInnerResult result) {
//      BaseGameControllerImpl.this.setRucksackInner(result);
//    }
//
//    @Override
//    public void failed(Exception ex) {
//      log.error("ShowBuildMaterialsBackgroundWork failed.", ex);
//      String message = messageSource.getMessage(StringConstants.ERROR,
//          null, null) + ": " + ex.toString();
//      trayIcon.showTrayMessage(message, MessageType.ERROR);
//    }
//  }

  getRucksackInner() {
    //ShowBuildMaterialsBackgroundWork work = new ShowBuildMaterialsBackgroundWork();
    //work.setView(baseGameView);
    //ConnectionExceptionSettings ces = new ConnectionExceptionSettings();
    //ces.setRestart(true);
    //work.setConnectionExceptionSettings(ces);
    //backgroundWorkManager.startBackgroundWork(work);
  }

  initializeClothGameObjects() {
    const map = new Map(); // new HashMap<Integer, ClothGameObject>();
    map.set(1, this.initializeClothGameObject(1));
    map.set(2, this.initializeClothGameObject(2));
    map.set(3, this.initializeClothGameObject(3));
    map.set(4, this.initializeClothGameObject(4));
    map.set(5, this.initializeClothGameObject(5));
    map.set(6, this.initializeClothGameObject(6));
    map.set(7, this.initializeClothGameObject(7));
    map.set(8, this.initializeClothGameObject(8));
    map.set(9, this.initializeClothGameObject(9));
    return map;
  }

  initializeClothGameObject(int clothId) {
    const resourceIds = [ 0, ResourceManager.IMAGE_CAT_HAT_1,
        ResourceManager.IMAGE_CAT_HAT_2,
        ResourceManager.IMAGE_CAT_HAT_3,
        ResourceManager.IMAGE_CAT_CLOTH_1,
        ResourceManager.IMAGE_CAT_CLOTH_2,
        ResourceManager.IMAGE_CAT_CLOTH_3,
        ResourceManager.IMAGE_CAT_BOW_1,
        ResourceManager.IMAGE_CAT_BOW_2,
        ResourceManager.IMAGE_CAT_BOW_3 ];
    const imgids = new int[1][];
    imgids[0] = new int[1];
    imgids[0][0] = resourceIds[clothId];
    const go = new ClothGameObject();
    go.animationImageIds = imgids;
    go.clothId = clothId;
    this.addGameObject(go);
    return go;
  }

  initializeBookGameObjects() {
    const map = new Map(); // new HashMap<Integer, BookGameObject>();
    for (let n = 1; n <= 18; n++)
      map.set(n, initializeBookGameObject(n));
    return map;
  }

  initializeBookGameObject(int bookId) {
    const resourceIds = [ 0, ResourceManager.IMAGE_BOOK_1,
        ResourceManager.IMAGE_BOOK_2,
        ResourceManager.IMAGE_BOOK_3,
        ResourceManager.IMAGE_BOOK_4,
        ResourceManager.IMAGE_BOOK_5,
        ResourceManager.IMAGE_BOOK_6,
        ResourceManager.IMAGE_BOOK_7,
        ResourceManager.IMAGE_BOOK_8,
        ResourceManager.IMAGE_BOOK_9,
        ResourceManager.IMAGE_BOOK_10,
        ResourceManager.IMAGE_BOOK_11,
        ResourceManager.IMAGE_BOOK_12,
        ResourceManager.IMAGE_BOOK_13,
        ResourceManager.IMAGE_BOOK_14,
        ResourceManager.IMAGE_BOOK_15,
        ResourceManager.IMAGE_BOOK_16,
        ResourceManager.IMAGE_BOOK_17,
        ResourceManager.IMAGE_BOOK_18 ];
    const imgids = [[ resourceIds[bookId] ]];
    const bookGameObject = new BookGameObject();
    bookGameObject.animationImageIds = imgids;
    bookGameObject.bookId = bookId;
    this.addGameObject(bookGameObject);
    return bookGameObject;
  }

  initializePetGameObject() {
    const pet = new PetGameObject();
    if (this.pet == null)
      this.pet = pet;
    pet.dimension = new Dimension(PetGameObject.WIDTH,
        PetGameObject.HEIGHT);
    const imgids = new int[3][];
    imgids[PetGameObject.STATE_NORMAL] = new Array(20);
    imgids[PetGameObject.STATE_NORMAL][0] = ResourceManager.IMAGE_CAT_NORMAL_1;
    imgids[PetGameObject.STATE_NORMAL][1] = ResourceManager.IMAGE_CAT_NORMAL_2;
    imgids[PetGameObject.STATE_NORMAL][2] = ResourceManager.IMAGE_CAT_NORMAL_3;
    imgids[PetGameObject.STATE_NORMAL][3] = imgids[PetGameObject.STATE_NORMAL][1];
    imgids[PetGameObject.STATE_NORMAL][4] = imgids[PetGameObject.STATE_NORMAL][0];
    imgids[PetGameObject.STATE_NORMAL][5] = imgids[PetGameObject.STATE_NORMAL][0];
    imgids[PetGameObject.STATE_NORMAL][6] = imgids[PetGameObject.STATE_NORMAL][0];
    imgids[PetGameObject.STATE_NORMAL][7] = imgids[PetGameObject.STATE_NORMAL][0];
    imgids[PetGameObject.STATE_NORMAL][8] = imgids[PetGameObject.STATE_NORMAL][0];
    imgids[PetGameObject.STATE_NORMAL][9] = imgids[PetGameObject.STATE_NORMAL][0];
    imgids[PetGameObject.STATE_NORMAL][10] = imgids[PetGameObject.STATE_NORMAL][0];
    imgids[PetGameObject.STATE_NORMAL][11] = imgids[PetGameObject.STATE_NORMAL][0];
    imgids[PetGameObject.STATE_NORMAL][12] = imgids[PetGameObject.STATE_NORMAL][0];
    imgids[PetGameObject.STATE_NORMAL][13] = imgids[PetGameObject.STATE_NORMAL][0];
    imgids[PetGameObject.STATE_NORMAL][14] = imgids[PetGameObject.STATE_NORMAL][0];
    imgids[PetGameObject.STATE_NORMAL][15] = imgids[PetGameObject.STATE_NORMAL][0];
    imgids[PetGameObject.STATE_NORMAL][16] = imgids[PetGameObject.STATE_NORMAL][0];
    imgids[PetGameObject.STATE_NORMAL][17] = imgids[PetGameObject.STATE_NORMAL][0];
    imgids[PetGameObject.STATE_NORMAL][18] = imgids[PetGameObject.STATE_NORMAL][0];
    imgids[PetGameObject.STATE_NORMAL][19] = imgids[PetGameObject.STATE_NORMAL][0];
    imgids[PetGameObject.STATE_EDUCATION] = new Array(9);
    imgids[PetGameObject.STATE_EDUCATION][0] = ResourceManager.IMAGE_CAT_EDUCATION_1;
    imgids[PetGameObject.STATE_EDUCATION][1] = ResourceManager.IMAGE_CAT_EDUCATION_2;
    imgids[PetGameObject.STATE_EDUCATION][2] = ResourceManager.IMAGE_CAT_EDUCATION_3;
    imgids[PetGameObject.STATE_EDUCATION][3] = ResourceManager.IMAGE_CAT_EDUCATION_4;
    imgids[PetGameObject.STATE_EDUCATION][4] = ResourceManager.IMAGE_CAT_EDUCATION_5;
    imgids[PetGameObject.STATE_EDUCATION][5] = ResourceManager.IMAGE_CAT_EDUCATION_4;
    imgids[PetGameObject.STATE_EDUCATION][6] = ResourceManager.IMAGE_CAT_EDUCATION_3;
    imgids[PetGameObject.STATE_EDUCATION][7] = ResourceManager.IMAGE_CAT_EDUCATION_2;
    imgids[PetGameObject.STATE_EDUCATION][8] = ResourceManager.IMAGE_CAT_EDUCATION_1;
    imgids[PetGameObject.STATE_EAT] = new Array(9);
    imgids[PetGameObject.STATE_EAT][0] = ResourceManager.IMAGE_CAT_EAT_1;
    imgids[PetGameObject.STATE_EAT][1] = ResourceManager.IMAGE_CAT_EAT_2;
    imgids[PetGameObject.STATE_EAT][2] = ResourceManager.IMAGE_CAT_EAT_3;
    imgids[PetGameObject.STATE_EAT][3] = ResourceManager.IMAGE_CAT_EAT_2;
    imgids[PetGameObject.STATE_EAT][4] = ResourceManager.IMAGE_CAT_EAT_1;
    imgids[PetGameObject.STATE_EAT][5] = ResourceManager.IMAGE_CAT_EAT_2;
    imgids[PetGameObject.STATE_EAT][6] = ResourceManager.IMAGE_CAT_EAT_3;
    imgids[PetGameObject.STATE_EAT][7] = ResourceManager.IMAGE_CAT_EAT_2;
    imgids[PetGameObject.STATE_EAT][8] = ResourceManager.IMAGE_CAT_EAT_1;
    pet.animationImageIds = imgids;
    pet.loopAnimation = true;
    this.addGameObject(pet);
    return pet;
  }

  initializeBuildingMaterialGameObjects() {
    const a = new BuildingMaterialGameObject[9];
    a[0] = this.initializeBuildingMaterialGameObject(BuildingMaterialType.TIMBER);
    a[1] = this.initializeBuildingMaterialGameObject(BuildingMaterialType.BOARD);
    a[2] = this.initializeBuildingMaterialGameObject(BuildingMaterialType.STONE);
    a[3] = this.initializeBuildingMaterialGameObject(BuildingMaterialType.CHIP);
    a[4] = this.initializeBuildingMaterialGameObject(BuildingMaterialType.WIRE);
    a[5] = this.initializeBuildingMaterialGameObject(BuildingMaterialType.IRON);
    a[6] = this.initializeBuildingMaterialGameObject(BuildingMaterialType.OIL);
    a[7] = this.initializeBuildingMaterialGameObject(BuildingMaterialType.BLUE_CRYSTAL);
    a[8] = this.initializeBuildingMaterialGameObject(BuildingMaterialType.RUBBER);
    return a;
  }

  initializeBuildingMaterialGameObject(buildingMaterialType) {
    const go = new BuildingMaterialGameObject();
    go.dimension = new Dimension(64, 64);
    go.buildingMaterialType = buildingMaterialType;
    go.visible = false;
    go.z = BaseGameController.MENU_Z_ORDER;
    this.addGameObject(go);
    const resourceIds = new Map(); // HashMap<BuildingMaterialType, Integer>();
    resourceIds.set(BuildingMaterialType.TIMBER,
        ResourceManager.IMAGE_BUILDING_MATERIAL_TIMBER);
    resourceIds.set(BuildingMaterialType.BOARD,
        ResourceManager.IMAGE_BUILDING_MATERIAL_BOARD);
    resourceIds.set(BuildingMaterialType.STONE,
        ResourceManager.IMAGE_BUILDING_MATERIAL_STONE);
    resourceIds.set(BuildingMaterialType.CHIP,
        ResourceManager.IMAGE_BUILDING_MATERIAL_CHIP);
    resourceIds.set(BuildingMaterialType.WIRE,
        ResourceManager.IMAGE_BUILDING_MATERIAL_WIRE);
    resourceIds.set(BuildingMaterialType.IRON,
        ResourceManager.IMAGE_BUILDING_MATERIAL_IRON);
    resourceIds.set(BuildingMaterialType.OIL,
        ResourceManager.IMAGE_BUILDING_MATERIAL_OIL);
    resourceIds.set(BuildingMaterialType.BLUE_CRYSTAL,
        ResourceManager.IMAGE_BUILDING_MATERIAL_BLUE_CRYSTAL);
    resourceIds.set(BuildingMaterialType.RUBBER,
        ResourceManager.IMAGE_BUILDING_MATERIAL_RUBBER);
    const imgids = [[ resourceIds.get(go.getBuildingMaterialType()) ]];
    go.animationImageIds = imgids;
    return go;
  }

  initializeRucksackMenuItem(index) {
    const go = new GameObject();
    const imgids = [[ ResourceManager.IMAGE_BUILDING_MATERIAL_MENU_ITEM ]];
    go.animationImageIds = imgids;
    const position = new Point((index % 3) * 100 + 250,
        (index / 3) * 100 + 150);
    go.position = position;
    go.z = BaseGameController.MENU_Z_ORDER;
    go.visible = false;
    this.addGameObject(go);
    return go;
  }

  initializeRucksackMenuItemLabel(index) {
    const lgo = new LabelGameObject();
    lgo.text = "";
    lgo.visible = false;
    lgo.position = new Point((index % 3) * 100 + 250,
        (index / 3) * 100 + 60 + 150);
    lgo.z = BaseGameController.MENU_Z_ORDER;
    this.addGameObject(lgo);
    return lgo;
  }

  initializeRucksack() {
    const rucksackInner = new GameObject();
    const imgids = [[ ResourceManager.IMAGE_RUCKSACK_INNER ]];
    rucksackInner.animationImageIds = imgids;
    rucksackInner.z = BaseGameController.MENU_Z_ORDER;
    rucksackInner.visible = false;

    const closeObject = new HighlightGameObjectImpl();
    closeObject.animationImageIds = [[ ResourceManager.IMAGE_RUCKSACK_CLOSE ][ ResourceManager.IMAGE_RUCKSACK_CLOSE_HIGHLIGHT ]];
    closeObject.z = BaseGameController.MENU_Z_ORDER;
    closeObject.position = new Point(BaseGameController.ORIGINAL_RUCKSACK_CLOSE_X,
        BaseGameController.ORIGINAL_RUCKSACK_CLOSE_Y);
    closeObject.visible = false;

    this.rucksack = new RucksackGameObject();
    this.rucksack.animationImageIds = [[ ResourceManager.IMAGE_RUCKSACK ][ ResourceManager.IMAGE_RUCKSACK_HIGHLIGHT ]];
    this.rucksack.position = new Point(BaseGameController.ORIGINAL_RUCKSACK_X, BaseGameController.ORIGINAL_RUCKSACK_Y);
    this.rucksack.inner = rucksackInner;

    this.rucksack.close = closeObject;

    this.addGameObject(rucksack);
    this.addGameObject(rucksackInner);
    this.addGameObject(closeObject);

    const rucksackMenuItems = new Array(RUCKSACK_MENU_ITEM_COUNT);
    const rucksackMenuItemLabels = new Array(RUCKSACK_MENU_ITEM_COUNT);
    for (let n = 0; n < rucksackMenuItems.length; n++) {
      rucksackMenuItems[n] = this.initializeRucksackMenuItem(n);
      rucksackMenuItemLabels[n] = this.initializeRucksackMenuItemLabel(n);
    }
    this.rucksack.menuItems = rucksackMenuItems;
    this.rucksack.menuItemLabels = rucksackMenuItemLabels;

    const buildMaterials = this.initializeBuildingMaterialGameObjects();
    for (let n = 0; n < buildMaterials.length; n++) {
      buildMaterials[n].position = new Point((n % 3) * 100 + 250 + 18,
          (n / 3) * 100 + 150 + 18);
    }
    this.rucksack.buildMaterials = buildMaterials;

    this.rucksack.addClickedListener((clickedArg) => {
      this.showRucksackInner(getRucksack());
      this.fireShowRucksackInner();
    });

    this.rucksack.addMouseMoveListener((mouseMoveArg) => {
      this.setHighlightObject(getRucksack());
      this.baseGameView.showHandCursor();
      this.baseGameView.setToolTipText("");
    });

    this.rucksack.close.addClickedListener((clickedArg) => {
      this.hideRucksackInner(this.rucksack);
    });
    closeObject.addMouseMoveListener((mouseMoveArg) => {
      this.highlightObject = this.rucksack.close;
      this.baseGameView.showHandCursor();
      this.baseGameView.toolTipText = "";
    });
    rucksackInner.addMouseMoveListener((mouseMoveArg) => {
      this.highlightObject = null;
      this.baseGameView.showDefaultCursor();
      this.baseGameView.toolTipText = "";
    });
    return rucksack;
  }

  showRucksackInner(rucksack) {
    const rucksackMenuItems = this.rucksack.menuItems;
    const rucksackInner = this.rucksack.inner;
    const buildingMaterials = this.rucksack.buildingMaterials;
    const rucksackMenuItemLabels = this.rucksack.menuItemLabels;
    for (let n = 0; n < rucksackMenuItems.length; n++) {
      rucksackMenuItems[n].visible = true;
    }
    rucksackInner.visible = true;
    for (let n = 0; n < buildingMaterials.length; n++) {
      if (buildingMaterials[n].buildingMaterialCount > 0) {
        buildingMaterials[n].visible = true;
        rucksackMenuItemLabels[n].visible = true;
      }
    }
    rucksack.close.visible = true;
  }

  hideRucksackInner(rucksack) {
    const rucksackMenuItems = this.rucksack.menuItems;
    const rucksackInner = this.rucksack.inner;
    const buildMaterials = this.rucksack.buildingMaterials;
    const rucksackMenuItemLabels = this.rucksack.menuItemLabels;
    for (let n = 0; n < rucksackMenuItems.length; n++) {
      rucksackMenuItems[n].visible = false;
      rucksackMenuItemLabels[n].visible = false;
    }
    rucksackInner.visible = false;
    for (const bm of buildMaterials) {
      bm.visible = false;
      ;
    }
    this.rucksack.close.visible = false;
  }

  set rucksackInner(getPetRucksackInnerResult) {
    const rucksackInner = this.rucksack.inner;
    const buildingMaterials = this.rucksack.buildingMaterials;
    const buildingMaterialCountsMap = getPetRucksackInnerResult
        .buildingMaterialCounts;
    const menuItemLabels = this.rucksack.menuItemLabels;
    for (const entry of buildingMaterialCountsMap.entries()) {
      const buildingMaterialId = entry.key.ordinal();
      const buildingMaterialCount = entry.value;
      buildingMaterials[buildingMaterialId]
          .buildingMaterialCount = buildingMaterialCount;
      menuItemLabels[buildingMaterialId].text = "" + buildingMaterialCount;
      if (rucksackInner.visible) {
        buildingMaterials[buildingMaterialId]
            .buildingMaterialCount = buildingMaterialCount;
        buildingMaterials[buildingMaterialId]
            .visible = buildingMaterialCount > 0;
        menuItemLabels[buildingMaterialId]
            .visible = buildingMaterialCount > 0;
      }
    }
  }

  addShowRucksackInnerListener(simpleEvent) {
    this.showRucksackInnerListeners.push(simpleEvent);
  }

  fireShowRucksackInner() {
    for (const listener of showRucksackInnerListeners) {
      listener.eventFired(this.baseGameView, null);
    }
  }

  set highlightObject(highlightObject) {
    for (const go of this.gameObjects) {
      if (go instanceof HighlightGameObject) {
        if (go! = highlightObject) {
          go.state = HighlightGameObject.OBJECT_NORMAL;
        }
      }
    }
    if (highlightObject != null) {
      highlightObject.state = HighlightGameObject.OBJECT_HIGHLIGHT;
    }
  }

  addCollectableGameObject(buildingMaterialType, x, y) {
    return this.addCollectableGameObject(
        ResourceManager.IMAGE_BUILDING_MATERIAL_TIMBER
            + buildingMaterialType.ordinal(), x, y);

  }

  addCollectableGameObject(gameObject, x, y) {
    return this.addCollectableGameObject(gameObject.animationImageIds[0][0], x, y);
  }

  addCollectableGameObject(resourceId, x, y) {
    const go = new CollectableGameObject();
    const imgids = [[ resourceId ]];
    go.animationImageIds = imgids;
    go.position = new Point(x, y);
    go.addMouseMoveListener((mouseMoveArg) => {
        const go = mouseMoveArg.sender;
        go.forceTimeToLifeOver();
      }
    });
    go.rucksack = rucksack;
    this.addGameObject(go);
    this.baseGameView.initializeCollectableGameObject(go);
    return go;
  }

  addExperienceGameObject(x, y) {
    const go = new ExperienceGameObject();
    const imgids = [[ ResourceManager.IMAGE_EXPERIENCE ]];
    go.animationImageIds = imgids;
    go.position = new Point(x, y);
    go.addMouseMoveListener((mouseMoveArg) => {
        const sender = mouseMoveArg.sender;
        sender.forceTimeToLifeOver();
    });
    go.levelInfo = levelInfo;
    this.addGameObject(go);
    this.baseGameView.initializeExperienceGameObject(go);
    return go;
  }

  initializeTilesEngine(tiles) {
    this.tilesEngine = new TilesEngine(tiles);
    for (const go of gameObjects) {
      if (go.getTileTypes() != null) {
        this.tilesEngine.addGameObject(go);
      }
    }
  }

  initializeTilesEngine() {
    this.tilesEngine = new TilesEngine(6, 8);
  }

  initializeTilesEngineForRoom() {
    this.tilesEngine = new TilesEngine(6, 9, TilesEngine.DEFAULT_TILE_WIDTH,
        TilesEngine.DEFAULT_TILE_HEIGHT / 2);
  }

  getTilesEngine() {
    return this.tilesEngine;
  }

  initializeBuildMenu() {
    this.insufficientResourcesString = this.messageSource.getMessage(
        StringConstants.INSUFFICIENT_RESOURCES, null, null);
    const buildMenuInner = new GameObject();
    buildMenuInner.animationImageIds = [[ ResourceManager.IMAGE_BUILD_MENU_INNER ]];
    buildMenuInner.z = BaseGameController.MENU_Z_ORDER;
    buildMenuInner.visible = false;
    buildMenuInner.addMouseMoveListener((mouseMoveArg) => {
        this.hideBuildObjectToolTip();
    });

    const closeObject = new HighlightGameObjectImpl();
    closeObject.animationImageIds = [[ ResourceManager.IMAGE_BUILD_MENU_CLOSE ] [ ResourceManager.IMAGE_BUILD_MENU_CLOSE_HIGHLIGHT ]];
    closeObject.position = new Point(BaseGameController.ORIGINAL_BUILD_MENU_CLOSE_X,
        BaseGameController.ORIGINAL_BUILD_MENU_CLOSE_Y);
    closeObject.z = BaseGameController.MENU_Z_ORDER;
    closeObject.visible = false;

    this.buildMenu = new BuildMenuGameObject();
    this.buildMenu.position = new Point(ORIGINAL_BUILD_MENU_X,
        ORIGINAL_BUILD_MENU_Y);

    this.buildMenu.inner = buildMenuInner;

    this.buildMenu.close = closeObject;

    this.buildMenu.animationImageIds = [[ ResourceManager.IMAGE_HAMMER ][ ResourceManager.IMAGE_HAMMER_HIGHLIGHT ]];

    this.addGameObject(buildMenu);
    this.addGameObject(buildMenuInner);
    this.addGameObject(closeObject);

    this.buildMenu.menuItems = new GameObject[0];
    this.buildMenu.buildObjects = new GameObject[0];

    this.buildMenu.addClickedListener((clickedArg) => {
        this.showBuildMenuInner(this.buildMenu);
    });

    this.buildMenu.addMouseMoveListener((mouseMoveArg) => {
        this.highlightObject(this.buildMenu);
        this.baseGameView.showHandCursor();
        this.baseGameView.toolTipText = "";
    });

    this.buildMenu.close.addClickedListener((clickedArg) => {
        this.hideBuildMenuInner(this.buildMenu);
    });
    closeObject.addMouseMoveListener((mouseMoveArg) => {
        this.highlightObject = this.buildMenu.close;
        this.baseGameView.showHandCursor();
        this.baseGameView.toolTipText = "";
    });
    buildMenuInner.addMouseMoveListener((mouseMoveArg) => {
        this.highlightObject = null;
        this.baseGameView.showDefaultCursor();
        this.baseGameView.toolTipText = "";
    });
    const buildMenuToolTip = new GameObject();
    buildMenuToolTip
        .animationImageIds = [[ ResourceManager.IMAGE_BUILD_MENU_TOOLTIP ]];
    buildMenuToolTip.visible =false;
    buildMenuToolTip.z = BaseGameController.MENU_Z_ORDER + 1;
    this.addGameObject(buildMenuToolTip);
    this.buildMenu.tooltip = buildMenuToolTip;
    const toolTipLabel = new LabelGameObject();
    toolTipLabel.visible = false;
    this.addGameObject(toolTipLabel);
    this.buildMenu.toolTipLabel = toolTipLabel;
    const toolTipInsufficientResources = new LabelGameObject();
    toolTipInsufficientResources.text = insufficientResourcesString;
    toolTipInsufficientResources.visible = false;
    this.addGameObject(toolTipInsufficientResources);
    this.buildMenu.toolTipInsufficientResources = toolTipInsufficientResources;
    this.buildMenu.buildingMaterialObjects(this
        .initializeBuildingMaterialGameObjects());
    const costLabels = new LabelGameObject[buildMenu
        .buildingMaterialObjects.length];
    for (let n = 0; n < this.buildMenu.buildingMaterialObjects.length; n++) {
      costLabels[n] = new LabelGameObject();
      costLabels[n].visible = false;
      this.addGameObject(costLabels[n]);
    }
    this.buildMenu.toolTipCostLabels = costLabels;
    return this.buildMenu;
  }

  showBuildMenuInner(buildMenu) {
    const buildMenuItems = this.buildMenu.menuItems;
    const buildMenuInner = this.buildMenu.inner;
    const buildObjects = this.buildMenu.buildObjects;

    for (let n = 0; n < buildMenuItems.length; n++) {
      buildMenuItems[n].visible = true;
    }
    buildMenuInner.visible = true;
    for (let n = 0; n < buildObjects.length; n++) {
      buildObjects[n].visible = true;
    }
    this.buildMenu.close.visible = true;
  }

  hideBuildMenuInner(buildMenu) {
    const buildMenuItems = this.buildMenu.menuItems;
    const buildMenuInner = this.buildMenu.inner;
    const buildObjects = this.buildMenu.buildObjects;
    for (let n = 0; n < buildMenuItems.length; n++) {
      buildMenuItems[n].visible = false;
    }
    buildMenuInner.visible = false;
    for (const bm of buildObjects) {
      bm.visible = false;
    }
    this.buildMenu.close.visible = false;
    this.hideBuildObjectToolTip();
  }

  showBuildObjectToolTip(i, mousePosition) {
    this.buildMenu.selectedItemIndex = i;
    const toolTipLabel = this.buildMenu.toolTipLabel;
    toolTipLabel.text = this.buildMenu.names[i];
    toolTipLabel.visible = true;
    const toolTip = this.buildMenu.toolTip;
    toolTipLabel.z = toolTip.z + 2;
    toolTip.visible = true;
    toolTip.position = new Point(mousePosition.getX() + 10, mousePosition
        .getY() + 10);
    const toolTipPosition = toolTip.position;

    const buildingMaterials = this.buildMenu.buildingMaterialObjects;
    const costLabels = this.buildMenu.toolTipCostLabels;
    const costs = this.buildMenu.costs[i];
    const toolTipX = toolTip.position.x;
    const buildingMaterialY = toolTipPosition.y + toolTipLabel.size;
    this.buildMenu.toolTipLabel.position = 
        new Point(toolTipPosition.x + 5,
            toolTipPosition.y + 5);
    this.buildMenu.toolTipInsufficientResources
        .position = 
            new Point(toolTipPosition.x + 5, toolTipPosition
                .y
                + buildingMaterials[0].dimension
                    .height + 40);
    for (let n = 0; n < costs.length; n++) {
      buildingMaterials[n].z = toolTip.z + 1;
      costLabels[n].z = toolTip.z + 1;
      if (costs[n] > 0) {
        buildingMaterials[n].visible = true;
        int x = toolTipX
            + buildingMaterials[n].dimension.width * n;
        buildingMaterials[n]
            .position = new Point(x, buildingMaterialY);
        costLabels[n].position = new Point(x, buildingMaterialY
            + buildingMaterials[n].dimension.height);
        const haveCount = this.rucksack.buildingMaterials[n]
            .buildingMaterialCount;
        const needCount = costs[n];
        costLabels[n].text = haveCount + "/" + needCount;
        costLabels[n].visible = true;
        if (needCount > haveCount)
          buildMenu.toolTipInsufficientResources
              .visible = true;
      } else {
        buildingMaterials[n].visible = false;
      }
    }
  }

  hideBuildObjectToolTip() {
    this.buildMenu.selectedItemIndex = null;
    for (const go of this.buildMenu.buildingMaterialObjects) {
      go.visible = false;
    }
    for (const lgo of buildMenu.getToolTipCostLabels()) {
      lgo.visible = false;
    }
    this.buildMenu.toolTip.visible = false);
    this.buildMenu.toolTipInsufficientResources.visible = false);
    this.buildMenu.toolTipLabel.visible = false;
  }

  checkBuildingMaterialsCount(buildObjectIndex) {
    const bms = this.rucksack.buildingMaterials;
    const costs = this.buildMenu.costs[buildObjectIndex];
    for (let n = 0; n < costs.length; n++) {
      const cost = costs[n];
      if (cost > 0) {
        if (bms[n].buildingMaterialCount < cost) {
          return false;
        }
      }
    }
    return true;
  }

  initializeJournal() {
    this.journal = new JournalGameObject();
    this.journal.position = new Point(ORIGINAL_JOURNAL_X, ORIGINAL_JOURNAL_Y));
    this.journal.animationImageIds = [[ ResourceManager.IMAGE_JOURNAL ] [ ResourceManager.IMAGE_JOURNAL_HIGHLIGHT ]];
    this.journal.addClickedListener((clickedArg) => {
      this.showJournal();
    });
    this.journal.addMouseMoveListener((mouseMoveArg) => {
      this.baseGameView.showHandCursor();
      this.highlightObject = this.journal;
    });
    this.addGameObject(this.journal);
    const journalInner = new GameObject();
    journalInner.z = BaseGameController.MENU_Z_ORDER;
    journalInner
        .animationImageIds = [[ ResourceManager.IMAGE_JOURNAL_INNER ]];
    journalInner.addMouseMoveListener((mouseMoveArg) => {
      this.baseGameView.showDefaultCursor();
      this.highlightObject = null;
      this.baseGameView.toolTipText = "";
    });
    journalInner.visible = false;
    this.journal.inner = journalInner;
    this.addGameObject(journalInner);

    const close = new HighlightGameObjectImpl();
    close.position = new Point(BaseGameController.ORIGINAL_JOURNAL_CLOSE_X,
        BaseGameController.ORIGINAL_JOURNAL_CLOSE_Y);
    close.animationImageIds = [[ ResourceManager.IMAGE_BUILD_MENU_CLOSE ],
        [ ResourceManager.IMAGE_BUILD_MENU_CLOSE_HIGHLIGHT ]];
    close.z = BaseGameController.MENU_Z_ORDER + 1;
    close.addClickedListener((clickedArg) => {
      this.hideJournal();
    });
    close.addMouseMoveListener((mouseMoveArg) => {
      this.baseGameView.showHandCursor();
      this.highlightObject = this.journal.close;
    });
    close.visible = false;
    this.addGameObject(close);
    this.journal.close = close;

    const arrowLeft = new HighlightGameObjectImpl();
    arrowLeft.position = new Point(
        JournalGameObject.ORIGINAL_ARROW_LEFT_X,
        JournalGameObject.ORIGINAL_ARROW_RIGHT_Y);
    arrowLeft.z = =(MENU_Z_ORDER + 1;
    arrowLeft.animationImageIds = [[ ResourceManager.IMAGE_JOURNAL_ARROW_LEFT ],
        [ ResourceManager.IMAGE_JOURNAL_ARROW_LEFT_HIGHLIGHT ]];
    arrowLeft.addClickedListener((clickedArg) => {
      this.journalPreviousPage();
    });
    arrowLeft.addMouseMoveListener(mma => {
      this.baseGameView.showHandCursor();
      this.highlightObject = this.journal.getArrowLeft();
    });
    arrowLeft.visible = false;
    this.addGameObject(arrowLeft);
    journal.arrowLeft = arrowLeft;

    const arrowRight = new HighlightGameObjectImpl();
    arrowRight.position = new Point(
        JournalGameObject.ORIGINAL_ARROW_RIGHT_X,
        JournalGameObject.ORIGINAL_ARROW_RIGHT_Y);
    arrowRight.z = BaseGameController.MENU_Z_ORDER + 1;
    arrowRight.animationImageIds = [[ ResourceManager.IMAGE_JOURNAL_ARROW_RIGHT ],
        [ ResourceManager.IMAGE_JOURNAL_ARROW_RIGHT_HIGHLIGHT ]];
    arrowRight.addClickedListener(ca => {
      this.journalNextPage();
    });
    arrowRight.addMouseMoveListener(mma => {
      this.baseGameView.showHandCursor();
      this.highlightObject = this.journal.arrowRight;
    });
    arrowRight.visible = false;
    this.addGameObject(arrowRight);
    journal.arrowRight = arrowRight;

    const leftText = new LabelGameObject();
    leftText.text = "";
    this.addGameObject(leftText);
    leftText.position = new Point(100, 50);
    leftText.dimension = new Dimension(250, 450);
    leftText.z = BaseGameController.MENU_Z_ORDER;
    leftText.visible = false;
    journal.leftText = leftText;

    const rightText = new LabelGameObject();
    rightText.text = "";
    this.addGameObject(rightText);
    rightText.position = new Point(450, 50);
    rightText.dimension = new Dimension(250, 450);
    rightText.z = BaseGameController.MENU_Z_ORDER;
    rightText.visible = false;

    const newEntriesCountLabel = new LabelGameObject();
    newEntriesCountLabel.position = new Point(BaseGameController.ORIGINAL_JOURNAL_X + 40,
        BaseGameController.ORIGINAL_JOURNAL_Y + 40);
    newEntriesCountLabel.visible = false;
    newEntriesCountLabel.text = "";
    this.addGameObject(newEntriesCountLabel);
    journal.newEntriesCountLabel = newEntriesCountLabel;
    journal.rightText =rightText;

    this.journal.addClickedListener((journalClickedListenerArg) => {
      getJournalEntries();
    });

    const leftLoading = new GameObject();
    leftLoading.z = BaseGameController.MENU_Z_ORDER;
    const loadingImgIds = [[
        ResourceManager.IMAGE_JOURNAL_LOADING_1,
        ResourceManager.IMAGE_JOURNAL_LOADING_2,
        ResourceManager.IMAGE_JOURNAL_LOADING_3,
        ResourceManager.IMAGE_JOURNAL_LOADING_4,
        ResourceManager.IMAGE_JOURNAL_LOADING_5,
        ResourceManager.IMAGE_JOURNAL_LOADING_6,
        ResourceManager.IMAGE_JOURNAL_LOADING_7,
        ResourceManager.IMAGE_JOURNAL_LOADING_8 ]];
    leftLoading.animationImageIds = loadingImgIds;
    leftLoading.position = new Point(
        JournalGameObject.ORIGINAL_LEFT_LOADING_X,
        JournalGameObject.ORIGINAL_RIGHT_LOADING_Y);
    leftLoading.visible = false;
    leftLoading.loopAnimation = true;
    this.addGameObject(leftLoading);
    this.journal.leftLoading = leftLoading;
    const rightLoading = new GameObject();
    rightLoading.z = BaseGameController.MENU_Z_ORDER;
    rightLoading.animationImageIds = loadingImgIds;
    rightLoading.position = new Point(
        JournalGameObject.ORIGINAL_RIGHT_LOADING_X,
        JournalGameObject.ORIGINAL_RIGHT_LOADING_Y);
    rightLoading.visible = false;
    rightLoading.loopAnimation = true;
    this.addGameObject(rightLoading);
    this.journal.rightLoading = rightLoading;
  }

  showJournal() {
    this.journal.inner.visible = true;
    this.journal.close.visible = true;
    this.journal.leftText.visible = true;
    this.journal.rightText.visible = true;
    this.journal.arrowLeft.visible = false;
    this.journal.arrowRight.visible = false;
    this.journal.leftLoading.visible = true;
    this.journal.rightLoading.visible = true;
  }

  hideJournal() {
    this.journal.inner.visible = false;
    this.journal.close.visible = false;
    this.journal.leftText.visible = false;
    this.journal.rightText.visible = false;
    this.journal.arrowLeft.visible = false;
    this.journal.arrowRight.visible = false;
    this.journal.leftLoading.visible = false;
    this.journal.rightLoading.visible = false;
  }

  journalPreviousPage() {
    const currentPage = this.journal.currentPage;
    const newCurrentPage = currentPage > 0 ? currentPage -= 2 : 0;
    this.journal.currentPage = newCurrentPage;
    this.updateJournalGameObjectsText();
  }

  journalNextPage() {
    const currentPage = this.journal.currentPage;
    const newCurrentPage = currentPage < this.journal.entries.length ? currentPage += 2
        : currentPage;
    this.journal.currentPage = newCurrentPage;
    this.updateJournalGameObjectsText();
  }

//  protected class GetJournalEntriesBackgroundWork extends
//      BackgroundWork<Void, GetPetJournalEntriesResult, Void> {
//
//    @Override
//    public GetPetJournalEntriesResult doInBackground() throws Exception {
//      return journalEntryService.getPetJournalEntries(99999999);
//    }
//
//    @Override
//    public void completed(GetPetJournalEntriesResult result) {
//      PetJournalEntry[] entries = result.getEntries();
//      getJournal().setEntries(entries);
//      getJournal().setCurrentPage(entries.length - 1 >> 1 << 1);
//      updateJournalGameObjectsText();
//      getJournal().getLeftLoading().setVisible(false);
//      getJournal().getRightLoading().setVisible(false);
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

  updateJournalGameObjectsText() {
    const entries = this.journal.entries;
    const currentPage = this.journal.currentPage;
    if (entries.length - currentPage > 1) {
      this.journal.leftText.text = 
          this.messageSource.getMessage(
              "JOURNAL_ENTRY_"
                  + String.valueOf(entries[currentPage]
                      .getCode()), null, null);
      this.journal.rightText.text = 
          messageSource.getMessage(
              "JOURNAL_ENTRY_"
                  + entries[currentPage + 1].code, null, null);
    } else if (entries.length - currentPage == 1) {
      this.journal.leftText.text = 
          this.messageSource.getMessage(
              "JOURNAL_ENTRY_"
                  + entries[currentPage].code, null, null);
      this.journal.rightText.text = "";
    } else {
      this.journal.leftText.text = "";
      this.journal.rightText.text = "";
    }
    this.journal.arrowLeft.visible = currentPage != 0);
    this.journal.arrowRight.visible = 
        currentPage < entries.length - 2;
  }

  getJournalEntries() {
    //GetJournalEntriesBackgroundWork work = new GetJournalEntriesBackgroundWork();
    //work.setArgument(null);
    //work.setView(baseGameView);
    //ConnectionExceptionSettings ces = new ConnectionExceptionSettings();
    //ces.setRestart(true);
    //work.setConnectionExceptionSettings(ces);
    //backgroundWorkManager.startBackgroundWork(work);
  }

  addGameObject(go) {
    this.gameObjects.add(go);
    this.baseGameView.addGameObject(go);
    if (this.tilesEngine != null && go.tileTypes != null) {
      this.tilesEngine.addGameObject(go);
    }
  }

  removeGameObject(go) {
    go.release();
    this.gameObjects.remove(go);
    if (this.tilesEngine != null && go.tileTypes != null) {
      this.tilesEngine.removeGameObject(go);
    }
  }


  static get #BUILDING_STATE_IDDLE() { return "iddle"; }
  static get #BUILDING_STATE_STARTED() { return "started"; }
  static get #BUILDING_STATE_SELECT_POSITION() { return "select_position"; }
  static get #BUILDING_STATE_MOVE_PET() { return "move_pet"; }
  static get #BUILDING_STATE_BUILDING() { return "building"; }
  static get #BUILDING_STATE_OVER() { return "over"; }
  

  #buildingState = BaseGameController.#BUILDING_STATE_IDDLE;
  #buildingGameObject = null;

  startBuild(go) {
    go.visible = true;
    this.#buildingState = BaseGameController.#BUILDING_STATE_STARTED;
    this.#buildingGameObject = go;
  }

  isBuilding() {
    return this.#buildingGameObject != null;
  }

  static get #UPGRADING_STATE_IDDLE() { return "iddle"; }
  static get #UPGRADING_STATE_STARTED() { return "started"; }
  static get #UPGRADING_STATE_MOVE_PET() { return "move_pet"; }
  static get #UPGRADING_STATE_UPGRADING() { return "upgrading"; }
  static get #UPGRADING_STATE_OVER() { return "over"; }

  #upgradingState = BaseGameController.#UPGRADING_STATE_IDDLE;
  #upgradingGameObject;
  
  static get #START_UPGRADE_RESULT_OK() { return "ok"; }
  static get #START_UPGRADE_RESULT_NO_PATH() { return "no_path"; }

  startUpgrade(go) {
    const tilesStart = this.tilesEngine.translateToTileCoordinates(pet);
    const tilesEnd = this.tilesEngine.translateToTileCoordinates(go);
    tilesEnd.y = go.tileTypes[0].length + tilesEnd.y;
    const tilesPath = this.tilesEngine.findPath(tilesStart, tilesEnd);

    if (tilesPath != null) {
      const movePath = new Point[tilesPath.length];
      for (let n = 0; n < tilesPath.length; n++) {
        const tilesPoint = tilesPath[n];
        movePath[n] = this.tilesEngine.translateFromTileCoordinates(pet,
            tilesPoint);
      }
      this.pet.setMove(
          movePath,
          () => {
            // Начать улучшение.
            this.#upgradingState = BaseGameController.#UPGRADING_STATE_UPGRADING;
            this.#progressBar.visible = true;
            this.#progressBar.value = 0;
            this.#progressBar.removeAllAnimationOverListeners();
            this.#progressBar
                .addAnimationOverListener((progressBarOverListener) => {
                  this.#upgradingState = BaseGameController.#UPGRADING_STATE_OVER;
                  this.#progressBar.visible = false;
                  this.#upgradingGameObject.visible = true;
                  this.#upgradingGameObject.fireUpgradeEvent();
                  this.#upgradingGameObject = null;

                });
          });
      this.#upgradingState = BaseGameController.#UPGRADING_STATE_STARTED;
      this.#upgradingGameObject = go;
      return BaseGameController.#START_UPGRADE_RESULT_OK;
    }
    this.trayIcon.showTrayMessage(
        this.messageSource.getMessage(StringConstants.NO_PATH, null, null),
        MessageType.ERROR);
    return BaseGameController.#START_UPGRADE_RESULT_NO_PATH;
  }

  isUpgrading() {
    return this.#upgradingGameObject != null;
  }

  initializeMessageBox() {
    this.messageBox = new MessageBoxGameObject();
    this.messageBox.animationImageIds = [[ ResourceManager.IMAGE_ROOM_MESSAGE_BOX ]];
    this.messageBox.position = new Point(
        MessageBoxGameObject.ORIGINAL_MESSAGE_BOX_X, -600);
    this.messageBox.addMouseMoveListener((mouseMoveArg) => {
        this.baseGameView.showDefaultCursor();
        this.baseGameView.toolTipText = "";
        this.highlightObject = null;
      }
    });
    this.messageBox.z = BaseGameController.MENU_Z_ORDER;
    this.messageBox.visible = false;
    this.addGameObject(messageBox);

    const messageBoxOkButton = new HighlightGameObjectImpl();
    messageBoxOkButton.animationImageIds = [[ ResourceManager.IMAGE_ROOM_MESSAGE_BOX_BUTTON ],
        [ResourceManager.IMAGE_ROOM_MESSAGE_BOX_BUTTON_HIGHLIGHT ]];
    messageBoxOkButton.position = new Point(
        MessageBoxGameObject.ORIGINAL_MESSAGE_BOX_OK_BUTTON_X,
        MessageBoxGameObject.ORIGINAL_MESSAGE_BOX_OK_BUTTON_Y);
    messageBoxOkButton.addMouseMoveListener((mouseMoveArg) => {
      this.baseGameView.showHandCursor();
      this.baseGameView.toolTipText = "";
      this.highlightObject = messageBoxOkButton;
    });
    messageBoxOkButton.addClickedListener((clickedArg) => {
      if (messageBoxOkClickedListener != null) {
        messageBoxOkClickedListener.clicked(clickedArg);
      } else {
        this.hideMessageBox();
      }
    });
    messageBoxOkButton.visible = false;
    messageBoxOkButton.z = BaseGameController.MENU_Z_ORDER;
    this.addGameObject(messageBoxOkButton);
    messageBox.okButton = messageBoxOkButton;

    const messageBoxCancelButton = new HighlightGameObjectImpl();
    messageBoxCancelButton.animationImageIds = [[ ResourceManager.IMAGE_ROOM_MESSAGE_BOX_BUTTON], [ResourceManager.IMAGE_ROOM_MESSAGE_BOX_BUTTON_HIGHLIGHT ]];
    messageBoxCancelButton.position = new Point(
      MessageBoxGameObject.ORIGINAL_MESSAGE_BOX_CANCEL_BUTTON_X,
      MessageBoxGameObject.ORIGINAL_MESSAGE_BOX_CANCEL_BUTTON_Y);
    messageBoxCancelButton.addMouseMoveListener((mouseMoveArg) => {
      this.baseGameView.showHandCursor();
      this.baseGameView.toolTipText = "";
      this.highlightObject = messageBoxCancelButton;
    });
    messageBoxCancelButton.addClickedListener((
        cancelButtonClickedListenerArg)  => {
      this.messageBox.visible = false;
      messageBoxOkButton.visible = false;
      messageBoxCancelButton.visible = false;
      messageBox.okLabel.visible = false;
      messageBox.cancelLabel.visible = false;
      if (this.messageBoxCancelClickedListener != null)
        this.messageBoxCancelClickedListener
            .clicked(cancelButtonClickedListenerArg);
    });
    messageBoxCancelButton.visible = false;
    messageBoxCancelButton.z = BaseGameController.MENU_Z_ORDER;
    this.addGameObject(messageBoxCancelButton);
    messageBox.cancelButton = messageBoxCancelButton;

    const messageBoxOkLabel = new LabelGameObject();
    messageBoxOkLabel.position = new Point(
        MessageBoxGameObject.ORIGINAL_MESSAGE_BOX_OK_LABEL_X,
        MessageBoxGameObject.ORIGINAL_MESSAGE_BOX_OK_LABEL_Y);
    messageBoxOkLabel.z = BaseGameController.MENU_Z_ORDER;
    this.addGameObject(messageBoxOkLabel);
    messageBoxOkLabel.visible = false;
    this.messageBox.setOkLabel(messageBoxOkLabel);

    const messageBoxCancelLabel = new LabelGameObject();
    messageBoxCancelLabel.position = new Point(
        MessageBoxGameObject.ORIGINAL_MESSAGE_BOX_CANCEL_LABEL_X,
        MessageBoxGameObject.ORIGINAL_MESSAGE_BOX_CANCEL_LABEL_Y);
    messageBoxCancelLabel.z = BaseGameController.MENU_Z_ORDER;
    this.addGameObject(messageBoxCancelLabel);
    messageBoxCancelLabel.visible = false;
    this.messageBox.setCancelLabel(messageBoxCancelLabel);

    const labelGameObjects = new Array(3);
    for (let n = 0; n < labelGameObjects.length; n++) {
      const labelGameObject = new LabelGameObject();
      labelGameObject.position = new Point(20, n * 25);
      labelGameObject.z = BaseGameController.MENU_Z_ORDER;
      labelGameObject.visible = false;
      labelGameObject.text = "";
      this.addGameObject(labelGameObject);
      labelGameObjects[n] = labelGameObject;
    }
    this.messageBox.texts = labelGameObjects;
  }

  #messageBoxOkClickedListener = null;
  #messageBoxCancelClickedListener = null;

  showMessageBox(texts,
      okClickedListener,
      cancelClickedListener,
      messageBoxType) {
    this.messageBox.visible = true;
    this.messageBox
        .setPosition(new Point(messageBox.getPosition().getX(), -600));
    LabelGameObject[] textLabels = messageBox.getTexts();
    for (int n = 0; n < textLabels.length && n < texts.length; n++) {
      textLabels[n].setText(texts[n] == null ? "" : texts[n]);
    }
    HighlightGameObjectImpl messageBoxOkButton = messageBox.getOkButton();
    this.messageBox.getOkLabel().setText(
        messageSource.getMessage(StringConstants.OK, null, null));
    this.messageBox.getCancelLabel().setText(
        messageSource.getMessage(StringConstants.CANCEL, null, null));

    messageBoxOkButton.setVisible(false);
    this.messageBox.setMessageBoxType(messageBoxType);
    this.messageBoxOkClickedListener = okClickedListener;
    this.messageBoxCancelClickedListener = cancelClickedListener;
  }

  hideMessageBox() {
    this.messageBox.visible = false;
    this.messageBox.okButton.visible = false;
    this.messageBox.cancelButton.visible = false;
    this.messageBox.okLabel.visible = false;
    this.messageBox.cancelLabel.visible = false;
  }

  private UpgradeInfo upgradeInfo;

  public void showUpgrade(String text,
      Map<BuildingMaterialType, Integer> costs,
      ClickedListener upgradeClickedListener,
      ClickedListener cancelClickedListener) {
    upgradeInfo.setUpgradeInsufficientResources(false);
    String messageBoxOkButtonString = messageSource.getMessage(
        StringConstants.UPGRADE, null, null);
    String messageBoxCancelButtonString = messageSource.getMessage(
        StringConstants.CANCEL, null, null);
    messageBox.getOkLabel().setText(messageBoxOkButtonString);
    messageBox.getCancelLabel().setText(messageBoxCancelButtonString);
    messageBox.getInnerGameObjects().clear();

    int startX = 25;
    int buildingMaterialX = startX;
    int buildingMaterialY = 130;
    int index = 0;
    RucksackGameObject rucksack = getRucksack();
    BuildingMaterialGameObject[] rucksackBuildingMaterials = rucksack
        .getBuildingMaterials();
    for (Entry<BuildingMaterialType, Integer> entry : costs.entrySet()) {
      int buildingMaterialIndex = entry.getKey().ordinal();
      BuildingMaterialGameObject bmgo = upgradeInfo
          .getUpgradeBuildingMaterialGameObjects()[buildingMaterialIndex];
      MessageBoxGameObject.InnerGameObject innerGameObject = messageBox.new InnerGameObject();
      innerGameObject.setGameObject(bmgo);
      innerGameObject.setPosition(new Point(buildingMaterialX,
          buildingMaterialY));
      messageBox.getInnerGameObjects().add(innerGameObject);

      int bmgoCount = rucksackBuildingMaterials[buildingMaterialIndex]
          .getBuildingMaterialCount();
      String haveValue = String.valueOf(bmgoCount);
      String costValue = String.valueOf(entry.getValue());
      String str = haveValue + "/" + costValue;
      LabelGameObject lbl = upgradeInfo
          .getUpgradeBuildingMaterialLabels()[index];
      lbl.setText(str);
      innerGameObject = messageBox.new InnerGameObject();
      innerGameObject.setGameObject(lbl);
      innerGameObject.setPosition(new Point(buildingMaterialX,
          buildingMaterialY + bmgo.getDimension().getHeight()
              - lbl.getSize()));
      messageBox.getInnerGameObjects().add(innerGameObject);

      buildingMaterialX += bmgo.getDimension().getWidth();

      if (entry.getValue() <= bmgoCount) {
        // upgradeInfo.getUpgradeBuildingMaterialCostColors()[index] =
        // Color.GREEN;
      } else {
        // upgradeInfo.getUpgradeBuildingMaterialCostColors()[index] =
        // Color.RED;
        upgradeInfo.setUpgradeInsufficientResources(true);
      }
      index++;
    }

    String[] messageBoxStrings = new String[messageBox.getTexts().length];
    messageBoxStrings[0] = text;
    messageBoxStrings[1] = messageSource.getMessage(
        StringConstants.UPGRADE, null, null);
    if (upgradeInfo.isUpgradeInsufficientResources()) {
      messageBoxStrings[2] = insufficientResourcesString;
    }

    showMessageBox(
        messageBoxStrings,
        (aaaa) -> {
          boolean hide = false;

          if (upgradeInfo.isUpgradeInsufficientResources()) {
            getTrayIcon().showTrayMessage(
                getMessageSource().getMessage(
                    StringConstants.INSUFFICIENT_RESOURCES,
                    null, null), MessageType.INFO);
          } else {
            hide = true;
          }
          if (hide) {
            messageBox.setVisible(false);
            messageBox.getOkButton().setVisible(false);
            messageBox.getCancelButton().setVisible(false);
            messageBox.getOkLabel().setVisible(false);
            messageBox.getCancelLabel().setVisible(false);
            if (upgradeClickedListener != null)
              upgradeClickedListener.clicked(aaaa);
          }
        }, cancelClickedListener,
        MessageBoxGameObject.MessageBoxType.OK_CANCEL_BUTTON);
  }

  public void initializeUpgrade() {
    upgradeInfo = new UpgradeInfo();
    BuildingMaterialGameObject[] upgradeBuildingMaterialGameObjects = initializeBuildingMaterialGameObjects();
    upgradeInfo
        .setUpgradeBuildingMaterialGameObjects(upgradeBuildingMaterialGameObjects);
    LabelGameObject[] upgradeBuildingMaterialLabels = new LabelGameObject[upgradeInfo
        .getUpgradeBuildingMaterialGameObjects().length];
    List<MessageBoxGameObject.InnerGameObject> messageBoxInnerGameObjects = messageBox
        .getInnerGameObjects();

    for (int n = 0; n < upgradeBuildingMaterialLabels.length; n++) {
      LabelGameObject lgo = new LabelGameObject();
      upgradeBuildingMaterialLabels[n] = lgo;
      lgo.setZ(MENU_Z_ORDER);
      addGameObject(lgo);
      lgo.setVisible(false);
      MessageBoxGameObject.InnerGameObject innerGameObject = messageBox.new InnerGameObject();
      innerGameObject.setGameObject(lgo);
      innerGameObject.setPosition(new Point(100
          + upgradeBuildingMaterialGameObjects[0].getDimension()
              .getWidth() * n, 150));
      messageBoxInnerGameObjects.add(innerGameObject);

      innerGameObject = messageBox.new InnerGameObject();
      BuildingMaterialGameObject bmgo = upgradeBuildingMaterialGameObjects[n];
      innerGameObject.setGameObject(bmgo);
      innerGameObject.setPosition(new Point(100
          + bmgo.getDimension().getWidth() * n, 150));
      messageBoxInnerGameObjects.add(innerGameObject);
    }
    upgradeInfo
        .setUpgradeBuildingMaterialLabels(upgradeBuildingMaterialLabels);
  }

  private BuildingGameObject movingGameObject = null;

  private enum MovingState {
    IDDLE, STARTED, SELECT_POSITION, OVER
  };

  private MovingState movingState = MovingState.IDDLE;

  public void startMove(BuildingGameObject buildingGameObject) {
    this.movingGameObject = buildingGameObject;
    movingState = MovingState.STARTED;
  }

  public void initializeLevelInfo() {
    levelInfo = new LevelInfoGameObject();
    levelInfo
        .setAnimationImageIds(new int[][] { { ResourceManager.IMAGE_EXPERIENCE } });
    levelInfo.setPosition(new Point(-100, -100));
    levelInfo.setExperience(-1);
    LabelGameObject levelLabel = new LabelGameObject();
    ProgressBarGameObject experienceProgressBar = new ProgressBarGameObject();
    levelLabel.setText("");

    levelLabel.setPosition(new Point(
        LevelInfoGameObject.ORIGINAL_LEVEL_LABEL_X,
        LevelInfoGameObject.ORIGINAL_LEVEL_LABEL_Y));
    addGameObject(levelLabel);
    experienceProgressBar.setPosition(new Point(
        LevelInfoGameObject.ORIGINAL_PROGRESS_BAR_X,
        LevelInfoGameObject.ORIGINAL_PROGRESS_BAR_Y));
    experienceProgressBar.setDimension(new Dimension(
        LevelInfoGameObject.ORIGINAL_PROGRESS_BAR_WIDTH,
        LevelInfoGameObject.ORIGINAL_PROGRESS_BAR_HEIGHT));
    addGameObject(experienceProgressBar);
    levelInfo.setLevelLabel(levelLabel);
    levelInfo.setExperienceProgressBar(experienceProgressBar);

    LabelGameObject levelTextLabel = new LabelGameObject();
    LabelGameObject experienceTextLabel = new LabelGameObject();
    levelTextLabel.setText(messageSource.getMessage(StringConstants.LVL,
        null, null));
    experienceTextLabel.setText(messageSource.getMessage(
        StringConstants.EXP, null, null));
    levelTextLabel.setPosition(new Point(
        LevelInfoGameObject.ORIGINAL_LEVEL_TEXT_LABEL_X,
        LevelInfoGameObject.ORIGINAL_LEVEL_TEXT_LABEL_Y));
    experienceTextLabel.setPosition(new Point(
        LevelInfoGameObject.ORIGINAL_EXPERIENCE_TEXT_LABEL_X,
        LevelInfoGameObject.ORIGINAL_EXPERIENCE_TEXT_LABEL_Y));
    addGameObject(levelTextLabel);
    addGameObject(experienceTextLabel);
    levelInfo.setLevelTextLabel(levelTextLabel);
    levelInfo.setExperienceTextLabel(experienceTextLabel);

    LabelGameObject youHaveReachedLevelLabel = new LabelGameObject();
    youHaveReachedLevelLabel.setSize(50);
    youHaveReachedLevelLabel.setPosition(new Point(
        LevelInfoGameObject.ORIGINAL_LEVEL_HAVE_REACHED_X,
        LevelInfoGameObject.ORIGINAL_LEVEL_HAVE_REACHED_Y));
    youHaveReachedLevelLabel.setZ(MENU_Z_ORDER - 1);
    youHaveReachedLevelLabel.setVisible(false);
    addGameObject(youHaveReachedLevelLabel);
    levelInfo.setYouHaveReachedLevelLabel(youHaveReachedLevelLabel);
    addGameObject(levelInfo);
  }

  public LevelInfoGameObject getLevelInfo() {
    return this.levelInfo;
  }

  public void updateLevelInfo(LevelInfo info, Point experienceCreationPoint) {
    if (this.levelInfo.getExperience() >= 0) {
      for (int n = this.levelInfo.getExperience(); n < info
          .getExperience(); n++) {
        addExperienceGameObject(experienceCreationPoint.getX(),
            experienceCreationPoint.getY());
      }
    }
    this.levelInfo.setExperience(info.getExperience());
    String lastLevel = levelInfo.getLevelLabel().getText();
    levelInfo.getLevelLabel().setText(String.valueOf(info.getLevel()));
    if (!lastLevel.isEmpty()
        && !info.getLevel().equals(Integer.valueOf(lastLevel))) {
      levelInfo.showLevelHasReachedLabel(String.format(messageSource
          .getMessage(StringConstants.YOU_HAVE_REACHED_LEVEL, null,
              null), levelInfo.getLevelLabel().getText()));
    }
    levelInfo.getExperienceProgressBar().setMaxValue(
        info.getMaxExperience() - info.getMinExperience());
    levelInfo.getExperienceProgressBar().setValue(
        info.getExperience() - info.getMinExperience());
  }

  public void initializeAchievementInfo() {
    achievementInfo = new AchievementInfoGameObject();
    achievementInfo
        .setAnimationImageIds(new int[][] { { ResourceManager.IMAGE_ACHIEVEMENT } });
    achievementInfo.setPosition(new Point(-100, -100));
    addGameObject(achievementInfo);

    GameObject achievementBackground = new GameObject();
    achievementBackground
        .setAnimationImageIds(new int[][] { { ResourceManager.IMAGE_ACHIEVEMENT_BACKGROUND } });
    achievementBackground.setPosition(new Point(
        AchievementInfoGameObject.ORIGINAL_ACHIEVEMENT_BACKGROUND_X,
        AchievementInfoGameObject.ORIGINAL_ACHIEVEMENT_BACKGROUND_Y));
    achievementBackground.setVisible(false);
    achievementBackground.setZ(MENU_Z_ORDER);
    addGameObject(achievementBackground);
    achievementInfo.setAchievementBackground(achievementBackground);

    LabelGameObject achievementLabel = new LabelGameObject();
    achievementLabel.setText("");
    achievementLabel.setPosition(new Point(
        AchievementInfoGameObject.ORIGINAL_ACHIEVEMENT_X,
        AchievementInfoGameObject.ORIGINAL_ACHIEVEMENT_Y));
    achievementLabel.setVisible(false);
    achievementLabel.setSize(AchievementInfoGameObject.ORIGINAL_FONT_SIZE);
    achievementLabel.setZ(MENU_Z_ORDER);
    addGameObject(achievementLabel);
    achievementInfo.setAchievementLabel(achievementLabel);

    LabelGameObject achievementDescriptionLabel = new LabelGameObject();
    achievementDescriptionLabel.setText("");
    achievementDescriptionLabel.setPosition(new Point(
        AchievementInfoGameObject.ORIGINAL_ACHIEVEMENT_DESCRIPTION_X,
        AchievementInfoGameObject.ORIGINAL_ACHIEVEMENT_DESCRIPTION_Y));
    achievementDescriptionLabel.setVisible(false);
    achievementDescriptionLabel
        .setSize(AchievementInfoGameObject.ORIGINAL_FONT_SIZE);
    achievementDescriptionLabel.setZ(MENU_Z_ORDER);
    addGameObject(achievementDescriptionLabel);
    achievementInfo
        .setAchievementDescriptionLabel(achievementDescriptionLabel);

    LabelGameObject newAchievementLabel = new LabelGameObject();
    newAchievementLabel.setText(messageSource.getMessage(
        StringConstants.NEW_ACHIEVEMENT, null, null));
    newAchievementLabel
        .setSize(AchievementInfoGameObject.ORIGINAL_FONT_SIZE);
    newAchievementLabel.setPosition(new Point(
        AchievementInfoGameObject.ORIGINAL_NEW_ACHIEVEMENT_X,
        AchievementInfoGameObject.ORIGINAL_NEW_ACHIEVEMENT_Y));
    newAchievementLabel.setVisible(false);
    newAchievementLabel.setZ(MENU_Z_ORDER);
    addGameObject(newAchievementLabel);
    achievementInfo.setNewAchievementLabel(newAchievementLabel);
  }

  public void updateAchievementInfo(AchievementCode[] achievementCodes) {
    if (achievementCodes.length > 0) {
      achievementInfo.showAchievementLabel(messageSource.getMessage(
          "ru.urvanov.virtualpets.client.localization.achievement."
              + achievementCodes[0].name(), null, null),
          messageSource.getMessage(
              "ru.urvanov.virtualpets.client.localization.achievement."
                  + achievementCodes[0].name()
                  + "_DESCRIPTION", null, null));
    }
  }

  public GameObject initializeLoading() {
    GameObject gameObject = new GameObject();
    int[][] imgids = { { ResourceManager.IMAGE_LOADING_1,
        ResourceManager.IMAGE_LOADING_2,
        ResourceManager.IMAGE_LOADING_3,
        ResourceManager.IMAGE_LOADING_4,
        ResourceManager.IMAGE_LOADING_5,
        ResourceManager.IMAGE_LOADING_6,
        ResourceManager.IMAGE_LOADING_7,
        ResourceManager.IMAGE_LOADING_8 } };
    gameObject.setAnimationImageIds(imgids);
    gameObject.setZ(Integer.MAX_VALUE);
    addGameObject(gameObject);
    gameObject.setVisible(false);
    gameObject.setLoopAnimation(true);
    gameObject.setDimension(new Dimension(128, 128));
    gameObject.setPosition(new Point(400 - gameObject.getDimension()
        .getWidth() / 2,
        300 - gameObject.getDimension().getHeight() / 2));
    return gameObject;
  }

}
