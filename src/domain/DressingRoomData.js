
export default class DressingRoomData {

  static get ORIGINAL_ARROW_LEFT_X() { return 10; }
  static get ORIGINAL_ARROW_LEFT_Y() { return 400; }
  static get OBJECT_NORMAL() { return 0; }
  static get OBJECT_HIGHLIGHT() { return 1; }
  static get ORIGINAL_PET_X() { return 360; }

  static get ORIGINAL_PET_Y() { return 400; }
  static get ORIGINAL_HAT_ICON_X() { return 30; }
  static get ORIGINAL_HAT_ICON_Y() { return 0; }
  static get ORIGINAL_CLOTH_ICON_X() { return 267; }
  static get ORIGINAL_CLOTH_ICON_Y() { return 0; }
  static get ORIGINAL_BOW_ICON_X() { return 528; }
  static get ORIGINAL_BOW_ICON_Y() { return 0; }
  static get ORIGINAL_MESSAGE_BOX_X() { return 34; }
  static get ORIGINAL_MESSAGE_BOX_Y() { return 139; }
  static get ORIGINAL_MESSAGE_BOX_BUTTON_X() { return 340; }
  static get ORIGINAL_MESSAGE_BOX_BUTTON_Y() { return 369; }
  static get MESSAGE_BOX_MOVE_STEP() { return 30; }
  static get MENU_ITEM_HEIGHT() { return 150; }

  static get MENU_TYPE_HAT() { return "hat"; }
  static get MENU_TYPE_CLOTH() { return "cloth"; }
  static get MENU_TYPE_BOW() { return "bow"; }

  background = null;
  arrowLeft = null;
  pet = null;
  hats = [];
  cloths = [];
  bows = [];
  menuItems = [];
  hatIcon = null;
  clothIcon = null;
  bowIcon = null;
  messageBox = null;
  messageBoxButton = null;
  menuClothGameObjects = {};
  clothGameObjects = {};
  okString = null;
  messageBoxStrings = null;
};



