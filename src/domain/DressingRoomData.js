
export default class DressingRoomData {

  ORIGINAL_ARROW_LEFT_X() { return 10; }
  ORIGINAL_ARROW_LEFT_Y() { return 400; }
  OBJECT_NORMAL() { return 0; }
  OBJECT_HIGHLIGHT() { return 1; }
  ORIGINAL_PET_X() { return 360; }

  ORIGINAL_PET_Y() { return 400; }
  ORIGINAL_HAT_ICON_X() { return 30; }
  ORIGINAL_HAT_ICON_Y() { return 0; }
  ORIGINAL_CLOTH_ICON_X() { return 267; }
  ORIGINAL_CLOTH_ICON_Y() { return 0; }
  ORIGINAL_BOW_ICON_X() { return 528; }
  ORIGINAL_BOW_ICON_Y() { return 0; }
  ORIGINAL_MESSAGE_BOX_X() { return 34; }
  ORIGINAL_MESSAGE_BOX_Y() { return 139; }
  ORIGINAL_MESSAGE_BOX_BUTTON_X() { return 340; }
  ORIGINAL_MESSAGE_BOX_BUTTON_Y() { return 369; }
  MESSAGE_BOX_MOVE_STEP() { return 30; }
  MENU_ITEM_HEIGHT() { return 150; }

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



