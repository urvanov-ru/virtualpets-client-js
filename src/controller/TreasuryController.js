
export default class TreasuryController extends HiddenObjectsControllerBase {

  initialize() {
    console.debug("Initialize Treasure Controller");
    this.hiddenObjectsGameType = HiddenObjectsGameType.TREASURY;
    
    const treasuryData = new TreasuryData();
    this.hiddenObjectsGameData =  treasuryData;

    const background = new GameObject();
    background.position = new Point(0, 0);
    background.animationImageIds = [[ ResourceManagerBase.IMAGE_TREASURY_BACKGROUND ]];
    background.addMouseMoveListener((mouseMoveArg) => {
        this.baseGameView.showDefaultCursor();
        this.baseGameView.toolTipText = "";
        this.highlightObject = null;
      });
    this.addGameObject(background);
    this.treasuryData.background = background;

    const front = new GameObject();
    front.position = new Point(0, 0);
    front.animationImageIds = [[ ResourceManagerBase.IMAGE_TREASURY_FRONT ]];
    front.addMouseMoveListener((mouseMoveArg) => {
        this.baseGameView.showDefaultCursor();
        this.baseGameView.toolTipText = "";
        this.highlightObject = null;
      });
    this.addGameObject(front);
    this.treasuryData.front = front;

    GameObject statue = new GameObject();
    statue.setPosition(new Point(0, 0));
    imgids = new int[1][];
    imgids[0] = new int[1];
    imgids[0][0] = ResourceManagerBase.IMAGE_TREASURY_STATUE;
    statue.setAnimationImageIds(imgids);
    statue.addMouseMoveListener((mouseMoveArg)-> {
        baseGameView.showDefaultCursor();
        baseGameView.setToolTipText("");
        setHighlightObject(null);
      });
    addGameObject(statue);
    treasuryData.setStatue(statue);

    

    GameObject torch = new GameObject();
    torch.setPosition(new Point(0, 0));
    imgids = new int[1][];
    imgids[0] = new int[1];
    imgids[0][0] = ResourceManagerBase.IMAGE_TREASURY_TORCH;
    torch.setAnimationImageIds(imgids);
    torch.addMouseMoveListener((mouseMoveArg)-> {
        baseGameView.showDefaultCursor();
        baseGameView.setToolTipText("");
        setHighlightObject(null);
      });
    addGameObject(torch);
    treasuryData.setTorch(torch);
    super.initialize();
  }


