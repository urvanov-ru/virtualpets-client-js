import BoxGameObject from './BoxGameObject.js';

export default class RoomData {
  static get ORIGINAL_TILES_START_Y() { return 375; }
  static get REFRIGERATOR_MAX_LEVEL() { return 6; }
  static get BOOKCASE_MAX_LEVEL() { return 6; }
  static get ORIGINAL_REFRIGERATOR_X() { return 0; }
  static get ORIGINAL_REFRIGERATOR_Y() { return 150; }
  static get ORIGINAL_TV_X() { return 291; }
  static get ORIGINAL_TV_Y() { return 162; }
  static get ORIGINAL_BEDSIDETABLE_X() { return 276; }
  static get ORIGINAL_BEDSIDETABLE_Y() { return 246; }
  static get ORIGINAL_BOOKCASE_X() { return 450; }
  static get ORIGINAL_BOOKCASE_Y() { return 225; }
  static get ORIGINAL_FLOWER_X() { return 193; }
  static get ORIGINAL_FLOWER_Y() { return 169; }
  static get ORIGINAL_PET_X() { return 375; }
  static get ORIGINAL_PET_Y() { return 375; }
  static get ORIGINAL_PET_Z() { return PetGameObject.TILE_Z_STEP * ((ORIGINAL_PET_Y  + 150)); } 
  static get ORIGINAL_FOOD_X() { return 340; }
  static get ORIGINAL_FOOD_Y() { return 400; }
  static get ORIGINAL_WATER_X() { return 0; }
  static get ORIGINAL_WATER_Y() { return 316; }
  static get ORIGINAL_ARROW_RIGHT_X() { return 648; }
  static get ORIGINAL_ARROW_RIGHT_Y() { return 420; }
  static get ORIGINAL_BOOK_1_X() { return 370; }
  static get ORIGINAL_BOOK_1_Y() { return 400; }
  static get ORIGINAL_BOX_0_X() { return 150; }
  static get ORIGINAL_BOX_0_Y() { return 375; }
  static get ORIGINAL_BOX_1_X() { return 300; }
  static get ORIGINAL_BOX_1_Y() { return 450; }
  static get ORIGINAL_BOX_2_X() { return 450; }
  static get ORIGINAL_BOX_2_Y() { return 375; }

  static get FOOD_CARROT() { return 0; }
  static get FOOD_DRY_FOOD() { return 1; }
  static get FOOD_FISH() { return 2; }
  static get FOOD_ICE_CREAM() { return 3; }
  static get FOOD_APPLE() { return 4; }
  static get FOOD_CABBAGE() { return 5; }
  static get FOOD_CHOCOLATE() { return 6; }
  static get FOOD_FRENCH_FRIES() { return 7; }
  static get FOOD_JAPANESE_ROLL() { return 8; }
  static get FOOD_PIE() { return 9; }
  static get FOOD_POTATOES() { return 10; }
  static get FOOD_SANDWICH() { return 11; }
  static get FOOD_BANANA() { return 12; }
  static get FOOD_WATERMELON() { return 13; }

  static get DRINK_WATER() { return 14; }
  static get DRINK_MILK() { return 15; }
  static get DRINK_BOTTLE() { return 16; }
  static get DRINK_TEA() { return 17; }
  static get DRINK_COFFEE() { return 18; }
  static get DRINK_ORANGE_JUICE() { return 19; }


