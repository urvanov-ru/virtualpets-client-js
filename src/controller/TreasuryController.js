// domain
import GameObject from '../domain/GameObject.js';
import TreasuryData from '../domain/TreasuryData.js';
import Point from '../domain/Point.js';

//rest
import HiddenObjectsGameType from '../api/domain/HiddenObjectsGameType.js';

// resources
import ResourceManager from '../resources/ResourceManager.js';

// controller
import HiddenObjectsControllerBase from './HiddenObjectsControllerBase.js';


export default class TreasuryController extends HiddenObjectsControllerBase {

  initialize() {
    console.debug("Initialize Treasure Controller");
    this.hiddenObjectsGameType = HiddenObjectsGameType.TREASURY;
    
    const treasuryData = new TreasuryData();
    this.hiddenObjectsGameData =  treasuryData;

    const background = new GameObject();
    background.position = new Point(0, 0);
    background.animationImageIds = [[ ResourceManager.IMAGE_TREASURY_BACKGROUND ]];
    background.addMouseMoveListener((mouseMoveArg) => {
        this.baseGameView.showDefaultCursor();
        this.baseGameView.toolTipText = "";
        this.highlightObject = null;
      });
    this.addGameObject(background);
    treasuryData.background = background;

    const front = new GameObject();
    front.position = new Point(0, 0);
    front.animationImageIds = [[ ResourceManager.IMAGE_TREASURY_FRONT ]];
    front.addMouseMoveListener((mouseMoveArg) => {
        this.baseGameView.showDefaultCursor();
        this.baseGameView.toolTipText = "";
        this.highlightObject = null;
      });
    this.addGameObject(front);
    treasuryData.front = front;

    const statue = new GameObject();
    statue.position = new Point(0, 0);
    statue.animationImageIds = [[ ResourceManager.IMAGE_TREASURY_STATUE ]];
    statue.addMouseMoveListener((mouseMoveArg) => {
        this.baseGameView.showDefaultCursor();
        this.baseGameView.toolTipText = "";
        this.highlightObject = null;
      });
    this.addGameObject(statue);
    treasuryData.statue = statue;

    const torch = new GameObject();
    torch.position = new Point(0, 0);
    torch.animationImageIds = [[ ResourceManager.IMAGE_TREASURY_TORCH ]];
    torch.addMouseMoveListener((mouseMoveArg) => {
        this.baseGameView.showDefaultCursor();
        this.baseGameView.toolTipText = "";
        this.highlightObject = null;
      });
    this.addGameObject(torch);
    treasuryData.torch = torch;
    super.initialize();
  }


