import ProgressInfo from './ProgressInfo.js';
import ResourceManager from './ResourceManager.js';

export default class BaseGameLoadWorker {

  resourceManager;
  scale = 0.0;
  maxIndex = 0;
  petType;
  currentIndex = 0;
  resourcesPath = "";

  constructor(resourceManager, scale, petType) {
    this.resourceManager = resourceManager;
    this.scale = scale;
    this.petType = petType;
  }

  doInBackground() {
    loadResourcesInBackground();
    if (getCurrentIndex() !== getMaxIndex()) {
      throw "MaxIndex should be equal to "
          + getCurrentIndex() + ". But now MaxIndex is "
          + getMaxIndex();
    }
    return null;
  }

  loadResourcesInBackground() {
	  throw "Child classes should implement loadResourcesInBackground method.";
  }

  loadFoodIcons() {
    this.loadImageWithScale(this.resourcesPath + "data/images/food/carrot1.png",
        ResourceManager.IMAGE_CARROT_1);

    this.loadImageWithScale(this.resourcesPath + "data/images/food/dryfood1.png",
        ResourceManager.IMAGE_DRY_FOOD_1);

    this.loadImageWithScale(this.resourcesPath + "data/images/food/fish1.png",
        ResourceManager.IMAGE_FISH_1);

    this.loadImageWithScale(this.resourcesPath + "data/images/food/icecream1.png",
        ResourceManager.IMAGE_ICE_CREAM_1);

    this.loadImageWithScale(this.resourcesPath + "data/images/food/apple1.png",
        ResourceManager.IMAGE_APPLE_1);

    this.loadImageWithScale(this.resourcesPath + "data/images/food/cabbage1.png",
        ResourceManager.IMAGE_CABBAGE_1);

    this.loadImageWithScale(this.resourcesPath + "data/images/food/chocolate1.png",
        ResourceManager.IMAGE_CHOCOLATE_1);

    this.loadImageWithScale(this.resourcesPath + "data/images/food/frenchfries1.png",
        ResourceManager.IMAGE_FRENCH_FRIES_1);

    this.loadImageWithScale(
        this.resourcesPath + "data/images/food/japaneseroll1.png",
        ResourceManager.IMAGE_JAPANESE_ROLLS_1);

    this.loadImageWithScale(this.resourcesPath + "data/images/food/pie1.png",
        ResourceManager.IMAGE_PIE_1);

    this.loadImageWithScale(this.resourcesPath + "data/images/food/potatoes1.png",
        ResourceManager.IMAGE_POTATOES_1);

    this.loadImageWithScale(this.resourcesPath + "data/images/food/sandwich1.png",
        ResourceManager.IMAGE_SANDWICH_1);
    
    this.loadImageWithScale(this.resourcesPath + "data/images/food/banana1.png",
        ResourceManager.IMAGE_BANANA_1);
    
    this.loadImageWithScale(this.resourcesPath + "data/images/food/watermelon1.png",
        ResourceManager.IMAGE_WATERMELON_1);
  }

