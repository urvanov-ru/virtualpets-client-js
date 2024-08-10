// domain
import GameObject from '../domain/GameObject.js';
import HiddenObjectsGameData from '../domain/HiddenObjectsGameData.js';
import Point from '../domain/Point.js';

//rest
import HiddenObjectsGameType from '../api/domain/HiddenObjectsGameType.js';

// resources
import ResourceManager from '../resources/ResourceManager.js';

// controller
import HiddenObjectsControllerBase from './HiddenObjectsControllerBase.js';

export default class RubbishController extends HiddenObjectsControllerBase {

  initialize() {
    this.hiddenObjectsGameType = HiddenObjectsGameType.RUBBISH;
    this.hiddenObjectsGameData = new HiddenObjectsGameData();
    const background = new GameObject();
    background.position = new Point(0, 0);
    background.animationImageIds = [[ ResourceManager.IMAGE_RUBBISH_BACKGROUND ]];
    background.addMouseMoveListener(mouseMoveArg => {
      this.baseGameView.toolTipText = "";
      this.highlightObject = null;
      this.baseGameView.showDefaultCursor();
    });
    this.addGameObject(background);
    this.hiddenObjectsGameData.background = background;
    super.initialize();
  }
  
  initializeHiddenObjectsIcons() {
    const hiddenObjectsIcons = new Array(52);
    this.hiddenObjectsGameData.hiddenObjectsIcons = hiddenObjectsIcons;
    hiddenObjectsIcons[0] = this.initHiddenObjectIcon(ResourceManager.IMAGE_RUBBISH_MANHOLE_ICON);
    hiddenObjectsIcons[1] = this.initHiddenObjectIcon(ResourceManager.IMAGE_RUBBISH_COCACOLA_ICON);
    hiddenObjectsIcons[2] = this.initHiddenObjectIcon(ResourceManager.IMAGE_RUBBISH_PLANT_ICON);
    hiddenObjectsIcons[3] = this.initHiddenObjectIcon(ResourceManager.IMAGE_RUBBISH_NEWSPAPER_ICON);
    hiddenObjectsIcons[4] = this.initHiddenObjectIcon(ResourceManager.IMAGE_RUBBISH_LAMP_ICON);
    hiddenObjectsIcons[5] = this.initHiddenObjectIcon(ResourceManager.IMAGE_RUBBISH_BRANCH_ICON);
    hiddenObjectsIcons[6] = this.initHiddenObjectIcon(ResourceManager.IMAGE_RUBBISH_GRAMOPHONE_ICON);
    hiddenObjectsIcons[7] = this.initHiddenObjectIcon(ResourceManager.IMAGE_RUBBISH_POT_ICON);
    hiddenObjectsIcons[8] = this.initHiddenObjectIcon(ResourceManager.IMAGE_RUBBISH_BOX_ICON);
    hiddenObjectsIcons[9] = this.initHiddenObjectIcon(ResourceManager.IMAGE_RUBBISH_CIGARETTE_END_ICON);
    hiddenObjectsIcons[10] = this.initHiddenObjectIcon(ResourceManager.IMAGE_RUBBISH_FEATHER_ICON);
    hiddenObjectsIcons[11] = this.initHiddenObjectIcon(ResourceManager.IMAGE_RUBBISH_HOUSE_ICON);
    hiddenObjectsIcons[12] = this.initHiddenObjectIcon(ResourceManager.IMAGE_RUBBISH_COIN_ICON);
    hiddenObjectsIcons[13] = this.initHiddenObjectIcon(ResourceManager.IMAGE_RUBBISH_PUDDLE_ICON);
    hiddenObjectsIcons[14] = this.initHiddenObjectIcon(ResourceManager.IMAGE_RUBBISH_GUTTER_ICON);
    hiddenObjectsIcons[15] = this.initHiddenObjectIcon(ResourceManager.IMAGE_RUBBISH_NOTICE_ICON);
    hiddenObjectsIcons[16] = this.initHiddenObjectIcon(ResourceManager.IMAGE_RUBBISH_CRACK_ICON);
    hiddenObjectsIcons[17] = this.initHiddenObjectIcon(ResourceManager.IMAGE_RUBBISH_TAPE_RECORDER_ICON);
    hiddenObjectsIcons[18] = this.initHiddenObjectIcon(ResourceManager.IMAGE_RUBBISH_CASSETE_ICON);
    hiddenObjectsIcons[19] = this.initHiddenObjectIcon(ResourceManager.IMAGE_RUBBISH_NEWSPAPER2_ICON);
    hiddenObjectsIcons[20] = this.initHiddenObjectIcon(ResourceManager.IMAGE_RUBBISH_BROOM_ICON);
    hiddenObjectsIcons[21] = this.initHiddenObjectIcon(ResourceManager.IMAGE_RUBBISH_APPLE_BIT_ICON);
    hiddenObjectsIcons[22] = this.initHiddenObjectIcon(ResourceManager.IMAGE_RUBBISH_GRAMOPHONE_RECORD_ICON);
    hiddenObjectsIcons[23] = this.initHiddenObjectIcon(ResourceManager.IMAGE_RUBBISH_WHITE_BOTTLE_ICON);
    hiddenObjectsIcons[24] = this.initHiddenObjectIcon(ResourceManager.IMAGE_RUBBISH_SIR_ANTHONY_AT_THE_PIANO_ICON);
    hiddenObjectsIcons[25] = this.initHiddenObjectIcon(ResourceManager.IMAGE_RUBBISH_WALL_CLOCK_ICON);
    hiddenObjectsIcons[26] = this.initHiddenObjectIcon(ResourceManager.IMAGE_RUBBISH_TUMBLER_TOY_ICON);
    hiddenObjectsIcons[27] = this.initHiddenObjectIcon(ResourceManager.IMAGE_RUBBISH_NOTE_ICON);
    hiddenObjectsIcons[28] = this.initHiddenObjectIcon(ResourceManager.IMAGE_RUBBISH_TABLE_LAMP_ICON);
    hiddenObjectsIcons[29] = this.initHiddenObjectIcon(ResourceManager.IMAGE_RUBBISH_TEAPOT_ICON);
    hiddenObjectsIcons[30] = this.initHiddenObjectIcon(ResourceManager.IMAGE_RUBBISH_BOOK_ICON);
    hiddenObjectsIcons[31] = this.initHiddenObjectIcon(ResourceManager.IMAGE_RUBBISH_NOTICE2_ICON);
    hiddenObjectsIcons[32] = this.initHiddenObjectIcon(ResourceManager.IMAGE_RUBBISH_NOTICE3_ICON);
    hiddenObjectsIcons[33] = this.initHiddenObjectIcon(ResourceManager.IMAGE_RUBBISH_NOTICE4_ICON);
    hiddenObjectsIcons[34] = this.initHiddenObjectIcon(ResourceManager.IMAGE_RUBBISH_THERMOMETER_ICON);
    hiddenObjectsIcons[35] = this.initHiddenObjectIcon(ResourceManager.IMAGE_RUBBISH_NOTICE5_ICON);
    hiddenObjectsIcons[36] = this.initHiddenObjectIcon(ResourceManager.IMAGE_RUBBISH_BEAR_ICON);
    hiddenObjectsIcons[37] = this.initHiddenObjectIcon(ResourceManager.IMAGE_RUBBISH_OCTOPUS_ICON);
    hiddenObjectsIcons[38] = this.initHiddenObjectIcon(ResourceManager.IMAGE_RUBBISH_STONE_ICON);
    hiddenObjectsIcons[39] = this.initHiddenObjectIcon(ResourceManager.IMAGE_RUBBISH_DECANTER_ICON);
    hiddenObjectsIcons[40] = this.initHiddenObjectIcon(ResourceManager.IMAGE_RUBBISH_LIZARD_ICON);
    hiddenObjectsIcons[41] = this.initHiddenObjectIcon(ResourceManager.IMAGE_RUBBISH_ROCK_PAINTING_ICON);
    hiddenObjectsIcons[42] = this.initHiddenObjectIcon(ResourceManager.IMAGE_RUBBISH_GOBLIN_ICON);
    hiddenObjectsIcons[43] = this.initHiddenObjectIcon(ResourceManager.IMAGE_RUBBISH_DRAGON_ICON);
    hiddenObjectsIcons[44] = this.initHiddenObjectIcon(ResourceManager.IMAGE_RUBBISH_GAME_CONSOLE_ICON);
    hiddenObjectsIcons[45] = this.initHiddenObjectIcon(ResourceManager.IMAGE_RUBBISH_PICTURE_ICON);
    hiddenObjectsIcons[46] = this.initHiddenObjectIcon(ResourceManager.IMAGE_RUBBISH_GAME_CONSOLE2_ICON);
    hiddenObjectsIcons[47] = this.initHiddenObjectIcon(ResourceManager.IMAGE_RUBBISH_BONE_ICON);
    hiddenObjectsIcons[48] = this.initHiddenObjectIcon(ResourceManager.IMAGE_RUBBISH_PLAYING_CARD_ICON);
    hiddenObjectsIcons[49] = this.initHiddenObjectIcon(ResourceManager.IMAGE_RUBBISH_PLAYING_CARD2_ICON);
    hiddenObjectsIcons[50] = this.initHiddenObjectIcon(ResourceManager.IMAGE_RUBBISH_PLAYING_CARD3_ICON);
    hiddenObjectsIcons[51] = this.initHiddenObjectIcon(ResourceManager.IMAGE_RUBBISH_HORSESHOE_ICON);
  }

