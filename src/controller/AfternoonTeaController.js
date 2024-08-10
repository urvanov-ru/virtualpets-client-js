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

export default class AfternoonTeaControllerImpl extends HiddenObjectsControllerBase {

  initialize() {
    this.hiddenObjectsGameType = HiddenObjectsGameType.AFTERNOONTEA;
    this.hiddenObjectsGameData = new HiddenObjectsGameData();
    const background = new GameObject();
    background.position = new Point(0, 0);
    background.animationImageIds = [[ ResourceManager.IMAGE_AFTERNOONTEA_BACKGROUND ]];
    background.addMouseMoveListener((mouseMoveArg) => {
      this.baseGameView.toolTipText = "";
      this.highlightObject = null;
      this.baseGameView.showDefaultCursor();
    });
    this.addGameObject(background);
    this.hiddenObjectsGameData.background = background;
    super.initialize();
  }

  initializeHiddenObjectsIcons() {
    const hiddenObjectsIcons = new Array(55);
    this.hiddenObjectsGameData.hiddenObjectsIcons = hiddenObjectsIcons;
    hiddenObjectsIcons[0] = this.initHiddenObjectIcon(ResourceManager.IMAGE_AFTERNOONTEA_HEDGEHOG_ICON);
    hiddenObjectsIcons[1] = this.initHiddenObjectIcon(ResourceManager.IMAGE_AFTERNOONTEA_CANDLESTICK_ICON);
    hiddenObjectsIcons[2] = this.initHiddenObjectIcon(ResourceManager.IMAGE_AFTERNOONTEA_PLATE1_ICON);
    hiddenObjectsIcons[3] = this.initHiddenObjectIcon(ResourceManager.IMAGE_AFTERNOONTEA_MUG1_ICON);
    hiddenObjectsIcons[4] = this.initHiddenObjectIcon(ResourceManager.IMAGE_AFTERNOONTEA_BUTTER_ICON);
    hiddenObjectsIcons[5] = this.initHiddenObjectIcon(ResourceManager.IMAGE_AFTERNOONTEA_KNIFE_ICON);
    hiddenObjectsIcons[6] = this.initHiddenObjectIcon(ResourceManager.IMAGE_AFTERNOONTEA_SUGAR_ICON);
    hiddenObjectsIcons[7] = this.initHiddenObjectIcon(ResourceManager.IMAGE_AFTERNOONTEA_TEAPOT_ICON);
    hiddenObjectsIcons[8] = this.initHiddenObjectIcon(ResourceManager.IMAGE_AFTERNOONTEA_BISCUITS_ICON);
    hiddenObjectsIcons[9] = this.initHiddenObjectIcon(ResourceManager.IMAGE_AFTERNOONTEA_CLOCK1_ICON);
    hiddenObjectsIcons[10] = this.initHiddenObjectIcon(ResourceManager.IMAGE_AFTERNOONTEA_PLATE2_ICON);
    hiddenObjectsIcons[11] = this.initHiddenObjectIcon(ResourceManager.IMAGE_AFTERNOONTEA_MUG2_ICON);
    hiddenObjectsIcons[12] = this.initHiddenObjectIcon(ResourceManager.IMAGE_AFTERNOONTEA_PLATE3_ICON);
    hiddenObjectsIcons[13] = this.initHiddenObjectIcon(ResourceManager.IMAGE_AFTERNOONTEA_MUG3_ICON);
    hiddenObjectsIcons[14] = this.initHiddenObjectIcon(ResourceManager.IMAGE_AFTERNOONTEA_MUG4_ICON);
    hiddenObjectsIcons[15] = this.initHiddenObjectIcon(ResourceManager.IMAGE_AFTERNOONTEA_SHOES_ICON);
    hiddenObjectsIcons[16] = this.initHiddenObjectIcon(ResourceManager.IMAGE_AFTERNOONTEA_CAN1_ICON);
    hiddenObjectsIcons[17] = this.initHiddenObjectIcon(ResourceManager.IMAGE_AFTERNOONTEA_CARD1_ICON);
    hiddenObjectsIcons[18] = this.initHiddenObjectIcon(ResourceManager.IMAGE_AFTERNOONTEA_CARD2_ICON);
    hiddenObjectsIcons[19] = this.initHiddenObjectIcon(ResourceManager.IMAGE_AFTERNOONTEA_CARD3_ICON);
    hiddenObjectsIcons[20] = this.initHiddenObjectIcon(ResourceManager.IMAGE_AFTERNOONTEA_CARD4_ICON);
    hiddenObjectsIcons[21] = this.initHiddenObjectIcon(ResourceManager.IMAGE_AFTERNOONTEA_CARD5_ICON);
    hiddenObjectsIcons[22] = this.initHiddenObjectIcon(ResourceManager.IMAGE_AFTERNOONTEA_CARD6_ICON);
    hiddenObjectsIcons[23] = this.initHiddenObjectIcon(ResourceManager.IMAGE_AFTERNOONTEA_CARD7_ICON);
    hiddenObjectsIcons[24] = this.initHiddenObjectIcon(ResourceManager.IMAGE_AFTERNOONTEA_CARD8_ICON);
    hiddenObjectsIcons[25] = this.initHiddenObjectIcon(ResourceManager.IMAGE_AFTERNOONTEA_CARD9_ICON);
    hiddenObjectsIcons[26] = this.initHiddenObjectIcon(ResourceManager.IMAGE_AFTERNOONTEA_CARD10_ICON);
    hiddenObjectsIcons[27] = this.initHiddenObjectIcon(ResourceManager.IMAGE_AFTERNOONTEA_HAT_ICON);
    hiddenObjectsIcons[28] = this.initHiddenObjectIcon(ResourceManager.IMAGE_AFTERNOONTEA_PIE_ICON);
    hiddenObjectsIcons[29] = this.initHiddenObjectIcon(ResourceManager.IMAGE_AFTERNOONTEA_CUBE1_ICON);
    hiddenObjectsIcons[30] = this.initHiddenObjectIcon(ResourceManager.IMAGE_AFTERNOONTEA_CUBE2_ICON);
    hiddenObjectsIcons[31] = this.initHiddenObjectIcon(ResourceManager.IMAGE_AFTERNOONTEA_CUBE3_ICON);
    hiddenObjectsIcons[32] = this.initHiddenObjectIcon(ResourceManager.IMAGE_AFTERNOONTEA_BOOKS_ICON);
    hiddenObjectsIcons[33] = this.initHiddenObjectIcon(ResourceManager.IMAGE_AFTERNOONTEA_STRAWBERRY_ICON);
    hiddenObjectsIcons[34] = this.initHiddenObjectIcon(ResourceManager.IMAGE_AFTERNOONTEA_CHESS1_ICON);
    hiddenObjectsIcons[35] = this.initHiddenObjectIcon(ResourceManager.IMAGE_AFTERNOONTEA_CHESS2_ICON);
    hiddenObjectsIcons[36] = this.initHiddenObjectIcon(ResourceManager.IMAGE_AFTERNOONTEA_CHESS3_ICON);
    hiddenObjectsIcons[37] = this.initHiddenObjectIcon(ResourceManager.IMAGE_AFTERNOONTEA_CHESS4_ICON);
    hiddenObjectsIcons[38] = this.initHiddenObjectIcon(ResourceManager.IMAGE_AFTERNOONTEA_CHESS5_ICON);
    hiddenObjectsIcons[39] = this.initHiddenObjectIcon(ResourceManager.IMAGE_AFTERNOONTEA_DRINKME1_ICON);
    hiddenObjectsIcons[40] = this.initHiddenObjectIcon(ResourceManager.IMAGE_AFTERNOONTEA_DRINKME2_ICON);
    hiddenObjectsIcons[41] = this.initHiddenObjectIcon(ResourceManager.IMAGE_AFTERNOONTEA_DRINKME3_ICON);
    hiddenObjectsIcons[42] = this.initHiddenObjectIcon(ResourceManager.IMAGE_AFTERNOONTEA_SHELL_ICON);
    hiddenObjectsIcons[43] = this.initHiddenObjectIcon(ResourceManager.IMAGE_AFTERNOONTEA_MUSHROOM_ICON);
    hiddenObjectsIcons[44] = this.initHiddenObjectIcon(ResourceManager.IMAGE_AFTERNOONTEA_KEY_ICON);
    hiddenObjectsIcons[45] = this.initHiddenObjectIcon(ResourceManager.IMAGE_AFTERNOONTEA_BISCUIT1_ICON);
    hiddenObjectsIcons[46] = this.initHiddenObjectIcon(ResourceManager.IMAGE_AFTERNOONTEA_BISCUIT2_ICON);
    hiddenObjectsIcons[47] = this.initHiddenObjectIcon(ResourceManager.IMAGE_AFTERNOONTEA_CLOCK2_ICON);
    hiddenObjectsIcons[48] = this.initHiddenObjectIcon(ResourceManager.IMAGE_AFTERNOONTEA_CLOCK3_ICON);
    hiddenObjectsIcons[49] = this.initHiddenObjectIcon(ResourceManager.IMAGE_AFTERNOONTEA_BUTTERFLY_ICON);
    hiddenObjectsIcons[50] = this.initHiddenObjectIcon(ResourceManager.IMAGE_AFTERNOONTEA_CAT_ICON);
    hiddenObjectsIcons[51] = this.initHiddenObjectIcon(ResourceManager.IMAGE_AFTERNOONTEA_DAISY1_ICON);
    hiddenObjectsIcons[52] = this.initHiddenObjectIcon(ResourceManager.IMAGE_AFTERNOONTEA_FLAMINGO_ICON);
    hiddenObjectsIcons[53] = this.initHiddenObjectIcon(ResourceManager.IMAGE_AFTERNOONTEA_BISCUIT3_ICON);
    hiddenObjectsIcons[54] = this.initHiddenObjectIcon(ResourceManager.IMAGE_AFTERNOONTEA_BISCUIT4_ICON);
  }

