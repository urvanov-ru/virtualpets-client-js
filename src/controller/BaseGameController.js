
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

  public CollectableGameObject addCollectableGameObject(
      BuildingMaterialType bmt, int x, int y) {
    return addCollectableGameObject(
        ResourceManager.IMAGE_BUILDING_MATERIAL_TIMBER
            + bmt.ordinal(), x, y);

  }

  public CollectableGameObject addCollectableGameObject(GameObject go, int x,
      int y) {
    return addCollectableGameObject(go.getAnimationImageIds()[0][0], x, y);
  }

  public CollectableGameObject addCollectableGameObject(int resourceId,
      int x, int y) {
    CollectableGameObject go = new CollectableGameObject();
    int[][] imgids = new int[1][];
    imgids[0] = new int[1];
    imgids[0][0] = resourceId;
    go.setAnimationImageIds(imgids);
    go.setPosition(new Point(x, y));
    go.addMouseMoveListener(new MouseMoveListener() {
      @Override
      public void mouseMove(MouseMoveArg arg) {
        CollectableGameObject go = (CollectableGameObject) arg
            .getSender();
        go.forceTimeToLifeOver();
      }
    });
    go.setRucksack(rucksack);
    addGameObject(go);
    baseGameView.initializeCollectableGameObject(go);
    return go;
  }

  public ExperienceGameObject addExperienceGameObject(int x, int y) {
    ExperienceGameObject go = new ExperienceGameObject();
    int[][] imgids = new int[1][];
    imgids[0] = new int[1];
    imgids[0][0] = ResourceManager.IMAGE_EXPERIENCE;
    go.setAnimationImageIds(imgids);
    go.setPosition(new Point(x, y));
    go.addMouseMoveListener(new MouseMoveListener() {
      @Override
      public void mouseMove(MouseMoveArg arg) {
        ExperienceGameObject go = (ExperienceGameObject) arg
            .getSender();
        go.forceTimeToLifeOver();
      }
    });
    go.setLevelInfo(levelInfo);
    addGameObject(go);
    baseGameView.initializeExperienceGameObject(go);
    return go;
  }

  public void initializeTilesEngine(TileType[][] tiles) {
    this.tilesEngine = new TilesEngine(tiles);
    for (GameObject go : gameObjects) {
      if (go.getTileTypes() != null) {
        tilesEngine.addGameObject(go);
      }
    }
  }

  public void initializeTilesEngine() {
    tilesEngine = new TilesEngine(6, 8);
  }

  public void initializeTilesEngineForRoom() {
    tilesEngine = new TilesEngine(6, 9, TilesEngine.DEFAULT_TILE_WIDTH,
        TilesEngine.DEFAULT_TILE_HEIGHT / 2);
  }

  /**
   * @return tilesEngine.
   */
  public TilesEngine getTilesEngine() {
    return tilesEngine;
  }

  public BuildMenuGameObject initializeBuildMenu() {
    insufficientResourcesString = getMessageSource().getMessage(
        StringConstants.INSUFFICIENT_RESOURCES, null, null);
    GameObject buildMenuInner = new GameObject();
    int[][] imgids = new int[1][];
    imgids[0] = new int[1];
    imgids[0][0] = ResourceManager.IMAGE_BUILD_MENU_INNER;
    buildMenuInner.setAnimationImageIds(imgids);
    buildMenuInner.setZ(MENU_Z_ORDER);
    buildMenuInner.setVisible(false);
    buildMenuInner.addMouseMoveListener(new MouseMoveListener() {

      @Override
      public void mouseMove(MouseMoveArg arg) {
        hideBuildObjectToolTip();
      }
    });

    HighlightGameObjectImpl closeObject = new HighlightGameObjectImpl();
    imgids = new int[2][];
    imgids[0] = new int[1];
    imgids[0][0] = ResourceManager.IMAGE_BUILD_MENU_CLOSE;
    imgids[1] = new int[1];
    imgids[1][0] = ResourceManager.IMAGE_BUILD_MENU_CLOSE_HIGHLIGHT;
    closeObject.setAnimationImageIds(imgids);
    closeObject.setPosition(new Point(ORIGINAL_BUILD_MENU_CLOSE_X,
        ORIGINAL_BUILD_MENU_CLOSE_Y));
    closeObject.setZ(MENU_Z_ORDER);
    closeObject.setVisible(false);

    buildMenu = new BuildMenuGameObject();
    buildMenu.setPosition(new Point(ORIGINAL_BUILD_MENU_X,
        ORIGINAL_BUILD_MENU_Y));

    buildMenu.setInner(buildMenuInner);

    buildMenu.setClose(closeObject);

    imgids = new int[2][];
    imgids[0] = new int[1];
    imgids[0][0] = ResourceManager.IMAGE_HAMMER;
    imgids[1] = new int[1];
    imgids[1][0] = ResourceManager.IMAGE_HAMMER_HIGHLIGHT;
    buildMenu.setAnimationImageIds(imgids);

    addGameObject(buildMenu);
    addGameObject(buildMenuInner);
    addGameObject(closeObject);

    buildMenu.setMenuItems(new GameObject[0]);
    buildMenu.setBuildObjects(new GameObject[0]);

    buildMenu.addClickedListener(new ClickedListener() {
      @Override
      public void clicked(ClickedArg arg) {
        showBuildMenuInner(getBuildMenu());
      }
    });

    buildMenu.addMouseMoveListener(new MouseMoveListener() {
      @Override
      public void mouseMove(MouseMoveArg arg) {
        setHighlightObject(getBuildMenu());
        baseGameView.showHandCursor();
        baseGameView.setToolTipText("");
      }
    });

    buildMenu.getClose().addClickedListener(new ClickedListener() {
      @Override
      public void clicked(ClickedArg arg) {
        hideBuildMenuInner(getBuildMenu());
      }
    });
    closeObject.addMouseMoveListener(new MouseMoveListener() {
      @Override
      public void mouseMove(MouseMoveArg arg) {
        setHighlightObject(getBuildMenu().getClose());
        baseGameView.showHandCursor();
        baseGameView.setToolTipText("");
      }
    });
    buildMenuInner.addMouseMoveListener(new MouseMoveListener() {
      @Override
      public void mouseMove(MouseMoveArg arg) {
        setHighlightObject(null);
        baseGameView.showDefaultCursor();
        baseGameView.setToolTipText("");
      }
    });
    GameObject buildMenuToolTip = new GameObject();
    buildMenuToolTip
        .setAnimationImageIds(new int[][] { { ResourceManager.IMAGE_BUILD_MENU_TOOLTIP } });
    buildMenuToolTip.setVisible(false);
    buildMenuToolTip.setZ(MENU_Z_ORDER + 1);
    addGameObject(buildMenuToolTip);
    buildMenu.setTooltip(buildMenuToolTip);
    LabelGameObject toolTipLabel = new LabelGameObject();
    toolTipLabel.setVisible(false);
    addGameObject(toolTipLabel);
    buildMenu.setToolTipLabel(toolTipLabel);
    LabelGameObject toolTipInsufficientResources = new LabelGameObject();
    toolTipInsufficientResources.setText(insufficientResourcesString);
    toolTipInsufficientResources.setVisible(false);
    addGameObject(toolTipInsufficientResources);
    buildMenu.setToolTipInsufficientResources(toolTipInsufficientResources);
    buildMenu.setBuildingMaterialObjects(this
        .initializeBuildingMaterialGameObjects());
    LabelGameObject[] costLabels = new LabelGameObject[buildMenu
        .getBuildingMaterialObjects().length];
    for (int n = 0; n < buildMenu.getBuildingMaterialObjects().length; n++) {
      costLabels[n] = new LabelGameObject();
      costLabels[n].setVisible(false);
      addGameObject(costLabels[n]);
    }
    buildMenu.setToolTipCostLabels(costLabels);
    return buildMenu;
  }

  public void showBuildMenuInner(BuildMenuGameObject buildMenu) {
    GameObject[] buildMenuItems = buildMenu.getMenuItems();
    GameObject buildMenuInner = buildMenu.getInner();
    GameObject[] buildObjects = buildMenu.getBuildObjects();

    for (int n = 0; n < buildMenuItems.length; n++) {
      buildMenuItems[n].setVisible(true);
    }
    buildMenuInner.setVisible(true);
    for (int n = 0; n < buildObjects.length; n++) {
      buildObjects[n].setVisible(true);
    }
    buildMenu.getClose().setVisible(true);
  }

  public void hideBuildMenuInner(BuildMenuGameObject buildMenu) {
    GameObject[] buildMenuItems = buildMenu.getMenuItems();
    GameObject buildMenuInner = buildMenu.getInner();
    GameObject[] buildObjects = buildMenu.getBuildObjects();
    for (int n = 0; n < buildMenuItems.length; n++) {
      buildMenuItems[n].setVisible(false);
    }
    buildMenuInner.setVisible(false);
    for (GameObject bm : buildObjects) {
      bm.setVisible(false);
    }
    buildMenu.getClose().setVisible(false);
    hideBuildObjectToolTip();
  }

  public void showBuildObjectToolTip(int i, Point mousePosition) {
    buildMenu.setSelectedItemIndex(i);
    LabelGameObject toolTipLabel = buildMenu.getToolTipLabel();
    toolTipLabel.setText(buildMenu.getNames()[i]);
    toolTipLabel.setVisible(true);
    GameObject toolTip = buildMenu.getToolTip();
    toolTipLabel.setZ(toolTip.getZ() + 2);
    toolTip.setVisible(true);
    toolTip.setPosition(new Point(mousePosition.getX() + 10, mousePosition
        .getY() + 10));
    Point toolTipPosition = toolTip.getPosition();

    GameObject[] buildingMaterials = buildMenu.getBuildingMaterialObjects();
    LabelGameObject[] costLabels = buildMenu.getToolTipCostLabels();
    int[] costs = buildMenu.getCosts()[i];
    int toolTipX = toolTip.getPosition().getX();
    int buildingMaterialY = toolTipPosition.getY() + toolTipLabel.getSize();
    buildMenu.getToolTipLabel().setPosition(
        new Point(toolTipPosition.getX() + 5,
            toolTipPosition.getY() + 5));
    buildMenu.getToolTipInsufficientResources()
        .setPosition(
            new Point(toolTipPosition.getX() + 5, toolTipPosition
                .getY()
                + buildingMaterials[0].getDimension()
                    .getHeight() + 40));
    for (int n = 0; n < costs.length; n++) {
      buildingMaterials[n].setZ(toolTip.getZ() + 1);
      costLabels[n].setZ(toolTip.getZ() + 1);
      if (costs[n] > 0) {
        buildingMaterials[n].setVisible(true);
        int x = toolTipX
            + buildingMaterials[n].getDimension().getWidth() * n;
        buildingMaterials[n]
            .setPosition(new Point(x, buildingMaterialY));
        costLabels[n].setPosition(new Point(x, buildingMaterialY
            + buildingMaterials[n].getDimension().getHeight()));
        int haveCount = rucksack.getBuildingMaterials()[n]
            .getBuildingMaterialCount();
        int needCount = costs[n];
        costLabels[n].setText(haveCount + "/" + needCount);
        costLabels[n].setVisible(true);
        if (needCount > haveCount)
          buildMenu.getToolTipInsufficientResources()
              .setVisible(true);
      } else {
        buildingMaterials[n].setVisible(false);
      }
    }
  }

  public void hideBuildObjectToolTip() {
    buildMenu.setSelectedItemIndex(null);
    for (GameObject go : buildMenu.getBuildingMaterialObjects()) {
      go.setVisible(false);
    }
    for (LabelGameObject lgo : buildMenu.getToolTipCostLabels()) {
      lgo.setVisible(false);
    }
    buildMenu.getToolTip().setVisible(false);
    buildMenu.getToolTipInsufficientResources().setVisible(false);
    buildMenu.getToolTipLabel().setVisible(false);
  }

  public boolean checkBuildingMaterialsCount(int buildObjectIndex) {
    BuildingMaterialGameObject[] bms = rucksack.getBuildingMaterials();
    int[] costs = buildMenu.getCosts()[buildObjectIndex];
    for (int n = 0; n < costs.length; n++) {
      int cost = costs[n];
      if (cost > 0) {
        BuildingMaterialGameObject bm = bms[n];
        int count = bm.getBuildingMaterialCount();
        if (count < cost) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * @return the buildMenu
   */
  public BuildMenuGameObject getBuildMenu() {
    return buildMenu;
  }

  /**
   * @param buildMenu
   *      the buildMenu to set
   */
  public void setBuildMenu(BuildMenuGameObject buildMenu) {
    this.buildMenu = buildMenu;
  }

  public JournalGameObject getJournal() {
    return journal;
  }

  public void setJournal(JournalGameObject journal) {
    this.journal = journal;
  }

  public void initializeJournal() {
    journal = new JournalGameObject();
    journal.setPosition(new Point(ORIGINAL_JOURNAL_X, ORIGINAL_JOURNAL_Y));
    journal.setAnimationImageIds(new int[][] {
        { ResourceManager.IMAGE_JOURNAL },

        { ResourceManager.IMAGE_JOURNAL_HIGHLIGHT } });
    journal.addClickedListener(new ClickedListener() {

      @Override
      public void clicked(ClickedArg arg) {
        showJournal();
      }
    });
    journal.addMouseMoveListener(new MouseMoveListener() {

      @Override
      public void mouseMove(MouseMoveArg arg) {
        baseGameView.showHandCursor();
        setHighlightObject(getJournal());
      }
    });
    addGameObject(journal);
    GameObject journalInner = new GameObject();
    journalInner.setZ(MENU_Z_ORDER);
    journalInner
        .setAnimationImageIds(new int[][] { { ResourceManager.IMAGE_JOURNAL_INNER } });
    journalInner.addMouseMoveListener(new MouseMoveListener() {

      @Override
      public void mouseMove(MouseMoveArg arg) {
        baseGameView.showDefaultCursor();
        setHighlightObject(null);
        baseGameView.setToolTipText("");
      }

    });
    journalInner.setVisible(false);
    journal.setInner(journalInner);
    addGameObject(journalInner);

    HighlightGameObjectImpl close = new HighlightGameObjectImpl();
    close.setPosition(new Point(ORIGINAL_JOURNAL_CLOSE_X,
        ORIGINAL_JOURNAL_CLOSE_Y));
    close.setAnimationImageIds(new int[][] {
        { ResourceManager.IMAGE_BUILD_MENU_CLOSE },
        { ResourceManager.IMAGE_BUILD_MENU_CLOSE_HIGHLIGHT } });
    close.setZ(MENU_Z_ORDER + 1);
    close.addClickedListener(new ClickedListener() {

      @Override
      public void clicked(ClickedArg arg) {
        hideJournal();
      }
    });
    close.addMouseMoveListener(new MouseMoveListener() {

      @Override
      public void mouseMove(MouseMoveArg arg) {
        baseGameView.showHandCursor();
        setHighlightObject(getJournal().getClose());
      }
    });
    close.setVisible(false);
    addGameObject(close);
    journal.setClose(close);

    HighlightGameObjectImpl arrowLeft = new HighlightGameObjectImpl();
    arrowLeft.setPosition(new Point(
        JournalGameObject.ORIGINAL_ARROW_LEFT_X,
        JournalGameObject.ORIGINAL_ARROW_RIGHT_Y));
    arrowLeft.setZ(MENU_Z_ORDER + 1);
    arrowLeft.setAnimationImageIds(new int[][] {
        { ResourceManager.IMAGE_JOURNAL_ARROW_LEFT },
        { ResourceManager.IMAGE_JOURNAL_ARROW_LEFT_HIGHLIGHT } });
    arrowLeft.addClickedListener(new ClickedListener() {
      @Override
      public void clicked(ClickedArg arg) {
        journalPreviousPage();
      }
    });
    arrowLeft.addMouseMoveListener(mma -> {
      baseGameView.showHandCursor();
      setHighlightObject(getJournal().getArrowLeft());
    });
    arrowLeft.setVisible(false);
    addGameObject(arrowLeft);
    journal.setArrowLeft(arrowLeft);

    HighlightGameObjectImpl arrowRight = new HighlightGameObjectImpl();
    arrowRight.setPosition(new Point(
        JournalGameObject.ORIGINAL_ARROW_RIGHT_X,
        JournalGameObject.ORIGINAL_ARROW_RIGHT_Y));
    arrowRight.setZ(MENU_Z_ORDER + 1);
    arrowRight.setAnimationImageIds(new int[][] {
        { ResourceManager.IMAGE_JOURNAL_ARROW_RIGHT },
        { ResourceManager.IMAGE_JOURNAL_ARROW_RIGHT_HIGHLIGHT } });
    arrowRight.addClickedListener(ca -> {
      journalNextPage();
    });
    arrowRight.addMouseMoveListener(mma -> {
      baseGameView.showHandCursor();
      setHighlightObject(getJournal().getArrowRight());
    });
    arrowRight.setVisible(false);
    addGameObject(arrowRight);
    journal.setArrowRight(arrowRight);

    LabelGameObject leftText = new LabelGameObject();
    leftText.setText("");
    addGameObject(leftText);
    leftText.setPosition(new Point(100, 50));
    leftText.setDimension(new Dimension(250, 450));
    leftText.setZ(MENU_Z_ORDER);
    leftText.setVisible(false);
    journal.setLeftText(leftText);

    LabelGameObject rightText = new LabelGameObject();
    rightText.setText("");
    addGameObject(rightText);
    rightText.setPosition(new Point(450, 50));
    rightText.setDimension(new Dimension(250, 450));
    rightText.setZ(MENU_Z_ORDER);
    rightText.setVisible(false);

    LabelGameObject newEntriesCountLabel = new LabelGameObject();
    newEntriesCountLabel.setPosition(new Point(ORIGINAL_JOURNAL_X + 40,
        ORIGINAL_JOURNAL_Y + 40));
    newEntriesCountLabel.setVisible(false);
    newEntriesCountLabel.setText("");
    addGameObject(newEntriesCountLabel);
    journal.setNewEntriesCountLabel(newEntriesCountLabel);
    journal.setRightText(rightText);

    this.getJournal().addClickedListener((journalClickedListenerArg) -> {
      getJournalEntries();
    });

    GameObject leftLoading = new GameObject();
    leftLoading.setZ(MENU_Z_ORDER);
    int[][] loadingImgIds = { {
        ResourceManager.IMAGE_JOURNAL_LOADING_1,
        ResourceManager.IMAGE_JOURNAL_LOADING_2,
        ResourceManager.IMAGE_JOURNAL_LOADING_3,
        ResourceManager.IMAGE_JOURNAL_LOADING_4,
        ResourceManager.IMAGE_JOURNAL_LOADING_5,
        ResourceManager.IMAGE_JOURNAL_LOADING_6,
        ResourceManager.IMAGE_JOURNAL_LOADING_7,
        ResourceManager.IMAGE_JOURNAL_LOADING_8 } };
    leftLoading.setAnimationImageIds(loadingImgIds);
    leftLoading.setPosition(new Point(
        JournalGameObject.ORIGINAL_LEFT_LOADING_X,
        JournalGameObject.ORIGINAL_RIGHT_LOADING_Y));
    leftLoading.setVisible(false);
    leftLoading.setLoopAnimation(true);
    addGameObject(leftLoading);
    journal.setLeftLoading(leftLoading);
    GameObject rightLoading = new GameObject();
    rightLoading.setZ(MENU_Z_ORDER);
    rightLoading.setAnimationImageIds(loadingImgIds);
    rightLoading.setPosition(new Point(
        JournalGameObject.ORIGINAL_RIGHT_LOADING_X,
        JournalGameObject.ORIGINAL_RIGHT_LOADING_Y));
    rightLoading.setVisible(false);
    rightLoading.setLoopAnimation(true);
    addGameObject(rightLoading);
    journal.setRightLoading(rightLoading);
  }

  public void showJournal() {
    getJournal().getInner().setVisible(true);
    getJournal().getClose().setVisible(true);
    getJournal().getLeftText().setVisible(true);
    getJournal().getRightText().setVisible(true);
    getJournal().getArrowLeft().setVisible(false);
    getJournal().getArrowRight().setVisible(false);
    getJournal().getLeftLoading().setVisible(true);
    getJournal().getRightLoading().setVisible(true);
  }

  public void hideJournal() {
    getJournal().getInner().setVisible(false);
    getJournal().getClose().setVisible(false);
    getJournal().getLeftText().setVisible(false);
    getJournal().getRightText().setVisible(false);
    getJournal().getArrowLeft().setVisible(false);
    getJournal().getArrowRight().setVisible(false);
    getJournal().getLeftLoading().setVisible(false);
    getJournal().getRightLoading().setVisible(false);
  }

  private void journalPreviousPage() {
    int currentPage = getJournal().getCurrentPage();
    int newCurrentPage = currentPage > 0 ? currentPage -= 2 : 0;
    getJournal().setCurrentPage(newCurrentPage);
    updateJournalGameObjectsText();
  }

  private void journalNextPage() {
    int currentPage = getJournal().getCurrentPage();
    int newCurrentPage = currentPage < getJournal().getEntries().length ? currentPage += 2
        : currentPage;
    getJournal().setCurrentPage(newCurrentPage);
    updateJournalGameObjectsText();
  }

  protected class GetJournalEntriesBackgroundWork extends
      BackgroundWork<Void, GetPetJournalEntriesResult, Void> {

    @Override
    public GetPetJournalEntriesResult doInBackground() throws Exception {
      return journalEntryService.getPetJournalEntries(99999999);
    }

    @Override
    public void completed(GetPetJournalEntriesResult result) {
      PetJournalEntry[] entries = result.getEntries();
      getJournal().setEntries(entries);
      getJournal().setCurrentPage(entries.length - 1 >> 1 << 1);
      updateJournalGameObjectsText();
      getJournal().getLeftLoading().setVisible(false);
      getJournal().getRightLoading().setVisible(false);
    }

    @Override
    public void failed(Exception ex) {
      log.error("GetJournalEntriesBackgroundWork failed.", ex);
      trayIcon.showTrayMessage(
          messageSource.getMessage(StringConstants.ERROR, null, null),
          MessageType.ERROR);
    }
  }

  private void updateJournalGameObjectsText() {
    PetJournalEntry[] entries = getJournal().getEntries();
    int currentPage = getJournal().getCurrentPage();
    if (entries.length - currentPage > 1) {
      getJournal().getLeftText().setText(
          messageSource.getMessage(
              "JOURNAL_ENTRY_"
                  + String.valueOf(entries[currentPage]
                      .getCode()), null, null));
      getJournal().getRightText().setText(
          messageSource.getMessage(
              "JOURNAL_ENTRY_"
                  + String.valueOf(entries[currentPage + 1]
                      .getCode()), null, null));
    } else if (entries.length - currentPage == 1) {
      getJournal().getLeftText().setText(
          messageSource.getMessage(
              "JOURNAL_ENTRY_"
                  + String.valueOf(entries[currentPage]
                      .getCode()), null, null));
      getJournal().getRightText().setText("");
    } else {
      getJournal().getLeftText().setText("");
      getJournal().getRightText().setText("");
    }
    getJournal().getArrowLeft().setVisible(currentPage != 0);
    getJournal().getArrowRight().setVisible(
        currentPage < entries.length - 2);
  }

  protected void getJournalEntries() {
    GetJournalEntriesBackgroundWork work = new GetJournalEntriesBackgroundWork();
    work.setArgument(null);
    work.setView(baseGameView);
    ConnectionExceptionSettings ces = new ConnectionExceptionSettings();
    ces.setRestart(true);
    work.setConnectionExceptionSettings(ces);
    backgroundWorkManager.startBackgroundWork(work);
  }

  public void addGameObject(GameObject go) {
    this.gameObjects.add(go);
    this.baseGameView.addGameObject(go);
    if (this.getTilesEngine() != null && go.getTileTypes() != null) {
      getTilesEngine().addGameObject(go);
    }
  }

  public void removeGameObject(GameObject go) {
    go.release();
    gameObjects.remove(go);
    if (this.getTilesEngine() != null && go.getTileTypes() != null) {
      getTilesEngine().removeGameObject(go);
    }
  }

  public Collection<GameObject> getGameObjects() {
    return this.gameObjects;
  }

  private enum BuildingState {
    IDDLE, STARTED, SELECT_POSITION, MOVE_PET, BUILDING, OVER
  }

  buildingState = BuildingState.IDDLE;
  buildingGameObject = null;

  @Override
  public void startBuild(BuildingGameObject go) {
    go.setVisible(true);
    buildingState = BuildingState.STARTED;
    this.buildingGameObject = go;
  }

  @Override
  public boolean isBuilding() {
    return buildingGameObject != null;
  }

  private enum UpgradingState {
    IDDLE, STARTED, MOVE_PET, UPGRADING, OVER
  }

  private UpgradingState upgradingState = UpgradingState.IDDLE;
  private BuildingGameObject upgradingGameObject;

  @Override
  public StartUpgradeResult startUpgrade(BuildingGameObject go) {
    Point tilesStart = tilesEngine.translateToTileCoordinates(pet);
    Point tilesEnd = tilesEngine.translateToTileCoordinates(go);
    tilesEnd.setY(go.getTileTypes()[0].length + tilesEnd.getY());
    Point[] tilesPath = tilesEngine.findPath(tilesStart, tilesEnd);

    if (tilesPath != null) {
      Point[] movePath = new Point[tilesPath.length];
      for (int n = 0; n < tilesPath.length; n++) {
        Point tilesPoint = tilesPath[n];
        movePath[n] = tilesEngine.translateFromTileCoordinates(pet,
            tilesPoint);
      }
      pet.setMove(
          movePath,
          () -> {
            // Начать улучшение.
            upgradingState = UpgradingState.UPGRADING;
            progressBar.setVisible(true);
            progressBar.setValue(0);
            progressBar.removeAllAnimationOverListeners();
            progressBar
                .addAnimationOverListener(progressBarOverListener -> {
                  upgradingState = UpgradingState.OVER;
                  progressBar.setVisible(false);
                  this.upgradingGameObject.setVisible(true);
                  upgradingGameObject.fireUpgradeEvent();
                  this.upgradingGameObject = null;

                });
          });
      upgradingState = UpgradingState.STARTED;
      this.upgradingGameObject = go;
      return StartUpgradeResult.OK;
    }
    trayIcon.showTrayMessage(
        messageSource.getMessage(StringConstants.NO_PATH, null, null),
        MessageType.ERROR);
    return StartUpgradeResult.NO_PATH;
  }

  @Override
  public boolean isUpgrading() {
    return upgradingGameObject != null;
  }

  public void initializeMessageBox() {
    messageBox = new MessageBoxGameObject();
    int[][] imgids = new int[1][];
    imgids[0] = new int[1];
    imgids[0][0] = ResourceManager.IMAGE_ROOM_MESSAGE_BOX;
    messageBox.setAnimationImageIds(imgids);
    messageBox.setPosition(new Point(
        MessageBoxGameObject.ORIGINAL_MESSAGE_BOX_X, -600));
    messageBox.addMouseMoveListener(new MouseMoveListener() {
      @Override
      public void mouseMove(MouseMoveArg arg) {
        baseGameView.showDefaultCursor();
        baseGameView.setToolTipText("");
        setHighlightObject(null);
      }
    });
    messageBox.setZ(MENU_Z_ORDER);
    messageBox.setVisible(false);
    addGameObject(messageBox);

    HighlightGameObjectImpl messageBoxOkButton = new HighlightGameObjectImpl();
    imgids = new int[2][];
    imgids[0] = new int[1];
    imgids[0][0] = ResourceManager.IMAGE_ROOM_MESSAGE_BOX_BUTTON;
    imgids[1] = new int[1];
    imgids[1][0] = ResourceManager.IMAGE_ROOM_MESSAGE_BOX_BUTTON_HIGHLIGHT;
    messageBoxOkButton.setAnimationImageIds(imgids);
    messageBoxOkButton.setPosition(new Point(
        MessageBoxGameObject.ORIGINAL_MESSAGE_BOX_OK_BUTTON_X,
        MessageBoxGameObject.ORIGINAL_MESSAGE_BOX_OK_BUTTON_Y));
    messageBoxOkButton.addMouseMoveListener(new MouseMoveListener() {
      @Override
      public void mouseMove(MouseMoveArg arg) {
        baseGameView.showHandCursor();
        baseGameView.setToolTipText("");
        setHighlightObject(messageBoxOkButton);
      }
    });
    messageBoxOkButton.addClickedListener(new ClickedListener() {
      @Override
      public void clicked(ClickedArg arg) {
        if (messageBoxOkClickedListener != null) {
          messageBoxOkClickedListener.clicked(arg);
        } else {
          hideMessageBox();
        }
      }
    });
    messageBoxOkButton.setVisible(false);
    messageBoxOkButton.setZ(MENU_Z_ORDER);
    addGameObject(messageBoxOkButton);
    messageBox.setOkButton(messageBoxOkButton);

    HighlightGameObjectImpl messageBoxCancelButton = new HighlightGameObjectImpl();
    imgids = new int[2][];
    imgids[0] = new int[1];
    imgids[0][0] = ResourceManager.IMAGE_ROOM_MESSAGE_BOX_BUTTON;
    imgids[1] = new int[1];
    imgids[1][0] = ResourceManager.IMAGE_ROOM_MESSAGE_BOX_BUTTON_HIGHLIGHT;
    messageBoxCancelButton.setAnimationImageIds(imgids);
    messageBoxCancelButton.setPosition(new Point(
        MessageBoxGameObject.ORIGINAL_MESSAGE_BOX_CANCEL_BUTTON_X,
        MessageBoxGameObject.ORIGINAL_MESSAGE_BOX_CANCEL_BUTTON_Y));
    messageBoxCancelButton.addMouseMoveListener(new MouseMoveListener() {
      @Override
      public void mouseMove(MouseMoveArg arg) {
        baseGameView.showHandCursor();
        baseGameView.setToolTipText("");
        setHighlightObject(messageBoxCancelButton);
      }
    });
    messageBoxCancelButton.addClickedListener((
        cancelButtonClickedListenerArg) -> {
      messageBox.setVisible(false);
      messageBoxOkButton.setVisible(false);
      messageBoxCancelButton.setVisible(false);
      messageBox.getOkLabel().setVisible(false);
      messageBox.getCancelLabel().setVisible(false);
      if (this.messageBoxCancelClickedListener != null)
        messageBoxCancelClickedListener
            .clicked(cancelButtonClickedListenerArg);
    });
    messageBoxCancelButton.setVisible(false);
    messageBoxCancelButton.setZ(MENU_Z_ORDER);
    addGameObject(messageBoxCancelButton);
    messageBox.setCancelButton(messageBoxCancelButton);

    LabelGameObject messageBoxOkLabel = new LabelGameObject();
    messageBoxOkLabel.setPosition(new Point(
        MessageBoxGameObject.ORIGINAL_MESSAGE_BOX_OK_LABEL_X,
        MessageBoxGameObject.ORIGINAL_MESSAGE_BOX_OK_LABEL_Y));
    messageBoxOkLabel.setZ(MENU_Z_ORDER);
    addGameObject(messageBoxOkLabel);
    messageBoxOkLabel.setVisible(false);
    messageBox.setOkLabel(messageBoxOkLabel);

    LabelGameObject messageBoxCancelLabel = new LabelGameObject();
    messageBoxCancelLabel.setPosition(new Point(
        MessageBoxGameObject.ORIGINAL_MESSAGE_BOX_CANCEL_LABEL_X,
        MessageBoxGameObject.ORIGINAL_MESSAGE_BOX_CANCEL_LABEL_Y));
    messageBoxCancelLabel.setZ(MENU_Z_ORDER);
    addGameObject(messageBoxCancelLabel);
    messageBoxCancelLabel.setVisible(false);
    messageBox.setCancelLabel(messageBoxCancelLabel);

    LabelGameObject[] labelGameObjects = new LabelGameObject[3];
    for (int n = 0; n < labelGameObjects.length; n++) {
      LabelGameObject labelGameObject = new LabelGameObject();
      labelGameObject.setPosition(new Point(20, n * 25));
      labelGameObject.setZ(MENU_Z_ORDER);
      labelGameObject.setVisible(false);
      labelGameObject.setText("");
      addGameObject(labelGameObject);
      labelGameObjects[n] = labelGameObject;
    }
    messageBox.setTexts(labelGameObjects);
  }

  public MessageBoxGameObject getMessageBox() {
    return messageBox;
  }

  public void setMessageBox(MessageBoxGameObject messageBox) {
    this.messageBox = messageBox;
  }

  public class UpgradeInfo {
    BuildingMaterialGameObject[] upgradeBuildingMaterialGameObjects;
    LabelGameObject[] upgradeBuildingMaterialLabels;
    boolean upgradeInsufficientResources = false;

    public BuildingMaterialGameObject[] getUpgradeBuildingMaterialGameObjects() {
      return upgradeBuildingMaterialGameObjects;
    }

    public void setUpgradeBuildingMaterialGameObjects(
        BuildingMaterialGameObject[] upgradeBuildingMaterialGameObjects) {
      this.upgradeBuildingMaterialGameObjects = upgradeBuildingMaterialGameObjects;
    }

    public LabelGameObject[] getUpgradeBuildingMaterialLabels() {
      return upgradeBuildingMaterialLabels;
    }

    public void setUpgradeBuildingMaterialLabels(
        LabelGameObject[] upgradeBuildingMaterialLabels) {
      this.upgradeBuildingMaterialLabels = upgradeBuildingMaterialLabels;
    }

    public boolean isUpgradeInsufficientResources() {
      return upgradeInsufficientResources;
    }

    public void setUpgradeInsufficientResources(
        boolean upgradeInsufficientResources) {
      this.upgradeInsufficientResources = upgradeInsufficientResources;
    }

  }

  private ClickedListener messageBoxOkClickedListener = null;
  private ClickedListener messageBoxCancelClickedListener = null;

  public void showMessageBox(String[] texts,
      ClickedListener okClickedListener,
      ClickedListener cancelClickedListener,
      MessageBoxGameObject.MessageBoxType messageBoxType) {
    messageBox.setVisible(true);
    messageBox
        .setPosition(new Point(messageBox.getPosition().getX(), -600));
    LabelGameObject[] textLabels = messageBox.getTexts();
    for (int n = 0; n < textLabels.length && n < texts.length; n++) {
      textLabels[n].setText(texts[n] == null ? "" : texts[n]);
    }
    HighlightGameObjectImpl messageBoxOkButton = messageBox.getOkButton();
    messageBox.getOkLabel().setText(
        messageSource.getMessage(StringConstants.OK, null, null));
    messageBox.getCancelLabel().setText(
        messageSource.getMessage(StringConstants.CANCEL, null, null));

    messageBoxOkButton.setVisible(false);
    messageBox.setMessageBoxType(messageBoxType);
    this.messageBoxOkClickedListener = okClickedListener;
    this.messageBoxCancelClickedListener = cancelClickedListener;
  }

  public void hideMessageBox() {
    messageBox.setVisible(false);
    messageBox.getOkButton().setVisible(false);
    messageBox.getCancelButton().setVisible(false);
    messageBox.getOkLabel().setVisible(false);
    messageBox.getCancelLabel().setVisible(false);
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