  loadCatImages() {
    this.loadImageWithScale(this.resourcesPath + "data/images/cat/cat1.png",
        ResourceManager.IMAGE_CAT_NORMAL_1);
    this.loadImageWithScale(this.resourcesPath + "data/images/cat/cat2.png",
        ResourceManager.IMAGE_CAT_NORMAL_2);
    this.loadImageWithScale(this.resourcesPath + "data/images/cat/cat3.png",
        ResourceManager.IMAGE_CAT_NORMAL_3);

    this.loadImageWithScale(this.resourcesPath + "data/images/cat/eat1.png",
        ResourceManager.IMAGE_CAT_EAT_1);
    this.loadImageWithScale(this.resourcesPath + "data/images/cat/eat2.png",
        ResourceManager.IMAGE_CAT_EAT_2);
    this.loadImageWithScale(this.resourcesPath + "data/images/cat/eat3.png",
        ResourceManager.IMAGE_CAT_EAT_3);
    
    this.loadImageWithScale(this.resourcesPath + "data/images/cat/education1.png",
        ResourceManager.IMAGE_CAT_EDUCATION_1);
    this.loadImageWithScale(this.resourcesPath + "data/images/cat/education2.png",
        ResourceManager.IMAGE_CAT_EDUCATION_2);
    this.loadImageWithScale(this.resourcesPath + "data/images/cat/education3.png",
        ResourceManager.IMAGE_CAT_EDUCATION_3);
    this.loadImageWithScale(this.resourcesPath + "data/images/cat/education4.png",
        ResourceManager.IMAGE_CAT_EDUCATION_4);
    this.loadImageWithScale(this.resourcesPath + "data/images/cat/education5.png",
        ResourceManager.IMAGE_CAT_EDUCATION_5);

    this.loadImageWithScale(this.resourcesPath + "data/images/cat/hat1.png",
        ResourceManager.IMAGE_CAT_HAT_1);
    this.loadImageWithScale(this.resourcesPath + "data/images/cat/hat2.png",
        ResourceManager.IMAGE_CAT_HAT_2);
    this.loadImageWithScale(this.resourcesPath + "data/images/cat/hat3.png",
        ResourceManager.IMAGE_CAT_HAT_3);
    this.loadImageWithScale(this.resourcesPath + "data/images/cat/cloth1.png",
        ResourceManager.IMAGE_CAT_CLOTH_1);
    this.loadImageWithScale(this.resourcesPath + "data/images/cat/cloth2.png",
        ResourceManager.IMAGE_CAT_CLOTH_2);
    this.loadImageWithScale(this.resourcesPath + "data/images/cat/cloth3.png",
        ResourceManager.IMAGE_CAT_CLOTH_3);
    this.loadImageWithScale(this.resourcesPath + "data/images/cat/bow1.png",
        ResourceManager.IMAGE_CAT_BOW_1);
    this.loadImageWithScale(this.resourcesPath + "data/images/cat/bow2.png",
        ResourceManager.IMAGE_CAT_BOW_2);
    this.loadImageWithScale(this.resourcesPath + "data/images/cat/bow3.png",
        ResourceManager.IMAGE_CAT_BOW_3);

  }
  
  loadDrink() {

    this.loadImageWithScale(this.resourcesPath
        + "data/images/drink/water1.png",
        ResourceManager.IMAGE_WATER_1);
    this.loadImageWithScale(this.resourcesPath
        + "data/images/drink/water2.png",
        ResourceManager.IMAGE_WATER_2);
    this.loadImageWithScale(this.resourcesPath
        + "data/images/drink/water3.png",
        ResourceManager.IMAGE_WATER_3);
    this.loadImageWithScale(this.resourcesPath
        + "data/images/drink/water4.png",
        ResourceManager.IMAGE_WATER_4);
    this.loadImageWithScale(this.resourcesPath
        + "data/images/drink/water5.png",
        ResourceManager.IMAGE_WATER_5);
    
    this.loadImageWithScale(this.resourcesPath
        + "data/images/drink/milk1.png",
        ResourceManager.IMAGE_MILK_1);
    this.loadImageWithScale(this.resourcesPath
        + "data/images/drink/milk2.png",
        ResourceManager.IMAGE_MILK_2);
    this.loadImageWithScale(this.resourcesPath
        + "data/images/drink/milk3.png",
        ResourceManager.IMAGE_MILK_3);
    this.loadImageWithScale(this.resourcesPath
        + "data/images/drink/milk4.png",
        ResourceManager.IMAGE_MILK_4);
    this.loadImageWithScale(this.resourcesPath
        + "data/images/drink/milk5.png",
        ResourceManager.IMAGE_MILK_5);
    
    this.loadImageWithScale(this.resourcesPath
        + "data/images/drink/bottle1.png",
        ResourceManager.IMAGE_BOTTLE_1);
    
    this.loadImageWithScale(this.resourcesPath
        + "data/images/drink/tea1.png",
        ResourceManager.IMAGE_TEA_1);
    this.loadImageWithScale(this.resourcesPath
        + "data/images/drink/tea2.png",
        ResourceManager.IMAGE_TEA_2);
    this.loadImageWithScale(this.resourcesPath
        + "data/images/drink/tea3.png",
        ResourceManager.IMAGE_TEA_3);
    
    this.loadImageWithScale(this.resourcesPath
        + "data/images/drink/coffee1.png",
        ResourceManager.IMAGE_COFFEE_1);
    this.loadImageWithScale(this.resourcesPath
        + "data/images/drink/coffee2.png",
        ResourceManager.IMAGE_COFFEE_2);
    this.loadImageWithScale(this.resourcesPath
        + "data/images/drink/coffee3.png",
        ResourceManager.IMAGE_COFFEE_3);

    this.loadImageWithScale(this.resourcesPath
        + "data/images/drink/orangejuice1.png",
        ResourceManager.IMAGE_ORANGE_JUICE_1);
    this.loadImageWithScale(this.resourcesPath
        + "data/images/drink/orangejuice2.png",
        ResourceManager.IMAGE_ORANGE_JUICE_2);
    this.loadImageWithScale(this.resourcesPath
        + "data/images/drink/orangejuice3.png",
        ResourceManager.IMAGE_ORANGE_JUICE_3);
    this.loadImageWithScale(this.resourcesPath
        + "data/images/drink/orangejuice4.png",
        ResourceManager.IMAGE_ORANGE_JUICE_4);
    this.loadImageWithScale(this.resourcesPath
        + "data/images/drink/orangejuice5.png",
        ResourceManager.IMAGE_ORANGE_JUICE_5);
  }
  