  static get BOOK_DESTINY_STATE() { return 0; }
  static get BOOK_SQL_STATE() { return 1; }
  static get BOOK_PURPLE_STATE() { return 2; }
  static get BOOK_PLAID_STATE() { return 3; }
  static get BOOK_PUSHKIN_STATE() { return 4; }
  static get BOOK_BLACK_STATE() { return 5; }
  static get BOOK_WHITE_STATE() { return 6; }
  static get BOOK_DIRTY_STATE() { return 7; }
  static get BOOK_EARTH_STATE() { return 8; }
  static get BOOK_MOON_AND_STAR_STATE() { return 9; }
  static get BOOK_GIRL_STATE() { return 10; }
  static get BOOK_SUNSET_STATE() { return 11; }
  static get BOOK_SAGA_STATE() { return 12; }
  static get BOOK_NONAME_STATE() { return 13; }
  static get BOOK_CATS_STATE() { return 14; }
  static get BOOK_GOLD_TITLE_STATE() { return 15; }
  static get BOOK_DARK_STATE() { return 16; }
  static get BOOK_SCHEME_STATE() { return 17; }


  static get ORIGINAL_REFRIGERATOR_INNER_X() { return 250; }
  static get ORIGINAL_REFRIGERATOR_INNER_OBJECT_X() { return 250; }
  static get ORIGINAL_REFRIGERATOR_INNER_OBJECT_Y() { return 18; }
  static get ORIGINAL_REFRIGERATOR_INNER_OBJECT_STEP_X() { return 100; }
  static get ORIGINAL_REFRIGERATOR_INNER_OBJECT_STEP_Y() { return 100; }

  static get ORIGINAL_REFRIGERATOR_CLOSE_X() { return 500; }
  static get ORIGINAL_REFRIGERATOR_CLOSE_Y() { return 12; }

  static get BUILD_MENU_ITEM_COUNT() { return 3; }

  static get BOXES_COUNT() { return 3; }

  static get BUILD_MENU_REFRIGERATOR() { return 0; }
  static get BUILD_MENU_MACHINE_WITH_DRINKS() { return 1; }
  static get BUILD_MENU_BOOKCASE() { return 2; }

    
  static get ORIGINAL_REFRIGERATOR_WIDTH() { return 150; }
  static get ORIGINAL_REFRIGERATOR_HEIGHT() { return 225; }
  static get ORIGINAL_BOOKCASE_WIDTH() { return 150; }
  static get ORIGINAL_BOOKCASE_HEIGHT() { return 225; }
  static get ORIGINAL_DRINK_HEIGHT() { return 150; }
  static get ORIGINAL_DRINK_WIDTH() { return 225; }
    
  static get ORIGINAL_BOOKCASE_INNER_X() { return 250; }
  static get ORIGINAL_BOOKCASE_INNER_OBJECT_X() { return 250; }
  static get ORIGINAL_BOOKCASE_INNER_OBJECT_Y() { return 18; }
  static get ORIGINAL_BOOKCASE_INNER_OBJECT_STEP_X() { return 100; }
  static get ORIGINAL_BOOKCASE_INNER_OBJECT_STEP_Y() { return 100; }

  static get ORIGINAL_BOOKCASE_CLOSE_X() { return 550; }
  static get ORIGINAL_BOOKCASE_CLOSE_Y() { return 12; }
  static get MAX_BOOKS_COUNT() { return 18; }
  static get MACHINE_WITH_DRINKS_MAX_LEVEL() { return 6; }
    
  static get ORIGINAL_MACHINE_WITH_DRINKS_INNER_X() { return 250; }
  static get ORIGINAL_MACHINE_WITH_DRINKS_INNER_Y() { return 0; }
  static get ORIGINAL_MACHINE_WITH_DRINKS_INNER_OBJECT_X() { return 250; }
  static get ORIGINAL_MACHINE_WITH_DRINKS_INNER_OBJECT_Y() { return 18; }
  static get ORIGINAL_MACHINE_WITH_DRINKS_INNER_OBJECT_STEP_X() { return 100; }
  static get ORIGINAL_MACHINE_WITH_DRINKS_INNER_OBJECT_STEP_Y() { return 100; }
    
  static get ORIGINAL_MACHINE_WITH_DRINKS_CLOSE_X() { return 550; }
  static get ORIGINAL_MACHINE_WITH_DRINKS_CLOSE_Y() { return 12; }
    