  initializeHiddenObjectsIcons() {
    const hiddenObjectsIcons = new Array(42);
    this.hiddenObjectsGameData.hiddenObjectsIcons = hiddenObjectsIcons;
    hiddenObjectsIcons[0] = this.initHiddenObjectIcon(ResourceManager.IMAGE_TREASURY_SCROLL_ICON);
    hiddenObjectsIcons[1] = this.initHiddenObjectIcon(ResourceManager.IMAGE_TREASURY_TELESCOPE_ICON);
    hiddenObjectsIcons[2] = this.initHiddenObjectIcon(ResourceManager.IMAGE_TREASURY_BIG_BOOK_ICON);
    hiddenObjectsIcons[3] = this.initHiddenObjectIcon(ResourceManager.IMAGE_TREASURY_LANTERN_ICON);
    hiddenObjectsIcons[4] = this.initHiddenObjectIcon(ResourceManager.IMAGE_TREASURY_SABRE_ICON);
    hiddenObjectsIcons[5] = this.initHiddenObjectIcon(ResourceManager.IMAGE_TREASURY_MEDALLION_ICON);
    hiddenObjectsIcons[6] = this.initHiddenObjectIcon(ResourceManager.IMAGE_TREASURY_BARREL_ICON);
    hiddenObjectsIcons[7] = this.initHiddenObjectIcon(ResourceManager.IMAGE_TREASURY_BIRDSNEST_ICON);
    hiddenObjectsIcons[8] = this.initHiddenObjectIcon(ResourceManager.IMAGE_TREASURY_PEN_ICON);
    hiddenObjectsIcons[9] = this.initHiddenObjectIcon(ResourceManager.IMAGE_TREASURY_PAPER_AIRPLANE_ICON);
    hiddenObjectsIcons[10] = this.initHiddenObjectIcon(ResourceManager.IMAGE_TREASURY_PURSE_ICON);
    hiddenObjectsIcons[11] = this.initHiddenObjectIcon(ResourceManager.IMAGE_TREASURY_FEATHER_ICON);
    hiddenObjectsIcons[12] = this.initHiddenObjectIcon(ResourceManager.IMAGE_TREASURY_KNIFE_ICON);
    hiddenObjectsIcons[13] = this.initHiddenObjectIcon(ResourceManager.IMAGE_TREASURY_APPLE_ICON);
    hiddenObjectsIcons[14] = this.initHiddenObjectIcon(ResourceManager.IMAGE_TREASURY_COINS_ICON);
    hiddenObjectsIcons[15] = this.initHiddenObjectIcon(ResourceManager.IMAGE_TREASURY_COINS_ICON);
    hiddenObjectsIcons[16] = this.initHiddenObjectIcon(ResourceManager.IMAGE_TREASURY_COINS_ICON);
    hiddenObjectsIcons[17] = this.initHiddenObjectIcon(ResourceManager.IMAGE_TREASURY_CABBAGE_ICON);
    hiddenObjectsIcons[18] = this.initHiddenObjectIcon(ResourceManager.IMAGE_TREASURY_CHEST_ICON);
    hiddenObjectsIcons[19] = this.initHiddenObjectIcon(ResourceManager.IMAGE_TREASURY_COINS_STACK_ICON);
    hiddenObjectsIcons[20] = this.initHiddenObjectIcon(ResourceManager.IMAGE_TREASURY_AMULET_ICON);
    hiddenObjectsIcons[21] = this.initHiddenObjectIcon(ResourceManager.IMAGE_TREASURY_DIAMOND_ICON);
    hiddenObjectsIcons[22] = this.initHiddenObjectIcon(ResourceManager.IMAGE_TREASURY_PAPER_ICON);
    hiddenObjectsIcons[23] = this.initHiddenObjectIcon(ResourceManager.IMAGE_TREASURY_COMPASS_ICON);
    hiddenObjectsIcons[24] = this.initHiddenObjectIcon(ResourceManager.IMAGE_TREASURY_ROSE_ICON);
    hiddenObjectsIcons[25] = this.initHiddenObjectIcon(ResourceManager.IMAGE_TREASURY_BOOK_ICON);
    hiddenObjectsIcons[26] = this.initHiddenObjectIcon(ResourceManager.IMAGE_TREASURY_MOUSE_ICON);
    hiddenObjectsIcons[27] = this.initHiddenObjectIcon(ResourceManager.IMAGE_TREASURY_CHEESE_ICON);
    hiddenObjectsIcons[28] = this.initHiddenObjectIcon(ResourceManager.IMAGE_TREASURY_FRACTURE_ICON);
    hiddenObjectsIcons[29] = this.initHiddenObjectIcon(ResourceManager.IMAGE_TREASURY_FORK_ICON);
    hiddenObjectsIcons[30] = this.initHiddenObjectIcon(ResourceManager.IMAGE_TREASURY_BASKET_ICON);
    hiddenObjectsIcons[31] = this.initHiddenObjectIcon(ResourceManager.IMAGE_TREASURY_CURTAIN_ICON);
    hiddenObjectsIcons[32] = this.initHiddenObjectIcon(ResourceManager.IMAGE_TREASURY_COMB_ICON);
    hiddenObjectsIcons[33] = this.initHiddenObjectIcon(ResourceManager.IMAGE_TREASURY_SPIDER_ICON);
    hiddenObjectsIcons[34] = this.initHiddenObjectIcon(ResourceManager.IMAGE_TREASURY_GLASSES_ICON);
    hiddenObjectsIcons[35] = this.initHiddenObjectIcon(ResourceManager.IMAGE_TREASURY_SHIELD_ICON);
    hiddenObjectsIcons[36] = this.initHiddenObjectIcon(ResourceManager.IMAGE_TREASURY_CHAIN_ICON);
    hiddenObjectsIcons[37] = this.initHiddenObjectIcon(ResourceManager.IMAGE_TREASURY_WEB_ICON);
    hiddenObjectsIcons[38] = this.initHiddenObjectIcon(ResourceManager.IMAGE_TREASURY_PINION_ICON);
    hiddenObjectsIcons[39] = this.initHiddenObjectIcon(ResourceManager.IMAGE_TREASURY_WRISTWATCH_ICON);
    hiddenObjectsIcons[40] = this.initHiddenObjectIcon(ResourceManager.IMAGE_TREASURY_LAMP_ICON);
    hiddenObjectsIcons[41] = this.initHiddenObjectIcon(ResourceManager.IMAGE_TREASURY_LIANA_ICON);
  }



