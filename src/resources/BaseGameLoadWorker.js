
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
    loadImageWithScale(resourcesPath + "data/images/food/carrot1.png",
        ResourceManager.IMAGE_CARROT_1);

    loadImageWithScale(resourcesPath + "data/images/food/dryfood1.png",
        ResourceManager.IMAGE_DRY_FOOD_1);

    loadImageWithScale(resourcesPath + "data/images/food/fish1.png",
        ResourceManager.IMAGE_FISH_1);

    loadImageWithScale(resourcesPath + "data/images/food/icecream1.png",
        ResourceManager.IMAGE_ICE_CREAM_1);

    loadImageWithScale(resourcesPath + "data/images/food/apple1.png",
        ResourceManager.IMAGE_APPLE_1);

    loadImageWithScale(resourcesPath + "data/images/food/cabbage1.png",
        ResourceManager.IMAGE_CABBAGE_1);

    loadImageWithScale(resourcesPath + "data/images/food/chocolate1.png",
        ResourceManager.IMAGE_CHOCOLATE_1);

    loadImageWithScale(resourcesPath + "data/images/food/frenchfries1.png",
        ResourceManager.IMAGE_FRENCH_FRIES_1);

    loadImageWithScale(
        resourcesPath + "data/images/food/japaneseroll1.png",
        ResourceManager.IMAGE_JAPANESE_ROLLS_1);

    loadImageWithScale(resourcesPath + "data/images/food/pie1.png",
        ResourceManager.IMAGE_PIE_1);

    loadImageWithScale(resourcesPath + "data/images/food/potatoes1.png",
        ResourceManager.IMAGE_POTATOES_1);

    loadImageWithScale(resourcesPath + "data/images/food/sandwich1.png",
        ResourceManager.IMAGE_SANDWICH_1);
    
    loadImageWithScale(resourcesPath + "data/images/food/banana1.png",
        ResourceManager.IMAGE_BANANA_1);
    
    loadImageWithScale(resourcesPath + "data/images/food/watermelon1.png",
        ResourceManager.IMAGE_WATERMELON_1);
  }

  loadCatImages() {
    const resourcesPath = getResourcesPath();

    loadImageWithScale(resourcesPath + "data/images/cat/cat1.png",
        ResourceManager.IMAGE_CAT_NORMAL_1);
    loadImageWithScale(resourcesPath + "data/images/cat/cat2.png",
        ResourceManager.IMAGE_CAT_NORMAL_2);
    loadImageWithScale(resourcesPath + "data/images/cat/cat3.png",
        ResourceManager.IMAGE_CAT_NORMAL_3);

    loadImageWithScale(resourcesPath + "data/images/cat/eat1.png",
        ResourceManager.IMAGE_CAT_EAT_1);
    loadImageWithScale(resourcesPath + "data/images/cat/eat2.png",
        ResourceManager.IMAGE_CAT_EAT_2);
    loadImageWithScale(resourcesPath + "data/images/cat/eat3.png",
        ResourceManager.IMAGE_CAT_EAT_3);
    
    loadImageWithScale(resourcesPath + "data/images/cat/education1.png",
        ResourceManager.IMAGE_CAT_EDUCATION_1);
    loadImageWithScale(resourcesPath + "data/images/cat/education2.png",
        ResourceManager.IMAGE_CAT_EDUCATION_2);
    loadImageWithScale(resourcesPath + "data/images/cat/education3.png",
        ResourceManager.IMAGE_CAT_EDUCATION_3);
    loadImageWithScale(resourcesPath + "data/images/cat/education4.png",
        ResourceManager.IMAGE_CAT_EDUCATION_4);
    loadImageWithScale(resourcesPath + "data/images/cat/education5.png",
        ResourceManager.IMAGE_CAT_EDUCATION_5);

    loadImageWithScale(resourcesPath + "data/images/cat/hat1.png",
        ResourceManager.IMAGE_CAT_HAT_1);
    loadImageWithScale(resourcesPath + "data/images/cat/hat2.png",
        ResourceManager.IMAGE_CAT_HAT_2);
    loadImageWithScale(resourcesPath + "data/images/cat/hat3.png",
        ResourceManager.IMAGE_CAT_HAT_3);
    loadImageWithScale(resourcesPath + "data/images/cat/cloth1.png",
        ResourceManager.IMAGE_CAT_CLOTH_1);
    loadImageWithScale(resourcesPath + "data/images/cat/cloth2.png",
        ResourceManager.IMAGE_CAT_CLOTH_2);
    loadImageWithScale(resourcesPath + "data/images/cat/cloth3.png",
        ResourceManager.IMAGE_CAT_CLOTH_3);
    loadImageWithScale(resourcesPath + "data/images/cat/bow1.png",
        ResourceManager.IMAGE_CAT_BOW_1);
    loadImageWithScale(resourcesPath + "data/images/cat/bow2.png",
        ResourceManager.IMAGE_CAT_BOW_2);
    loadImageWithScale(resourcesPath + "data/images/cat/bow3.png",
        ResourceManager.IMAGE_CAT_BOW_3);

  }
  
  loadDrink() {

    loadImageWithScale(resourcesPath
        + "data/images/drink/water1.png",
        ResourceManager.IMAGE_WATER_1);
    loadImageWithScale(resourcesPath
        + "data/images/drink/water2.png",
        ResourceManager.IMAGE_WATER_2);
    loadImageWithScale(resourcesPath
        + "data/images/drink/water3.png",
        ResourceManager.IMAGE_WATER_3);
    loadImageWithScale(resourcesPath
        + "data/images/drink/water4.png",
        ResourceManager.IMAGE_WATER_4);
    loadImageWithScale(resourcesPath
        + "data/images/drink/water5.png",
        ResourceManager.IMAGE_WATER_5);
    
    loadImageWithScale(resourcesPath
        + "data/images/drink/milk1.png",
        ResourceManager.IMAGE_MILK_1);
    loadImageWithScale(resourcesPath
        + "data/images/drink/milk2.png",
        ResourceManager.IMAGE_MILK_2);
    loadImageWithScale(resourcesPath
        + "data/images/drink/milk3.png",
        ResourceManager.IMAGE_MILK_3);
    loadImageWithScale(resourcesPath
        + "data/images/drink/milk4.png",
        ResourceManager.IMAGE_MILK_4);
    loadImageWithScale(resourcesPath
        + "data/images/drink/milk5.png",
        ResourceManager.IMAGE_MILK_5);
    
    loadImageWithScale(resourcesPath
        + "data/images/drink/bottle1.png",
        ResourceManager.IMAGE_BOTTLE_1);
    
    loadImageWithScale(resourcesPath
        + "data/images/drink/tea1.png",
        ResourceManager.IMAGE_TEA_1);
    loadImageWithScale(resourcesPath
        + "data/images/drink/tea2.png",
        ResourceManager.IMAGE_TEA_2);
    loadImageWithScale(resourcesPath
        + "data/images/drink/tea3.png",
        ResourceManager.IMAGE_TEA_3);
    
    loadImageWithScale(resourcesPath
        + "data/images/drink/coffee1.png",
        ResourceManager.IMAGE_COFFEE_1);
    loadImageWithScale(resourcesPath
        + "data/images/drink/coffee2.png",
        ResourceManager.IMAGE_COFFEE_2);
    loadImageWithScale(resourcesPath
        + "data/images/drink/coffee3.png",
        ResourceManager.IMAGE_COFFEE_3);

    loadImageWithScale(resourcesPath
        + "data/images/drink/orangejuice1.png",
        ResourceManager.IMAGE_ORANGE_JUICE_1);
    loadImageWithScale(resourcesPath
        + "data/images/drink/orangejuice2.png",
        ResourceManager.IMAGE_ORANGE_JUICE_2);
    loadImageWithScale(resourcesPath
        + "data/images/drink/orangejuice3.png",
        ResourceManager.IMAGE_ORANGE_JUICE_3);
    loadImageWithScale(resourcesPath
        + "data/images/drink/orangejuice4.png",
        ResourceManager.IMAGE_ORANGE_JUICE_4);
    loadImageWithScale(resourcesPath
        + "data/images/drink/orangejuice5.png",
        ResourceManager.IMAGE_ORANGE_JUICE_5);
  }
  
  loadBuildMaterials() {
    const resourcesPath = getResourcesPath();

    loadImageWithScale(resourcesPath + "data/images/buildingmaterials/rucksack.png",
        ResourceManager.IMAGE_RUCKSACK);
    loadImageWithScale(resourcesPath + "data/images/buildingmaterials/rucksack_hl.png",
        ResourceManager.IMAGE_RUCKSACK_HIGHLIGHT);
    loadImageWithScale(resourcesPath + "data/images/buildingmaterials/rucksackinner.png",
        ResourceManager.IMAGE_RUCKSACK_INNER);
    loadImageWithScale(resourcesPath + "data/images/buildingmaterials/close.png",
        ResourceManager.IMAGE_RUCKSACK_CLOSE);
    loadImageWithScale(resourcesPath + "data/images/buildingmaterials/close_hl.png",
        ResourceManager.IMAGE_RUCKSACK_CLOSE_HIGHLIGHT);
    loadImageWithScale(resourcesPath + "data/images/buildingmaterials/menuitem.png",
        ResourceManager.IMAGE_BUILDING_MATERIAL_MENU_ITEM);
    loadImageWithScale(resourcesPath + "data/images/buildingmaterials/timber.png",
        ResourceManager.IMAGE_BUILDING_MATERIAL_TIMBER);
    loadImageWithScale(resourcesPath + "data/images/buildingmaterials/board.png",
        ResourceManager.IMAGE_BUILDING_MATERIAL_BOARD);
    loadImageWithScale(resourcesPath + "data/images/buildingmaterials/stone.png",
        ResourceManager.IMAGE_BUILDING_MATERIAL_STONE);
    loadImageWithScale(resourcesPath + "data/images/buildingmaterials/chip.png",
        ResourceManager.IMAGE_BUILDING_MATERIAL_CHIP);
    loadImageWithScale(resourcesPath + "data/images/buildingmaterials/wire.png",
        ResourceManager.IMAGE_BUILDING_MATERIAL_WIRE);
    loadImageWithScale(resourcesPath + "data/images/buildingmaterials/iron.png",
        ResourceManager.IMAGE_BUILDING_MATERIAL_IRON);
    loadImageWithScale(resourcesPath + "data/images/buildingmaterials/oil.png",
        ResourceManager.IMAGE_BUILDING_MATERIAL_OIL);
    loadImageWithScale(resourcesPath + "data/images/buildingmaterials/bluecrystal.png",
        ResourceManager.IMAGE_BUILDING_MATERIAL_BLUE_CRYSTAL);
    loadImageWithScale(resourcesPath + "data/images/buildingmaterials/rubber.png",
        ResourceManager.IMAGE_BUILDING_MATERIAL_RUBBER);
  }
  
  loadJournal() {
    const resourcesPath = getResourcesPath();

    loadImageWithScale(resourcesPath + "data/images/journal/arrowleft.png",
        ResourceManager.IMAGE_JOURNAL_ARROW_LEFT);
    loadImageWithScale(resourcesPath + "data/images/journal/arrowleft_hl.png",
        ResourceManager.IMAGE_JOURNAL_ARROW_LEFT_HIGHLIGHT);
    loadImageWithScale(resourcesPath + "data/images/journal/arrowright.png",
        ResourceManager.IMAGE_JOURNAL_ARROW_RIGHT);
    loadImageWithScale(resourcesPath + "data/images/journal/arrowright_hl.png",
        ResourceManager.IMAGE_JOURNAL_ARROW_RIGHT_HIGHLIGHT);
    loadImageWithScale(resourcesPath + "data/images/journal/journal.png",
        ResourceManager.IMAGE_JOURNAL);
    loadImageWithScale(resourcesPath + "data/images/journal/journal_hl.png",
        ResourceManager.IMAGE_JOURNAL_HIGHLIGHT);
    loadImageWithScale(resourcesPath + "data/images/journal/journalinner.png",
        ResourceManager.IMAGE_JOURNAL_INNER);
    loadImageWithScale(resourcesPath + "data/images/journal/loading1.png",
        ResourceManager.IMAGE_JOURNAL_LOADING_1);
    loadImageWithScale(resourcesPath + "data/images/journal/loading2.png",
        ResourceManager.IMAGE_JOURNAL_LOADING_2);
    loadImageWithScale(resourcesPath + "data/images/journal/loading3.png",
        ResourceManager.IMAGE_JOURNAL_LOADING_3);
    loadImageWithScale(resourcesPath + "data/images/journal/loading4.png",
        ResourceManager.IMAGE_JOURNAL_LOADING_4);
    loadImageWithScale(resourcesPath + "data/images/journal/loading5.png",
        ResourceManager.IMAGE_JOURNAL_LOADING_5);
    loadImageWithScale(resourcesPath + "data/images/journal/loading6.png",
        ResourceManager.IMAGE_JOURNAL_LOADING_6);
    loadImageWithScale(resourcesPath + "data/images/journal/loading7.png",
        ResourceManager.IMAGE_JOURNAL_LOADING_7);
    loadImageWithScale(resourcesPath + "data/images/journal/loading8.png",
        ResourceManager.IMAGE_JOURNAL_LOADING_8);
  }
  
  loadMessageBox() {
    const resourcesPath = getResourcesPath();
    loadImageWithScale(resourcesPath + "data/images/room/messagebox.png",
        ResourceManager.IMAGE_ROOM_MESSAGE_BOX);
    loadImageWithScale(resourcesPath + "data/images/room/messageboxbtn.png",
        ResourceManager.IMAGE_ROOM_MESSAGE_BOX_BUTTON);
    loadImageWithScale(resourcesPath + "data/images/room/messageboxbtn_hl.png",
        ResourceManager.IMAGE_ROOM_MESSAGE_BOX_BUTTON_HIGHLIGHT);
  }
  
  loadLevelInfo() {
    const resourcesPath = getResourcesPath();
    loadImageWithScale(resourcesPath + "data/images/experience/experience.png",
        ResourceManager.IMAGE_EXPERIENCE);
  }
  
  loadAchievementInfo() {
    const resourcesPath = getResourcesPath();
    loadImageWithScale(resourcesPath + "data/images/achievement/achievement.png",
        ResourceManager.IMAGE_ACHIEVEMENT);
    loadImageWithScale(resourcesPath + "data/images/achievement/achievement_background.png",
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
    loadImageWithScale(resourcesPath + "data/images/books/book1.png",
        ResourceManager.IMAGE_BOOK_1);
    
    loadImageWithScale(resourcesPath + "data/images/books/book2.png",
        ResourceManager.IMAGE_BOOK_2);
    
    loadImageWithScale(resourcesPath + "data/images/books/book3.png",
        ResourceManager.IMAGE_BOOK_3);
    
    loadImageWithScale(resourcesPath + "data/images/books/book4.png",
        ResourceManager.IMAGE_BOOK_4);
    
    loadImageWithScale(resourcesPath + "data/images/books/book5.png",
        ResourceManager.IMAGE_BOOK_5);
    
    loadImageWithScale(resourcesPath + "data/images/books/book6.png",
        ResourceManager.IMAGE_BOOK_6);
    
    loadImageWithScale(resourcesPath + "data/images/books/book7.png",
        ResourceManager.IMAGE_BOOK_7);
    
    loadImageWithScale(resourcesPath + "data/images/books/book8.png",
        ResourceManager.IMAGE_BOOK_8);
    
    loadImageWithScale(resourcesPath + "data/images/books/book9.png",
        ResourceManager.IMAGE_BOOK_9);
    
    loadImageWithScale(resourcesPath + "data/images/books/book10.png",
        ResourceManager.IMAGE_BOOK_10);
    
    loadImageWithScale(resourcesPath + "data/images/books/book11.png",
        ResourceManager.IMAGE_BOOK_11);
    
    loadImageWithScale(resourcesPath + "data/images/books/book12.png",
        ResourceManager.IMAGE_BOOK_12);
    
    loadImageWithScale(resourcesPath + "data/images/books/book13.png",
        ResourceManager.IMAGE_BOOK_13);
    
    loadImageWithScale(resourcesPath + "data/images/books/book14.png",
        ResourceManager.IMAGE_BOOK_14);
    
    loadImageWithScale(resourcesPath + "data/images/books/book15.png",
        ResourceManager.IMAGE_BOOK_15);
    
    loadImageWithScale(resourcesPath + "data/images/books/book16.png",
        ResourceManager.IMAGE_BOOK_16);
    
    loadImageWithScale(resourcesPath + "data/images/books/book17.png",
        ResourceManager.IMAGE_BOOK_17);
    
    loadImageWithScale(resourcesPath + "data/images/books/book18.png",
        ResourceManager.IMAGE_BOOK_18);
  }
  
  loadLoading() {
    loadImageWithScale(resourcesPath + "data/images/loading/loading1.png",
        ResourceManager.IMAGE_LOADING_1);
    loadImageWithScale(resourcesPath + "data/images/loading/loading2.png",
        ResourceManager.IMAGE_LOADING_2);
    loadImageWithScale(resourcesPath + "data/images/loading/loading3.png",
        ResourceManager.IMAGE_LOADING_3);
    loadImageWithScale(resourcesPath + "data/images/loading/loading4.png",
        ResourceManager.IMAGE_LOADING_4);
    loadImageWithScale(resourcesPath + "data/images/loading/loading5.png",
        ResourceManager.IMAGE_LOADING_5);
    loadImageWithScale(resourcesPath + "data/images/loading/loading6.png",
        ResourceManager.IMAGE_LOADING_6);
    loadImageWithScale(resourcesPath + "data/images/loading/loading7.png",
        ResourceManager.IMAGE_LOADING_7);
    loadImageWithScale(resourcesPath + "data/images/loading/loading8.png",
        ResourceManager.IMAGE_LOADING_8);
  }
  
  get loadingCount() {
    return 8;
  }

  loadImageWithScale(path, resourceId) {
    if (resourceManager.getResourceHolder(resourceId) == null) {
      resourceManager.loadImageWithScale(path, resourceId, scale);
    }
    currentIndex++;
    const publish = new ProgressInfo[1];
    publish[0] = new ProgressInfo(
        ((currentIndex * 100) / getMaxIndex()), path);
    publish(publish);
  }
}
