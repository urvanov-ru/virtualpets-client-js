export default class HiddenObjectsGameData {
  static get ORIGINAL_INTERFACE_OBJECT_X() { return 97; }
  static get ORIGINAL_INTERFACE_OBJECT_Y() { return 600 - 85; }
  static get ORIGINAL_HIDE_INTERFACE_BUTTON_X() { return 379; }
  static get ORIGINAL_HIDE_INTERFACE_BUTTON_Y() { return 511; }
  static get ORIGINAL_SHOW_INTERFACE_BUTTON_X() { return 377; }
  static get ORIGINAL_SHOW_INTERFACE_BUTTON_Y() { return 600 - 34; }
  static get ORIGINAL_MESSAGE_BOX_X() { return 40; }
  static get ORIGINAL_MESSAGE_BOX_Y() { return 115; }
  static get ORIGINAL_MESSAGE_BOX_BUTTON_X() { return 328; }
  static get ORIGINAL_MESSAGE_BOX_BUTTON_Y() { return 313; }

  static get ORIGINAL_FOOD_REWARD_X() { return 249; }
  static get ORIGINAL_FOOD_REWARD_Y() { return 120; }
  static get ORIGINAL_CLOTH_REWARD_X() { return 400; }
  static get ORIGINAL_CLOTH_REWARD_Y() { return 120; }

  static get ORIGINAL_OBJECT_FOR_SEARCH_X() { return 265; }
  static get ORIGINAL_OBJECT_FOR_SEARCH_Y() { return 532; }
  static get ORIGINAL_OBJECT_FOR_SEARCH_STEP() { return 69; }

  static get ORIGINAL_PLAYER_ICON_1_X() { return 112; }
  static get ORIGINAL_PLAYER_ICON_1_Y() { return 535; }
  static get ORIGINAL_PLAYER_ICON_2_X() { return 187; }
  static get ORIGINAL_PLAYER_ICON_2_Y() { return 535; }
  static get ORIGINAL_PLAYER_ICON_3_X() { return 555; }
  static get ORIGINAL_PLAYER_ICON_3_Y() { return 535; }
  static get ORIGINAL_PLAYER_ICON_4_X() { return 628; }
  static get ORIGINAL_PLAYER_ICON_4_Y() { return 535; }

  static get ORIGINAL_SECONDS_LEFT_X() { return 750; }
  static get ORIGINAL_SECONDS_LEFT_Y() { return 10; }

  static get INTERFACE_OBJECT_MOVE_STEP() { return 10; }
  static get MESSAGE_BOX_MOVE_STEP() { return 30; }

  background = null;

  interfaceObject = null;
  hideInterfaceButton = null;
  showInterfaceButton = null;
  messageBox = null;
  messageBoxButton = null;
  hiddenObjects = null;
  hiddenObjectsIcons = null;
  visibleObjectsIcons = null;
  foodIcons = null;
  drinkIcons = null;
  pets = null;
  clothObjects = {}; // new HashMap<Integer, ClothGameObject>();
  bookObjects = {}; // new HashMap<Integer, BookGameObject>();

  static get MAX_PLAYERS_COUNT() { return 4; }
  static get ICON_HEIGHT() { return 57; }
  static get ICON_WIDTH() { return 57; }
  static get ORIGINAL_CLOCK_LABEL_X() { return 750; }
  static get ORIGINAL_CLOCK_LABEL_Y() { return 10; }

  interfaceVisible = true;
  hiddenObjectsGame = null;
    
  waitingPlayerNameLabels = null;
    
  clockLabel = null;
  
  static get SITUATION_SHOW_INTRO() { return "show_intro"; }
  static get SITUATION_COLLECT_PLAYERS() { return "collect_players"; }
  static get SITUATION_HOW_TO_PLAY_MESSAGE() { return "how_to_play_message"; }
  static get SITUATION_GAME() { return "game"; }
  static get SITUATION_GAME_OVER() { return "game_over"; }

  situation = HiddenObjectsGameData.SITUATION_SHOW_INTRO;

  messageBoxStrings = [];

  messageSource = null;
  trayIcon = null;
  waitingPlayers1Message = null;
  waitingPlayers2Message = null;

  secondsLeftX = 0;
  secondsLeftY = 0;
  secondsLeftString = "";
}