  loadBuildMaterials() {
    this.loadImageWithScale(this.resourcesPath + "data/images/buildingmaterials/rucksack.png",
        ResourceManager.IMAGE_RUCKSACK);
    this.loadImageWithScale(this.resourcesPath + "data/images/buildingmaterials/rucksack_hl.png",
        ResourceManager.IMAGE_RUCKSACK_HIGHLIGHT);
    this.loadImageWithScale(this.resourcesPath + "data/images/buildingmaterials/rucksackinner.png",
        ResourceManager.IMAGE_RUCKSACK_INNER);
    this.loadImageWithScale(this.resourcesPath + "data/images/buildingmaterials/close.png",
        ResourceManager.IMAGE_RUCKSACK_CLOSE);
    this.loadImageWithScale(this.resourcesPath + "data/images/buildingmaterials/close_hl.png",
        ResourceManager.IMAGE_RUCKSACK_CLOSE_HIGHLIGHT);
    this.loadImageWithScale(this.resourcesPath + "data/images/buildingmaterials/menuitem.png",
        ResourceManager.IMAGE_BUILDING_MATERIAL_MENU_ITEM);
    this.loadImageWithScale(this.resourcesPath + "data/images/buildingmaterials/timber.png",
        ResourceManager.IMAGE_BUILDING_MATERIAL_TIMBER);
    this.loadImageWithScale(this.resourcesPath + "data/images/buildingmaterials/board.png",
        ResourceManager.IMAGE_BUILDING_MATERIAL_BOARD);
    this.loadImageWithScale(this.resourcesPath + "data/images/buildingmaterials/stone.png",
        ResourceManager.IMAGE_BUILDING_MATERIAL_STONE);
    this.loadImageWithScale(this.resourcesPath + "data/images/buildingmaterials/chip.png",
        ResourceManager.IMAGE_BUILDING_MATERIAL_CHIP);
    this.loadImageWithScale(this.resourcesPath + "data/images/buildingmaterials/wire.png",
        ResourceManager.IMAGE_BUILDING_MATERIAL_WIRE);
    this.loadImageWithScale(this.resourcesPath + "data/images/buildingmaterials/iron.png",
        ResourceManager.IMAGE_BUILDING_MATERIAL_IRON);
    this.loadImageWithScale(this.resourcesPath + "data/images/buildingmaterials/oil.png",
        ResourceManager.IMAGE_BUILDING_MATERIAL_OIL);
    this.loadImageWithScale(this.resourcesPath + "data/images/buildingmaterials/bluecrystal.png",
        ResourceManager.IMAGE_BUILDING_MATERIAL_BLUE_CRYSTAL);
    this.loadImageWithScale(this.resourcesPath + "data/images/buildingmaterials/rubber.png",
        ResourceManager.IMAGE_BUILDING_MATERIAL_RUBBER);
  }
  