  static get ORIGINAL_JOURNAL_ON_FLOOR_X() { return 300; }
  static get ORIGINAL_JOURNAL_ON_FLOOR_Y() { return 375; }
    
    
    
  static get SITUATION_NORMAL() { return "normal"; }
  static get SITUATION_SELECT_REFRIGERATOR_POSITION() { return "select_refrigerator_position"; }
  static get SITUATION_BUILDING_REFRIGERATOR() { return "building_refrigerator"; }
  static get SITUATION_MOVE_REFRIGERATOR() { return "move_refrigerator"; }
  static get SITUATION_UPGRADING_REFRIGERATOR() { return "upgrading_refrigerator"; }
  static get SITUATION_SELECT_BOOKCASE_POSITION() { return "select_bookcase_position"; }
  static get SITUATION_BUILDING_BOOKCASE() { return "building_bookscase"; }
  static get SITUATION_MOVE_BOOKCASE() { return "move_bookcase"; }
  static get SITUATION_MOVE_DRINK() { return "move_drink"; }
  static get SITUATION_SELECT_DRINK_POSITION() { return "select_drink_position"; }
  static get SITUATION_BUILDING_DRINK() { return "building_drink"; }
  static get SITUATION_ANIMATION() { return "animation"; }
  static get SITUATION_UPGRADE_REFRIGERATOR_COST() { return "upgrade_refrigerator_cost"; }
  static get SITUATION_UPGRADE_BOOKCASE_COST() { return "upgrade_bookcase_cost"; }
  static get SITUATION_UPGRADE_MACHINE_WITH_DRINKS() { return "upgrade_machine_with_drinks"; }
  static get SITUATION_UPGRADE_MACHINE_WITH_DRINKS_COST() { return "upgrade_machine_with_drinks_cost"; } 
  static get SITUATION_COLLECTING_JOURNAL() { return "collecting_journal"; }
  
    
  situation = RoomData.SITUATION_NORMAL;
  petInfo; // GetRoomInfoResult 
  clothObjects = {}; //new HashMap<Integer, ClothGameObject>();

  background = null;
  refrigerator = null;
  refrigerators = null; // []
  refrigeratorId = null;
  flower = null;
  bedsidetable = null;
  tv = null;
  bookcaseId = null;
  bookcase = null;
  bookcases = null; // []
  pet = null;
  food = null;
  refrigeratorInnerObjects = null; // Map
  refrigeratorInnerObjectLabels = null; // Map
  refrigeratorInnerCounts = null // [];
  refrigeratorInnerCountsInitialized = false;
  refrigeratorClose = null;
  machineWithDrinksId = null;
  machineWithDrinks = null;
  machineWithDrinksArray = null; // []
    
  machineWithDrinksInnerObjects = null; // Map
  machineWithDrinksInnerObjectLabels = null; // Map
  machineWithDrinksInnerCounts = null; // Map
  machineWithDrinksInnerCountsInitialized = false;
  machineWithDrinksClose = null;
  machineWithDrinksInner = null;
  machineWithDrinksInnerItems = null; // Map
    
  arrowRight = null;
  refrigeratorInner = null;
  refrigeratorInnerItems = null; // []
    
  boxes = null; // BoxGameObject[]

  book = null;

  buildMenuCosts = null;
    
  satietyLabel = null;
  drinkLabel = null;
  educationLabel = null;
  moodLabel = null;
  satietyProgressBar = null;
  drinkProgressBar = null;
  educationProgressBar = null;
  moodProgressBar = null;
    
  refrigeratorPopupMenu = null;
  progressBar = null;
  progressBarOverListener = null;
    
  bookcasePopupMenu = null;
  machineWithDrinksPopupMenu = null;
    
  bookcaseInnerItems = null; // []
  bookcaseInner = null;
  bookcaseInnerObjects = null; // []
  bookcaseClose = null;
    
  bookcaseInnerBooks = null; // []
  bookcaseInnerBooksInitialized = false;
    
  journalOnFloor = null;
    
  loading = null;
}