  initializeHiddenObjects() {
    const hiddenObjects = new Array(52);
    this.hiddenObjectsGameData.hiddenObjects = hiddenObjects;
    hiddenObjects[0] = this.initHiddenObject(289, 357,
        ResourceManager.IMAGE_RUBBISH_MANHOLE);
    hiddenObjects[1] = this.initHiddenObject(552, 246,
        ResourceManager.IMAGE_RUBBISH_COCACOLA);
    hiddenObjects[2] = this.initHiddenObject(161, 370,
        ResourceManager.IMAGE_RUBBISH_PLANT);
    hiddenObjects[3] = this.initHiddenObject(471, 395,
        ResourceManager.IMAGE_RUBBISH_NEWSPAPER);
    hiddenObjects[4] = this.initHiddenObject(288, 291,
        ResourceManager.IMAGE_RUBBISH_LAMP);
    hiddenObjects[5] = this.initHiddenObject(253, 213,
        ResourceManager.IMAGE_RUBBISH_BRANCH);
    hiddenObjects[6] = this.initHiddenObject(308, 187,
        ResourceManager.IMAGE_RUBBISH_GRAMOPHONE);
    hiddenObjects[7] = this.initHiddenObject(329, 244,
        ResourceManager.IMAGE_RUBBISH_POT);
    hiddenObjects[8] = this.initHiddenObject(321, 291,
        ResourceManager.IMAGE_RUBBISH_BOX);
    hiddenObjects[9] = this.initHiddenObject(553, 452,
        ResourceManager.IMAGE_RUBBISH_CIGARETTE_END);
    hiddenObjects[10] = this.initHiddenObject(247, 476,
        ResourceManager.IMAGE_RUBBISH_FEATHER);
    hiddenObjects[11] = this.initHiddenObject(58, 468,
        ResourceManager.IMAGE_RUBBISH_HOUSE);
    hiddenObjects[12] = this.initHiddenObject(427, 385,
        ResourceManager.IMAGE_RUBBISH_COIN);
    hiddenObjects[13] = this.initHiddenObject(559, 226,
        ResourceManager.IMAGE_RUBBISH_PUDDLE);
    hiddenObjects[14] = this.initHiddenObject(573, 0,
        ResourceManager.IMAGE_RUBBISH_GUTTER);
    hiddenObjects[15] = this.initHiddenObject(570, 19,
        ResourceManager.IMAGE_RUBBISH_NOTICE);
    hiddenObjects[16] = this.initHiddenObject(360, 3,
        ResourceManager.IMAGE_RUBBISH_CRACK);
    hiddenObjects[17] = this.initHiddenObject(395, 176,
        ResourceManager.IMAGE_RUBBISH_TAPE_RECORDER);
    hiddenObjects[18] = this.initHiddenObject(410, 256,
        ResourceManager.IMAGE_RUBBISH_CASSETE);
    hiddenObjects[19] = this.initHiddenObject(494, 186,
        ResourceManager.IMAGE_RUBBISH_NEWSPAPER2);
    hiddenObjects[20] = this.initHiddenObject(702, 0,
        ResourceManager.IMAGE_RUBBISH_BROOM);
    hiddenObjects[21] = this.initHiddenObject(691, 262,
        ResourceManager.IMAGE_RUBBISH_APPLE_BIT);
    hiddenObjects[22] = this.initHiddenObject(575, 488,
        ResourceManager.IMAGE_RUBBISH_GRAMOPHONE_RECORD);
    hiddenObjects[23] = this.initHiddenObject(444, 236,
        ResourceManager.IMAGE_RUBBISH_WHITE_BOTTLE);
    hiddenObjects[24] = this.initHiddenObject(19, 77,
        ResourceManager.IMAGE_RUBBISH_SIR_ANTHONY_AT_THE_PIANO);
    hiddenObjects[25] = this.initHiddenObject(4, 9,
        ResourceManager.IMAGE_RUBBISH_WALL_CLOCK);
    hiddenObjects[26] = this.initHiddenObject(128, 454,
        ResourceManager.IMAGE_RUBBISH_TUMBLER_TOY);
    hiddenObjects[27] = this.initHiddenObject(408, 285,
        ResourceManager.IMAGE_RUBBISH_NOTE);
    hiddenObjects[28] = this.initHiddenObject(453, 259,
        ResourceManager.IMAGE_RUBBISH_TABLE_LAMP);
    hiddenObjects[29] = this.initHiddenObject(535, 253,
        ResourceManager.IMAGE_RUBBISH_TEAPOT);
    hiddenObjects[30] = this.initHiddenObject(293, 386,
        ResourceManager.IMAGE_RUBBISH_BOOK);
    hiddenObjects[31] = this.initHiddenObject(147, 201,
        ResourceManager.IMAGE_RUBBISH_NOTICE2);
    hiddenObjects[32] = this.initHiddenObject(22, 271,
        ResourceManager.IMAGE_RUBBISH_NOTICE3);
    hiddenObjects[33] = this.initHiddenObject(38, 330,
        ResourceManager.IMAGE_RUBBISH_NOTICE4);
    hiddenObjects[34] = this.initHiddenObject(221, 66,
        ResourceManager.IMAGE_RUBBISH_THERMOMETER);
    hiddenObjects[35] = this.initHiddenObject(140, 301,
        ResourceManager.IMAGE_RUBBISH_NOTICE5);
    hiddenObjects[36] = this.initHiddenObject(452, 347,
        ResourceManager.IMAGE_RUBBISH_BEAR);
    hiddenObjects[37] = this.initHiddenObject(639, 247,
        ResourceManager.IMAGE_RUBBISH_OCTOPUS);
    hiddenObjects[38] = this.initHiddenObject(632, 344,
        ResourceManager.IMAGE_RUBBISH_STONE);
    hiddenObjects[39] = this.initHiddenObject(401, 47,
        ResourceManager.IMAGE_RUBBISH_DECANTER);
    hiddenObjects[40] = this.initHiddenObject(290, 18,
        ResourceManager.IMAGE_RUBBISH_LIZARD);
    hiddenObjects[41] = this.initHiddenObject(532, 64,
        ResourceManager.IMAGE_RUBBISH_ROCK_PAINTING);
    hiddenObjects[42] = this.initHiddenObject(742, 241,
        ResourceManager.IMAGE_RUBBISH_GOBLIN);
    hiddenObjects[43] = this.initHiddenObject(613, 180,
        ResourceManager.IMAGE_RUBBISH_DRAGON);
    hiddenObjects[44] = this.initHiddenObject(446, 133,
        ResourceManager.IMAGE_RUBBISH_GAME_CONSOLE);
    hiddenObjects[45] = this.initHiddenObject(653, 329,
        ResourceManager.IMAGE_RUBBISH_PICTURE);
    hiddenObjects[46] = this.initHiddenObject(618, 321,
        ResourceManager.IMAGE_RUBBISH_GAME_CONSOLE2);
    hiddenObjects[47] = this.initHiddenObject(311, 137,
        ResourceManager.IMAGE_RUBBISH_BONE);
    hiddenObjects[48] = this.initHiddenObject(680, 430,
        ResourceManager.IMAGE_RUBBISH_PLAYING_CARD);
    hiddenObjects[49] = this.initHiddenObject(425, 123,
        ResourceManager.IMAGE_RUBBISH_PLAYING_CARD2);
    hiddenObjects[50] = this.initHiddenObject(166, 26,
        ResourceManager.IMAGE_RUBBISH_PLAYING_CARD3);
    hiddenObjects[51] = this.initHiddenObject(401, 210,
        ResourceManager.IMAGE_RUBBISH_HORSESHOE);
  }

  get rubbishView() {
    return this.baseGameView;
  }
}