  initializeHiddenObjects() {
    const hiddenObjects = new Array(42);
    this.hiddenObjectsGameData.hiddenObjects = hiddenObjects;
    hiddenObjects[0] = this.initHiddenObject(712, 165,
        ResourceManager.IMAGE_TREASURY_SCROLL);
    hiddenObjects[1] = this.initHiddenObject(69, 100,
        ResourceManager.IMAGE_TREASURY_TELESCOPE);
    hiddenObjects[2] = this.initHiddenObject(286, 225,
        ResourceManager.IMAGE_TREASURY_BIG_BOOK);
    hiddenObjects[3] = this.initHiddenObject(459, 430,
        ResourceManager.IMAGE_TREASURY_LANTERN);
    hiddenObjects[4] = this.initHiddenObject(274, 112,
        ResourceManager.IMAGE_TREASURY_SABRE);
    hiddenObjects[5] = this.initHiddenObject(346, 411,
        ResourceManager.IMAGE_TREASURY_MEDALLION);
    hiddenObjects[6] = this.initHiddenObject(720, 318,
        ResourceManager.IMAGE_TREASURY_BARREL);
    hiddenObjects[7] = this.initHiddenObject(736, 508,
        ResourceManager.IMAGE_TREASURY_BIRDSNEST);
    hiddenObjects[8] = this.initHiddenObject(436, 393,
        ResourceManager.IMAGE_TREASURY_PEN);
    hiddenObjects[9] = this.initHiddenObject(118, 354,
        ResourceManager.IMAGE_TREASURY_PAPER_AIRPLANE);
    hiddenObjects[10] = this.initHiddenObject(229, 339,
        ResourceManager.IMAGE_TREASURY_PURSE);
    hiddenObjects[11] = this.initHiddenObject(262, 436,
        ResourceManager.IMAGE_TREASURY_FEATHER);
    hiddenObjects[12] = this.initHiddenObject(168, 387,
        ResourceManager.IMAGE_TREASURY_KNIFE);
    hiddenObjects[13] = this.initHiddenObject(129, 363,
        ResourceManager.IMAGE_TREASURY_APPLE);
    hiddenObjects[14] = this.initHiddenObject(118, 397,
        ResourceManager.IMAGE_TREASURY_COINS);
    hiddenObjects[15] = this.initHiddenObject(292, 390,
        ResourceManager.IMAGE_TREASURY_COINS);
    hiddenObjects[16] = this.initHiddenObject(427, 349,
        ResourceManager.IMAGE_TREASURY_COINS);
    hiddenObjects[17] = this.initHiddenObject(282, 303,
        ResourceManager.IMAGE_TREASURY_CABBAGE);
    hiddenObjects[18] = this.initHiddenObject(348, 340,
        ResourceManager.IMAGE_TREASURY_CHEST);
    hiddenObjects[19] = this.initHiddenObject(412, 369,
        ResourceManager.IMAGE_TREASURY_COINS_STACK);
    hiddenObjects[20] = this.initHiddenObject(459, 205,
        ResourceManager.IMAGE_TREASURY_AMULET);
    hiddenObjects[21] = this.initHiddenObject(478, 190,
        ResourceManager.IMAGE_TREASURY_DIAMOND);
    hiddenObjects[22] = this.initHiddenObject(139, 475,
        ResourceManager.IMAGE_TREASURY_PAPER);
    hiddenObjects[23] = this.initHiddenObject(178, 366,
        ResourceManager.IMAGE_TREASURY_COMPASS);
    hiddenObjects[24] = this.initHiddenObject(450, 373,
        ResourceManager.IMAGE_TREASURY_ROSE);
    hiddenObjects[25] = this.initHiddenObject(552, 370,
        ResourceManager.IMAGE_TREASURY_BOOK);
    hiddenObjects[26] = this.initHiddenObject(523, 360,
        ResourceManager.IMAGE_TREASURY_MOUSE);
    hiddenObjects[27] = this.initHiddenObject(228, 364,
        ResourceManager.IMAGE_TREASURY_CHEESE);
    hiddenObjects[28] = this.initHiddenObject(658, 352,
        ResourceManager.IMAGE_TREASURY_FRACTURE);
    hiddenObjects[29] = this.initHiddenObject(675, 244,
        ResourceManager.IMAGE_TREASURY_FORK);
    hiddenObjects[30] = this.initHiddenObject(520, 1,
        ResourceManager.IMAGE_TREASURY_BASKET);
    hiddenObjects[31] = this.initHiddenObject(375, 27,
        ResourceManager.IMAGE_TREASURY_CURTAIN);
    hiddenObjects[32] = this.initHiddenObject(337, 7,
        ResourceManager.IMAGE_TREASURY_COMB);
    hiddenObjects[33] = this.initHiddenObject(129, 0,
        ResourceManager.IMAGE_TREASURY_SPIDER);
    hiddenObjects[34] = this.initHiddenObject(0, 459,
        ResourceManager.IMAGE_TREASURY_GLASSES);
    hiddenObjects[35] = this.initHiddenObject(643, 12,
        ResourceManager.IMAGE_TREASURY_SHIELD);
    hiddenObjects[36] = this.initHiddenObject(627, 100,
        ResourceManager.IMAGE_TREASURY_CHAIN);
    hiddenObjects[37] = this.initHiddenObject(714, 106,
        ResourceManager.IMAGE_TREASURY_WEB);
    hiddenObjects[38] = this.initHiddenObject(40, 516,
        ResourceManager.IMAGE_TREASURY_PINION);
    hiddenObjects[39] = this.initHiddenObject(78, 331,
        ResourceManager.IMAGE_TREASURY_WRISTWATCH);
    hiddenObjects[40] = this.initHiddenObject(0, 82,
        ResourceManager.IMAGE_TREASURY_LAMP);
    hiddenObjects[41] = this.initHiddenObject(0, 0,
        ResourceManager.IMAGE_TREASURY_LIANA);

  }


  get treasuryView() {
    return this.baseGameView;
  }
}