  loadJournal() {
    this.loadImageWithScale(this.resourcesPath + "data/images/journal/arrowleft.png",
        ResourceManager.IMAGE_JOURNAL_ARROW_LEFT);
    this.loadImageWithScale(this.resourcesPath + "data/images/journal/arrowleft_hl.png",
        ResourceManager.IMAGE_JOURNAL_ARROW_LEFT_HIGHLIGHT);
    this.loadImageWithScale(this.resourcesPath + "data/images/journal/arrowright.png",
        ResourceManager.IMAGE_JOURNAL_ARROW_RIGHT);
    this.loadImageWithScale(this.resourcesPath + "data/images/journal/arrowright_hl.png",
        ResourceManager.IMAGE_JOURNAL_ARROW_RIGHT_HIGHLIGHT);
    this.loadImageWithScale(this.resourcesPath + "data/images/journal/journal.png",
        ResourceManager.IMAGE_JOURNAL);
    this.loadImageWithScale(this.resourcesPath + "data/images/journal/journal_hl.png",
        ResourceManager.IMAGE_JOURNAL_HIGHLIGHT);
    this.loadImageWithScale(this.resourcesPath + "data/images/journal/journalinner.png",
        ResourceManager.IMAGE_JOURNAL_INNER);
    this.loadImageWithScale(this.resourcesPath + "data/images/journal/loading1.png",
        ResourceManager.IMAGE_JOURNAL_LOADING_1);
    this.loadImageWithScale(this.resourcesPath + "data/images/journal/loading2.png",
        ResourceManager.IMAGE_JOURNAL_LOADING_2);
    this.loadImageWithScale(this.resourcesPath + "data/images/journal/loading3.png",
        ResourceManager.IMAGE_JOURNAL_LOADING_3);
    this.loadImageWithScale(this.resourcesPath + "data/images/journal/loading4.png",
        ResourceManager.IMAGE_JOURNAL_LOADING_4);
    this.loadImageWithScale(this.resourcesPath + "data/images/journal/loading5.png",
        ResourceManager.IMAGE_JOURNAL_LOADING_5);
    this.loadImageWithScale(this.resourcesPath + "data/images/journal/loading6.png",
        ResourceManager.IMAGE_JOURNAL_LOADING_6);
    this.loadImageWithScale(this.resourcesPath + "data/images/journal/loading7.png",
        ResourceManager.IMAGE_JOURNAL_LOADING_7);
    this.loadImageWithScale(this.resourcesPath + "data/images/journal/loading8.png",
        ResourceManager.IMAGE_JOURNAL_LOADING_8);
  }
  
  loadMessageBox() {
    this.loadImageWithScale(this.resourcesPath + "data/images/room/messagebox.png",
        ResourceManager.IMAGE_ROOM_MESSAGE_BOX);
    this.loadImageWithScale(this.resourcesPath + "data/images/room/messageboxbtn.png",
        ResourceManager.IMAGE_ROOM_MESSAGE_BOX_BUTTON);
    this.loadImageWithScale(this.resourcesPath + "data/images/room/messageboxbtn_hl.png",
        ResourceManager.IMAGE_ROOM_MESSAGE_BOX_BUTTON_HIGHLIGHT);
  }
  
  loadLevelInfo() {
    this.loadImageWithScale(this.resourcesPath + "data/images/experience/experience.png",
        ResourceManager.IMAGE_EXPERIENCE);
  }
  
  loadAchievementInfo() {
    this.loadImageWithScale(this.resourcesPath + "data/images/achievement/achievement.png",
        ResourceManager.IMAGE_ACHIEVEMENT);
    this.loadImageWithScale(this.resourcesPath + "data/images/achievement/achievement_background.png",
        ResourceManager.IMAGE_ACHIEVEMENT_BACKGROUND);
  }
  
  get levelInfoCount() {
    return 1;
  }
  
  get messageBoxCount() {
    return 3;
  }

  get foodIconsCount() {
    return FoodType.values().length;
  }

  get catImagesCount() {
    return 20;
  }
  
  get drinkImagesCount() {
    return 22;
  }
  
  get buildMaterialsCount() {
    return 15;
  }
  
  get journalCount(){
    return 15;
  };
  
  get achievementInfoCount() {
    return 2;
  }
  
  get booksCount() {
    return 18;
  }
  