  protected void initializeHiddenObjectsIcons() {
    GameObject[] hiddenObjectsIcons = new GameObject[42];
    hiddenObjectsGameData.setHiddenObjectsIcons(hiddenObjectsIcons);
    hiddenObjectsIcons[0] = initHiddenObjectIcon(ResourceManagerBase.IMAGE_TREASURY_SCROLL_ICON);
    hiddenObjectsIcons[1] = initHiddenObjectIcon(ResourceManagerBase.IMAGE_TREASURY_TELESCOPE_ICON);
    hiddenObjectsIcons[2] = initHiddenObjectIcon(ResourceManagerBase.IMAGE_TREASURY_BIG_BOOK_ICON);
    hiddenObjectsIcons[3] = initHiddenObjectIcon(ResourceManagerBase.IMAGE_TREASURY_LANTERN_ICON);
    hiddenObjectsIcons[4] = initHiddenObjectIcon(ResourceManagerBase.IMAGE_TREASURY_SABRE_ICON);
    hiddenObjectsIcons[5] = initHiddenObjectIcon(ResourceManagerBase.IMAGE_TREASURY_MEDALLION_ICON);
    hiddenObjectsIcons[6] = initHiddenObjectIcon(ResourceManagerBase.IMAGE_TREASURY_BARREL_ICON);
    hiddenObjectsIcons[7] = initHiddenObjectIcon(ResourceManagerBase.IMAGE_TREASURY_BIRDSNEST_ICON);
    hiddenObjectsIcons[8] = initHiddenObjectIcon(ResourceManagerBase.IMAGE_TREASURY_PEN_ICON);
    hiddenObjectsIcons[9] = initHiddenObjectIcon(ResourceManagerBase.IMAGE_TREASURY_PAPER_AIRPLANE_ICON);
    hiddenObjectsIcons[10] = initHiddenObjectIcon(ResourceManagerBase.IMAGE_TREASURY_PURSE_ICON);
    hiddenObjectsIcons[11] = initHiddenObjectIcon(ResourceManagerBase.IMAGE_TREASURY_FEATHER_ICON);
    hiddenObjectsIcons[12] = initHiddenObjectIcon(ResourceManagerBase.IMAGE_TREASURY_KNIFE_ICON);
    hiddenObjectsIcons[13] = initHiddenObjectIcon(ResourceManagerBase.IMAGE_TREASURY_APPLE_ICON);
    hiddenObjectsIcons[14] = initHiddenObjectIcon(ResourceManagerBase.IMAGE_TREASURY_COINS_ICON);
    hiddenObjectsIcons[15] = initHiddenObjectIcon(ResourceManagerBase.IMAGE_TREASURY_COINS_ICON);
    hiddenObjectsIcons[16] = initHiddenObjectIcon(ResourceManagerBase.IMAGE_TREASURY_COINS_ICON);
    hiddenObjectsIcons[17] = initHiddenObjectIcon(ResourceManagerBase.IMAGE_TREASURY_CABBAGE_ICON);
    hiddenObjectsIcons[18] = initHiddenObjectIcon(ResourceManagerBase.IMAGE_TREASURY_CHEST_ICON);
    hiddenObjectsIcons[19] = initHiddenObjectIcon(ResourceManagerBase.IMAGE_TREASURY_COINS_STACK_ICON);
    hiddenObjectsIcons[20] = initHiddenObjectIcon(ResourceManagerBase.IMAGE_TREASURY_AMULET_ICON);
    hiddenObjectsIcons[21] = initHiddenObjectIcon(ResourceManagerBase.IMAGE_TREASURY_DIAMOND_ICON);
    hiddenObjectsIcons[22] = initHiddenObjectIcon(ResourceManagerBase.IMAGE_TREASURY_PAPER_ICON);
    hiddenObjectsIcons[23] = initHiddenObjectIcon(ResourceManagerBase.IMAGE_TREASURY_COMPASS_ICON);
    hiddenObjectsIcons[24] = initHiddenObjectIcon(ResourceManagerBase.IMAGE_TREASURY_ROSE_ICON);
    hiddenObjectsIcons[25] = initHiddenObjectIcon(ResourceManagerBase.IMAGE_TREASURY_BOOK_ICON);
    hiddenObjectsIcons[26] = initHiddenObjectIcon(ResourceManagerBase.IMAGE_TREASURY_MOUSE_ICON);
    hiddenObjectsIcons[27] = initHiddenObjectIcon(ResourceManagerBase.IMAGE_TREASURY_CHEESE_ICON);
    hiddenObjectsIcons[28] = initHiddenObjectIcon(ResourceManagerBase.IMAGE_TREASURY_FRACTURE_ICON);
    hiddenObjectsIcons[29] = initHiddenObjectIcon(ResourceManagerBase.IMAGE_TREASURY_FORK_ICON);
    hiddenObjectsIcons[30] = initHiddenObjectIcon(ResourceManagerBase.IMAGE_TREASURY_BASKET_ICON);
    hiddenObjectsIcons[31] = initHiddenObjectIcon(ResourceManagerBase.IMAGE_TREASURY_CURTAIN_ICON);
    hiddenObjectsIcons[32] = initHiddenObjectIcon(ResourceManagerBase.IMAGE_TREASURY_COMB_ICON);
    hiddenObjectsIcons[33] = initHiddenObjectIcon(ResourceManagerBase.IMAGE_TREASURY_SPIDER_ICON);
    hiddenObjectsIcons[34] = initHiddenObjectIcon(ResourceManagerBase.IMAGE_TREASURY_GLASSES_ICON);
    hiddenObjectsIcons[35] = initHiddenObjectIcon(ResourceManagerBase.IMAGE_TREASURY_SHIELD_ICON);
    hiddenObjectsIcons[36] = initHiddenObjectIcon(ResourceManagerBase.IMAGE_TREASURY_CHAIN_ICON);
    hiddenObjectsIcons[37] = initHiddenObjectIcon(ResourceManagerBase.IMAGE_TREASURY_WEB_ICON);
    hiddenObjectsIcons[38] = initHiddenObjectIcon(ResourceManagerBase.IMAGE_TREASURY_PINION_ICON);
    hiddenObjectsIcons[39] = initHiddenObjectIcon(ResourceManagerBase.IMAGE_TREASURY_WRISTWATCH_ICON);
    hiddenObjectsIcons[40] = initHiddenObjectIcon(ResourceManagerBase.IMAGE_TREASURY_LAMP_ICON);
    hiddenObjectsIcons[41] = initHiddenObjectIcon(ResourceManagerBase.IMAGE_TREASURY_LIANA_ICON);
  }