  initializeHiddenObjects() {
    const hiddenObjects = new Array(55);
    this.hiddenObjectsGameData.hiddenObjects = hiddenObjects;
    hiddenObjects[0] = this.initHiddenObject(137, 78, ResourceManager.IMAGE_AFTERNOONTEA_HEDGEHOG);
    hiddenObjects[1] = this.initHiddenObject(345, 178, ResourceManager.IMAGE_AFTERNOONTEA_CANDLESTICK);
    hiddenObjects[2] = this.initHiddenObject(128, 174, ResourceManager.IMAGE_AFTERNOONTEA_PLATE1);
    hiddenObjects[3] = this.initHiddenObject(129, 154, ResourceManager.IMAGE_AFTERNOONTEA_MUG1);
    hiddenObjects[4] = this.initHiddenObject(225, 209, ResourceManager.IMAGE_AFTERNOONTEA_BUTTER);
    hiddenObjects[5] = this.initHiddenObject(256, 217, ResourceManager.IMAGE_AFTERNOONTEA_KNIFE);
    hiddenObjects[6] = this.initHiddenObject(414, 256, ResourceManager.IMAGE_AFTERNOONTEA_SUGAR);
    hiddenObjects[7] = this.initHiddenObject(311, 231, ResourceManager.IMAGE_AFTERNOONTEA_TEAPOT);
    hiddenObjects[8] = this.initHiddenObject(293, 193, ResourceManager.IMAGE_AFTERNOONTEA_BISCUITS);
    hiddenObjects[9] = this.initHiddenObject(449, 281, ResourceManager.IMAGE_AFTERNOONTEA_CLOCK1);
    hiddenObjects[10] = this.initHiddenObject(539, 306, ResourceManager.IMAGE_AFTERNOONTEA_PLATE2);
    hiddenObjects[11] = this.initHiddenObject(539, 289, ResourceManager.IMAGE_AFTERNOONTEA_MUG2);
    hiddenObjects[12] = this.initHiddenObject(360, 277, ResourceManager.IMAGE_AFTERNOONTEA_PLATE3);
    hiddenObjects[13] = this.initHiddenObject(364, 266, ResourceManager.IMAGE_AFTERNOONTEA_MUG3);
    hiddenObjects[14] = this.initHiddenObject(201, 159, ResourceManager.IMAGE_AFTERNOONTEA_MUG4);
    hiddenObjects[15] = this.initHiddenObject(106, 468, ResourceManager.IMAGE_AFTERNOONTEA_SHOES);
    hiddenObjects[16] = this.initHiddenObject(435, 462, ResourceManager.IMAGE_AFTERNOONTEA_CAN1);
    hiddenObjects[17] = this.initHiddenObject(427, 501, ResourceManager.IMAGE_AFTERNOONTEA_CARD1);
    hiddenObjects[18] = this.initHiddenObject(143, 208, ResourceManager.IMAGE_AFTERNOONTEA_CARD2);
    hiddenObjects[19] = this.initHiddenObject(298, 437, ResourceManager.IMAGE_AFTERNOONTEA_CARD3);
    hiddenObjects[20] = this.initHiddenObject(491, 266, ResourceManager.IMAGE_AFTERNOONTEA_CARD4);
    hiddenObjects[21] = this.initHiddenObject(587, 474, ResourceManager.IMAGE_AFTERNOONTEA_CARD5);
    hiddenObjects[22] = this.initHiddenObject(521, 176, ResourceManager.IMAGE_AFTERNOONTEA_CARD6);
    hiddenObjects[23] = this.initHiddenObject(289, 123, ResourceManager.IMAGE_AFTERNOONTEA_CARD7);
    hiddenObjects[24] = this.initHiddenObject(88, 351, ResourceManager.IMAGE_AFTERNOONTEA_CARD8);
    hiddenObjects[25] = this.initHiddenObject(325, 277, ResourceManager.IMAGE_AFTERNOONTEA_CARD9);
    hiddenObjects[26] = this.initHiddenObject(735, 248, ResourceManager.IMAGE_AFTERNOONTEA_CARD10);
    hiddenObjects[27] = this.initHiddenObject(206, 10, ResourceManager.IMAGE_AFTERNOONTEA_HAT);
    hiddenObjects[28] = this.initHiddenObject(41, 424, ResourceManager.IMAGE_AFTERNOONTEA_PIE);
    hiddenObjects[29] = this.initHiddenObject(45, 140, ResourceManager.IMAGE_AFTERNOONTEA_CUBE1);
    hiddenObjects[30] = this.initHiddenObject(496, 304, ResourceManager.IMAGE_AFTERNOONTEA_CUBE2);
    hiddenObjects[31] = this.initHiddenObject(746, 308, ResourceManager.IMAGE_AFTERNOONTEA_CUBE3);
    hiddenObjects[32] = this.initHiddenObject(526, 195, ResourceManager.IMAGE_AFTERNOONTEA_BOOKS);
    hiddenObjects[33] = this.initHiddenObject(6, 295, ResourceManager.IMAGE_AFTERNOONTEA_STRAWBERRY);
    hiddenObjects[34] = this.initHiddenObject(364, 461, ResourceManager.IMAGE_AFTERNOONTEA_CHESS1);
    hiddenObjects[35] = this.initHiddenObject(280, 33, ResourceManager.IMAGE_AFTERNOONTEA_CHESS2);
    hiddenObjects[36] = this.initHiddenObject(690, 291, ResourceManager.IMAGE_AFTERNOONTEA_CHESS3);
    hiddenObjects[37] = this.initHiddenObject(54, 331, ResourceManager.IMAGE_AFTERNOONTEA_CHESS4);
    hiddenObjects[38] = this.initHiddenObject(756, 469, ResourceManager.IMAGE_AFTERNOONTEA_CHESS5);
    hiddenObjects[39] = this.initHiddenObject(82, 101, ResourceManager.IMAGE_AFTERNOONTEA_DRINKME1);
    hiddenObjects[40] = this.initHiddenObject(143, 22, ResourceManager.IMAGE_AFTERNOONTEA_DRINKME2);
    hiddenObjects[41] = this.initHiddenObject(60, 371, ResourceManager.IMAGE_AFTERNOONTEA_DRINKME3);
    hiddenObjects[42] = this.initHiddenObject(355, 98, ResourceManager.IMAGE_AFTERNOONTEA_SHELL);
    hiddenObjects[43] = this.initHiddenObject(116, 386, ResourceManager.IMAGE_AFTERNOONTEA_MUSHROOM);
    hiddenObjects[44] = this.initHiddenObject(601, 170, ResourceManager.IMAGE_AFTERNOONTEA_KEY);
    hiddenObjects[45] = this.initHiddenObject(700, 30,
        ResourceManager.IMAGE_AFTERNOONTEA_BISCUIT1);
    hiddenObjects[46] = this.initHiddenObject(184, 207, ResourceManager.IMAGE_AFTERNOONTEA_BISCUIT2);
    hiddenObjects[47] = this.initHiddenObject(301, 66, ResourceManager.IMAGE_AFTERNOONTEA_CLOCK2);
    hiddenObjects[48] = this.initHiddenObject(443, 161, ResourceManager.IMAGE_AFTERNOONTEA_CLOCK3);
    hiddenObjects[49] = this.initHiddenObject(417, 134, ResourceManager.IMAGE_AFTERNOONTEA_BUTTERFLY);
    hiddenObjects[50] = this.initHiddenObject(15, 164, ResourceManager.IMAGE_AFTERNOONTEA_CAT);
    hiddenObjects[51] = this.initHiddenObject(243, 94, ResourceManager.IMAGE_AFTERNOONTEA_DAISY1);
    hiddenObjects[52] = this.initHiddenObject(657, 216, ResourceManager.IMAGE_AFTERNOONTEA_FLAMINGO);
    hiddenObjects[53] = this.initHiddenObject(360, 44, ResourceManager.IMAGE_AFTERNOONTEA_BISCUIT3);
    hiddenObjects[54] = this.initHiddenObject(387, 230, ResourceManager.IMAGE_AFTERNOONTEA_BISCUIT4);
  }

  get afternoonTeaView() {
    return this.baseGameView;
  }

}