  loadBooks() {
    this.loadImageWithScale(this.resourcesPath + "data/images/books/book1.png",
        ResourceManager.IMAGE_BOOK_1);
    
    this.loadImageWithScale(this.resourcesPath + "data/images/books/book2.png",
        ResourceManager.IMAGE_BOOK_2);
    
    this.loadImageWithScale(this.resourcesPath + "data/images/books/book3.png",
        ResourceManager.IMAGE_BOOK_3);
    
    this.loadImageWithScale(this.resourcesPath + "data/images/books/book4.png",
        ResourceManager.IMAGE_BOOK_4);
    
    this.loadImageWithScale(this.resourcesPath + "data/images/books/book5.png",
        ResourceManager.IMAGE_BOOK_5);
    
    this.loadImageWithScale(this.resourcesPath + "data/images/books/book6.png",
        ResourceManager.IMAGE_BOOK_6);
    
    this.loadImageWithScale(this.resourcesPath + "data/images/books/book7.png",
        ResourceManager.IMAGE_BOOK_7);
    
    this.loadImageWithScale(this.resourcesPath + "data/images/books/book8.png",
        ResourceManager.IMAGE_BOOK_8);
    
    this.loadImageWithScale(this.resourcesPath + "data/images/books/book9.png",
        ResourceManager.IMAGE_BOOK_9);
    
    this.loadImageWithScale(this.resourcesPath + "data/images/books/book10.png",
        ResourceManager.IMAGE_BOOK_10);
    
    this.loadImageWithScale(this.resourcesPath + "data/images/books/book11.png",
        ResourceManager.IMAGE_BOOK_11);
    
    this.loadImageWithScale(this.resourcesPath + "data/images/books/book12.png",
        ResourceManager.IMAGE_BOOK_12);
    
    this.loadImageWithScale(this.resourcesPath + "data/images/books/book13.png",
        ResourceManager.IMAGE_BOOK_13);
    
    this.loadImageWithScale(this.resourcesPath + "data/images/books/book14.png",
        ResourceManager.IMAGE_BOOK_14);
    
    this.loadImageWithScale(this.resourcesPath + "data/images/books/book15.png",
        ResourceManager.IMAGE_BOOK_15);
    
    this.loadImageWithScale(this.resourcesPath + "data/images/books/book16.png",
        ResourceManager.IMAGE_BOOK_16);
    
    this.loadImageWithScale(this.resourcesPath + "data/images/books/book17.png",
        ResourceManager.IMAGE_BOOK_17);
    
    this.loadImageWithScale(this.resourcesPath + "data/images/books/book18.png",
        ResourceManager.IMAGE_BOOK_18);
  }
  
  loadLoading() {
    this.loadImageWithScale(this.resourcesPath + "data/images/loading/loading1.png",
        ResourceManager.IMAGE_LOADING_1);
    this.loadImageWithScale(this.resourcesPath + "data/images/loading/loading2.png",
        ResourceManager.IMAGE_LOADING_2);
    this.loadImageWithScale(this.resourcesPath + "data/images/loading/loading3.png",
        ResourceManager.IMAGE_LOADING_3);
    this.loadImageWithScale(this.resourcesPath + "data/images/loading/loading4.png",
        ResourceManager.IMAGE_LOADING_4);
    this.loadImageWithScale(this.resourcesPath + "data/images/loading/loading5.png",
        ResourceManager.IMAGE_LOADING_5);
    this.loadImageWithScale(this.resourcesPath + "data/images/loading/loading6.png",
        ResourceManager.IMAGE_LOADING_6);
    this.loadImageWithScale(this.resourcesPath + "data/images/loading/loading7.png",
        ResourceManager.IMAGE_LOADING_7);
    this.loadImageWithScale(this.resourcesPath + "data/images/loading/loading8.png",
        ResourceManager.IMAGE_LOADING_8);
  }
  
  get loadingCount() {
    return 8;
  }
  
  incCurrentIndex() {
    this.currentIndex++;
  }

  loadImageWithScale(path, resourceId) {
    console.log("Loading %s for resourceId = %i.", path, resourceId);
    if (this.resourceManager.getResourceHolder(resourceId) == null) {
      this.resourceManager.loadImageWithScale(path, resourceId, this.scale);
    }
    this.currentIndex++;
    const publish = new Array(1);
    publish[0] = new ProgressInfo(
        ((this.currentIndex * 100) / this.maxIndex), path);
    this.publish(publish);
  }
  
  publish() {
  }
  
  
}