  protected void initializeHiddenObjects() {
    GameObject[] hiddenObjects = new GameObject[42];
    hiddenObjectsGameData.setHiddenObjects(hiddenObjects);
    hiddenObjects[0] = initHiddenObject(712, 165,
        ResourceManagerBase.IMAGE_TREASURY_SCROLL);
    hiddenObjects[1] = initHiddenObject(69, 100,
        ResourceManagerBase.IMAGE_TREASURY_TELESCOPE);
    hiddenObjects[2] = initHiddenObject(286, 225,
        ResourceManagerBase.IMAGE_TREASURY_BIG_BOOK);
    hiddenObjects[3] = initHiddenObject(459, 430,
        ResourceManagerBase.IMAGE_TREASURY_LANTERN);
    hiddenObjects[4] = initHiddenObject(274, 112,
        ResourceManagerBase.IMAGE_TREASURY_SABRE);
    hiddenObjects[5] = initHiddenObject(346, 411,
        ResourceManagerBase.IMAGE_TREASURY_MEDALLION);
    hiddenObjects[6] = initHiddenObject(720, 318,
        ResourceManagerBase.IMAGE_TREASURY_BARREL);
    hiddenObjects[7] = initHiddenObject(736, 508,
        ResourceManagerBase.IMAGE_TREASURY_BIRDSNEST);
    hiddenObjects[8] = initHiddenObject(436, 393,
        ResourceManagerBase.IMAGE_TREASURY_PEN);
    hiddenObjects[9] = initHiddenObject(118, 354,
        ResourceManagerBase.IMAGE_TREASURY_PAPER_AIRPLANE);
    hiddenObjects[10] = initHiddenObject(229, 339,
        ResourceManagerBase.IMAGE_TREASURY_PURSE);
    hiddenObjects[11] = initHiddenObject(262, 436,
        ResourceManagerBase.IMAGE_TREASURY_FEATHER);
    hiddenObjects[12] = initHiddenObject(168, 387,
        ResourceManagerBase.IMAGE_TREASURY_KNIFE);
    hiddenObjects[13] = initHiddenObject(129, 363,
        ResourceManagerBase.IMAGE_TREASURY_APPLE);
    hiddenObjects[14] = initHiddenObject(118, 397,
        ResourceManagerBase.IMAGE_TREASURY_COINS);
    hiddenObjects[15] = initHiddenObject(292, 390,
        ResourceManagerBase.IMAGE_TREASURY_COINS);
    hiddenObjects[16] = initHiddenObject(427, 349,
        ResourceManagerBase.IMAGE_TREASURY_COINS);
    hiddenObjects[17] = initHiddenObject(282, 303,
        ResourceManagerBase.IMAGE_TREASURY_CABBAGE);
    hiddenObjects[18] = initHiddenObject(348, 340,
        ResourceManagerBase.IMAGE_TREASURY_CHEST);
    hiddenObjects[19] = initHiddenObject(412, 369,
        ResourceManagerBase.IMAGE_TREASURY_COINS_STACK);
    hiddenObjects[20] = initHiddenObject(459, 205,
        ResourceManagerBase.IMAGE_TREASURY_AMULET);
    hiddenObjects[21] = initHiddenObject(478, 190,
        ResourceManagerBase.IMAGE_TREASURY_DIAMOND);
    hiddenObjects[22] = initHiddenObject(139, 475,
        ResourceManagerBase.IMAGE_TREASURY_PAPER);
    hiddenObjects[23] = initHiddenObject(178, 366,
        ResourceManagerBase.IMAGE_TREASURY_COMPASS);
    hiddenObjects[24] = initHiddenObject(450, 373,
        ResourceManagerBase.IMAGE_TREASURY_ROSE);
    hiddenObjects[25] = initHiddenObject(552, 370,
        ResourceManagerBase.IMAGE_TREASURY_BOOK);
    hiddenObjects[26] = initHiddenObject(523, 360,
        ResourceManagerBase.IMAGE_TREASURY_MOUSE);
    hiddenObjects[27] = initHiddenObject(228, 364,
        ResourceManagerBase.IMAGE_TREASURY_CHEESE);
    hiddenObjects[28] = initHiddenObject(658, 352,
        ResourceManagerBase.IMAGE_TREASURY_FRACTURE);
    hiddenObjects[29] = initHiddenObject(675, 244,
        ResourceManagerBase.IMAGE_TREASURY_FORK);
    hiddenObjects[30] = initHiddenObject(520, 1,
        ResourceManagerBase.IMAGE_TREASURY_BASKET);
    hiddenObjects[31] = initHiddenObject(375, 27,
        ResourceManagerBase.IMAGE_TREASURY_CURTAIN);
    hiddenObjects[32] = initHiddenObject(337, 7,
        ResourceManagerBase.IMAGE_TREASURY_COMB);
    hiddenObjects[33] = initHiddenObject(129, 0,
        ResourceManagerBase.IMAGE_TREASURY_SPIDER);
    hiddenObjects[34] = initHiddenObject(0, 459,
        ResourceManagerBase.IMAGE_TREASURY_GLASSES);
    hiddenObjects[35] = initHiddenObject(643, 12,
        ResourceManagerBase.IMAGE_TREASURY_SHIELD);
    hiddenObjects[36] = initHiddenObject(627, 100,
        ResourceManagerBase.IMAGE_TREASURY_CHAIN);
    hiddenObjects[37] = initHiddenObject(714, 106,
        ResourceManagerBase.IMAGE_TREASURY_WEB);
    hiddenObjects[38] = initHiddenObject(40, 516,
        ResourceManagerBase.IMAGE_TREASURY_PINION);
    hiddenObjects[39] = initHiddenObject(78, 331,
        ResourceManagerBase.IMAGE_TREASURY_WRISTWATCH);
    hiddenObjects[40] = initHiddenObject(0, 82,
        ResourceManagerBase.IMAGE_TREASURY_LAMP);
    hiddenObjects[41] = initHiddenObject(0, 0,
        ResourceManagerBase.IMAGE_TREASURY_LIANA);

  }


  @Override
  public TreasuryView getTreasuryView() {
    return (TreasuryView) baseGameView;
  }
}
