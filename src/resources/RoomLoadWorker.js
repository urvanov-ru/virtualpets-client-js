import BaseGameLoadWorker from './BaseGameLoadWorker.js';


export default class RoomLoadWorker extends BaseGameLoadWorker {
  static get MAX_INDEX() { return 142; }
  
  #buildIconSize = 0;
  
  constructor(resourceManager, scale, petType) {
    super(resourceManager, scale, petType);
    setMaxIndex(MAX_INDEX + catImagesCount + buildMaterialsCount
        +journalCount + drinkImagesCount + messageBoxCount
        + levelInfoCount + achievementInfoCount + booksCount
        + loadingCount);
    this.#buildIconSize = 64 * scale;
  }

  loadResourcesInBackground() {
    const resourcesPath = getResourcesPath();
    loadImageWithScale(resourcesPath + "data/images/room/background.png",
        ResourceManager.IMAGE_ROOM_BACKGROUND);
    loadImageWithScale(resourcesPath + "data/images/room/bedsidetable.png",
        ResourceManager.IMAGE_ROOM_BEDSIDETABLE);
    loadImageWithBuildIcon(resourcesPath + "data/images/room/refrigerator1.png",
        ResourceManager.IMAGE_ROOM_REFRIGERATOR_1,
        ResourceManager.IMAGE_BUILD_REFRIGERATOR_1);
    loadImageWithBuildIcon(resourcesPath + "data/images/room/refrigerator2.png",
        ResourceManager.IMAGE_ROOM_REFRIGERATOR_2,
        ResourceManager.IMAGE_BUILD_REFRIGERATOR_2);
    loadImageWithBuildIcon(resourcesPath + "data/images/room/refrigerator3.png",
        ResourceManager.IMAGE_ROOM_REFRIGERATOR_3,
        ResourceManager.IMAGE_BUILD_REFRIGERATOR_3);
    loadImageWithBuildIcon(resourcesPath + "data/images/room/refrigerator4.png",
        ResourceManager.IMAGE_ROOM_REFRIGERATOR_4,
        ResourceManager.IMAGE_BUILD_REFRIGERATOR_4);
    loadImageWithBuildIcon(resourcesPath + "data/images/room/refrigerator5.png",
        ResourceManager.IMAGE_ROOM_REFRIGERATOR_5,
        ResourceManager.IMAGE_BUILD_REFRIGERATOR_5);
    loadImageWithBuildIcon(resourcesPath + "data/images/room/refrigerator6.png",
        ResourceManager.IMAGE_ROOM_REFRIGERATOR_6,
        ResourceManager.IMAGE_BUILD_REFRIGERATOR_6);
    loadImageWithScale(resourcesPath + "data/images/room/refrigerator1_hl.png",
        ResourceManager.IMAGE_ROOM_REFRIGERATOR_1_HIGHLIGHT);
    loadImageWithScale(resourcesPath + "data/images/room/refrigerator2_hl.png",
        ResourceManager.IMAGE_ROOM_REFRIGERATOR_2_HIGHLIGHT);
    loadImageWithScale(resourcesPath + "data/images/room/refrigerator3_hl.png",
        ResourceManager.IMAGE_ROOM_REFRIGERATOR_3_HIGHLIGHT);
    loadImageWithScale(resourcesPath + "data/images/room/refrigerator4_hl.png",
        ResourceManager.IMAGE_ROOM_REFRIGERATOR_4_HIGHLIGHT);
    loadImageWithScale(resourcesPath + "data/images/room/refrigerator5_hl.png",
        ResourceManager.IMAGE_ROOM_REFRIGERATOR_5_HIGHLIGHT);
    loadImageWithScale(resourcesPath + "data/images/room/refrigerator6_hl.png",
        ResourceManager.IMAGE_ROOM_REFRIGERATOR_6_HIGHLIGHT);
    loadImageWithBuildIcon(resourcesPath + "data/images/room/bookcase1.png",
        ResourceManager.IMAGE_ROOM_BOOKCASE_1,
        ResourceManager.IMAGE_BUILD_BOOKCASE);
    loadImageWithScale(resourcesPath + "data/images/room/bookcase2.png",
        ResourceManager.IMAGE_ROOM_BOOKCASE_2);
    loadImageWithScale(resourcesPath + "data/images/room/bookcase3.png",
        ResourceManager.IMAGE_ROOM_BOOKCASE_3);
    loadImageWithScale(resourcesPath + "data/images/room/bookcase4.png",
        ResourceManager.IMAGE_ROOM_BOOKCASE_4);
    loadImageWithScale(resourcesPath + "data/images/room/bookcase5.png",
        ResourceManager.IMAGE_ROOM_BOOKCASE_5);
    loadImageWithScale(resourcesPath + "data/images/room/bookcase6.png",
        ResourceManager.IMAGE_ROOM_BOOKCASE_6);
    loadImageWithScale(resourcesPath + "data/images/room/bookcase1_hl.png",
        ResourceManager.IMAGE_ROOM_BOOKCASE_HIGHLIGHT_1);
    loadImageWithScale(resourcesPath + "data/images/room/bookcase2_hl.png",
        ResourceManager.IMAGE_ROOM_BOOKCASE_HIGHLIGHT_2);
    loadImageWithScale(resourcesPath + "data/images/room/bookcase3_hl.png",
        ResourceManager.IMAGE_ROOM_BOOKCASE_HIGHLIGHT_3);
    loadImageWithScale(resourcesPath + "data/images/room/bookcase4_hl.png",
        ResourceManager.IMAGE_ROOM_BOOKCASE_HIGHLIGHT_4);
    loadImageWithScale(resourcesPath + "data/images/room/bookcase5_hl.png",
        ResourceManager.IMAGE_ROOM_BOOKCASE_HIGHLIGHT_5);
    loadImageWithScale(resourcesPath + "data/images/room/bookcase6_hl.png",
        ResourceManager.IMAGE_ROOM_BOOKCASE_HIGHLIGHT_6);
    loadImageWithScale(resourcesPath + "data/images/room/tv.png",
        ResourceManager.IMAGE_ROOM_TV);
    loadImageWithScale(resourcesPath + "data/images/room/tv_hl.png",
        ResourceManager.IMAGE_ROOM_TV_HIGHLIGHT);
    loadImageWithScale(resourcesPath + "data/images/room/flower.png",
        ResourceManager.IMAGE_ROOM_FLOWER);
    
    loadImageWithBuildIcon(resourcesPath + "data/images/room/machinewithdrinks1.png",
        ResourceManager.IMAGE_ROOM_MACHINE_WITH_DRINKS_1,
        ResourceManager.IMAGE_BUILD_MACHINE_WITH_DRINKS);
    loadImageWithScale(resourcesPath + "data/images/room/machinewithdrinks2.png",
        ResourceManager.IMAGE_ROOM_MACHINE_WITH_DRINKS_2);
    loadImageWithScale(resourcesPath + "data/images/room/machinewithdrinks3.png",
        ResourceManager.IMAGE_ROOM_MACHINE_WITH_DRINKS_3);
    loadImageWithScale(resourcesPath + "data/images/room/machinewithdrinks4.png",
        ResourceManager.IMAGE_ROOM_MACHINE_WITH_DRINKS_4);
    loadImageWithScale(resourcesPath + "data/images/room/machinewithdrinks5.png",
        ResourceManager.IMAGE_ROOM_MACHINE_WITH_DRINKS_5);
    loadImageWithScale(resourcesPath + "data/images/room/machinewithdrinks6.png",
        ResourceManager.IMAGE_ROOM_MACHINE_WITH_DRINKS_6);
    
    
    loadImageWithScale(resourcesPath + "data/images/room/machinewithdrinks1_hl.png",
        ResourceManager.IMAGE_ROOM_MACHINE_WITH_DRINKS_1_HIGHLIGHT);
    loadImageWithScale(resourcesPath + "data/images/room/machinewithdrinks2_hl.png",
        ResourceManager.IMAGE_ROOM_MACHINE_WITH_DRINKS_2_HIGHLIGHT);
    loadImageWithScale(resourcesPath + "data/images/room/machinewithdrinks3_hl.png",
        ResourceManager.IMAGE_ROOM_MACHINE_WITH_DRINKS_3_HIGHLIGHT);
    loadImageWithScale(resourcesPath + "data/images/room/machinewithdrinks4_hl.png",
        ResourceManager.IMAGE_ROOM_MACHINE_WITH_DRINKS_4_HIGHLIGHT);
    loadImageWithScale(resourcesPath + "data/images/room/machinewithdrinks5_hl.png",
        ResourceManager.IMAGE_ROOM_MACHINE_WITH_DRINKS_5_HIGHLIGHT);
    loadImageWithScale(resourcesPath + "data/images/room/machinewithdrinks6_hl.png",
        ResourceManager.IMAGE_ROOM_MACHINE_WITH_DRINKS_6_HIGHLIGHT);
    
    
    
    
    
    
    
    
    loadImageWithScale(resourcesPath + "data/images/room/arrowright.png",
        ResourceManager.IMAGE_ROOM_ARROW_RIGHT);
    loadImageWithScale(resourcesPath + "data/images/room/arrowright_hl.png",
        ResourceManager.IMAGE_ROOM_ARROW_RIGHT_HIGHLIGHT);
    loadImageWithScale(resourcesPath + "data/images/room/refrigerator_inner.png",
        ResourceManager.IMAGE_ROOM_REFRIGERATOR_INNER);
    loadImageWithScale(resourcesPath + "data/images/room/refrigerator_inner_item.png",
        ResourceManager.IMAGE_ROOM_REFRIGERATOR_INNER_ITEM);

    loadImageWithScale(resourcesPath + "data/images/room/close.png",
        ResourceManager.IMAGE_ROOM_REFRIGERATOR_CLOSE);

    loadImageWithScale(resourcesPath + "data/images/room/close_hl.png",
        ResourceManager.IMAGE_ROOM_REFRIGERATOR_CLOSE_HIGHLIGHT);
    
    loadBooks();
    
    loadImageWithScale(resourcesPath + "data/images/room/bookcase_inner.png",
        ResourceManager.IMAGE_ROOM_BOOKCASE_INNER);
    
    loadImageWithScale(resourcesPath + "data/images/room/bookcase_inner_item.png",
        ResourceManager.IMAGE_ROOM_BOOKCASE_INNER_ITEM);
    
    loadImageWithScale(resourcesPath + "data/images/room/close.png",
        ResourceManager.IMAGE_ROOM_BOOKCASE_CLOSE);

    loadImageWithScale(resourcesPath + "data/images/room/close_hl.png",
        ResourceManager.IMAGE_ROOM_BOOKCASE_CLOSE_HIGHLIGHT);
    
    loadImageWithScale(resourcesPath + "data/images/room/box.png",
        ResourceManager.IMAGE_ROOM_BOX);
    
    loadImageWithScale(resourcesPath + "data/images/room/hammer.png",
        ResourceManager.IMAGE_HAMMER);
    loadImageWithScale(resourcesPath + "data/images/room/hammer_hl.png",
        ResourceManager.IMAGE_HAMMER_HIGHLIGHT);
    
    loadImageWithScale(resourcesPath + "data/images/room/menuitem.png",
        ResourceManager.IMAGE_BUILD_MENU_ITEM);
    
    loadImageWithScale(resourcesPath + "data/images/room/buildmenuinner.png",
        ResourceManager.IMAGE_BUILD_MENU_INNER);
    loadImageWithScale(resourcesPath + "data/images/room/buildmenutooltip.png",
        ResourceManager.IMAGE_BUILD_MENU_TOOLTIP);
    

    
    
    loadImageWithScale(resourcesPath + "data/images/room/machinewithdrinks_inner.png",
        ResourceManager.IMAGE_ROOM_MACHINE_WITH_DRINKS_INNER);
    loadImageWithScale(resourcesPath + "data/images/room/machinewithdrinks_inner_item.png",
        ResourceManager.IMAGE_ROOM_MACHINE_WITH_DRINKS_INNER_ITEM);

    loadImageWithScale(resourcesPath + "data/images/room/close.png",
        ResourceManager.IMAGE_ROOM_MACHINE_WITH_DRINKS_CLOSE);

    loadImageWithScale(resourcesPath + "data/images/room/close_hl.png",
        ResourceManager.IMAGE_ROOM_MACHINE_WITH_DRINKS_CLOSE_HIGHLIGHT);
    
    
    // Загрузка изображений питомца.
    switch (petType) {
    case CAT:
      loadCatImages();
      break;
    }

    loadFood();
    
    loadBuildMaterials();
    
    loadJournal();
    
    loadDrink();
    
    loadMessageBox();
    
    loadLevelInfo();
    
    loadAchievementInfo();
    
    loadLoading();
  }

  

  loadFood() {
    const resourcesPath = resourcesPath;
    loadImageWithScale(resourcesPath + "data/images/food/carrot1.png",
        ResourceManager.IMAGE_CARROT_1);
    loadImageWithScale(resourcesPath + "data/images/food/carrot2.png",
        ResourceManager.IMAGE_CARROT_2);
    loadImageWithScale(resourcesPath + "data/images/food/carrot3.png",
        ResourceManager.IMAGE_CARROT_3);
    loadImageWithScale(resourcesPath + "data/images/food/carrot4.png",
        ResourceManager.IMAGE_CARROT_4);
    loadImageWithScale(resourcesPath + "data/images/food/carrot5.png",
        ResourceManager.IMAGE_CARROT_5);
    loadImageWithScale(resourcesPath + "data/images/food/carrot6.png",
        ResourceManager.IMAGE_CARROT_6);

    loadImageWithScale(resourcesPath + "data/images/food/dryfood1.png",
        ResourceManager.IMAGE_DRY_FOOD_1);

    loadImageWithScale(resourcesPath + "data/images/food/fish1.png",
        ResourceManager.IMAGE_FISH_1);
    loadImageWithScale(resourcesPath + "data/images/food/fish2.png",
        ResourceManager.IMAGE_FISH_2);
    loadImageWithScale(resourcesPath + "data/images/food/fish3.png",
        ResourceManager.IMAGE_FISH_3);
    loadImageWithScale(resourcesPath + "data/images/food/fish4.png",
        ResourceManager.IMAGE_FISH_4);
    loadImageWithScale(resourcesPath + "data/images/food/fish5.png",
        ResourceManager.IMAGE_FISH_5);

    loadImageWithScale(resourcesPath + "data/images/food/icecream1.png",
        ResourceManager.IMAGE_ICE_CREAM_1);
    loadImageWithScale(resourcesPath + "data/images/food/icecream2.png",
        ResourceManager.IMAGE_ICE_CREAM_2);
    loadImageWithScale(resourcesPath + "data/images/food/icecream3.png",
        ResourceManager.IMAGE_ICE_CREAM_3);
    loadImageWithScale(resourcesPath + "data/images/food/icecream4.png",
        ResourceManager.IMAGE_ICE_CREAM_4);
    loadImageWithScale(resourcesPath + "data/images/food/icecream5.png",
        ResourceManager.IMAGE_ICE_CREAM_5);
    loadImageWithScale(resourcesPath + "data/images/food/icecream6.png",
        ResourceManager.IMAGE_ICE_CREAM_6);
    
    loadImageWithScale(resourcesPath + "data/images/food/apple1.png",
        ResourceManager.IMAGE_APPLE_1);
    loadImageWithScale(resourcesPath + "data/images/food/apple2.png",
        ResourceManager.IMAGE_APPLE_2);
    loadImageWithScale(resourcesPath + "data/images/food/apple3.png",
        ResourceManager.IMAGE_APPLE_3);
    loadImageWithScale(resourcesPath + "data/images/food/apple4.png",
        ResourceManager.IMAGE_APPLE_4);
    loadImageWithScale(resourcesPath + "data/images/food/apple5.png",
        ResourceManager.IMAGE_APPLE_5);
    
    loadImageWithScale(resourcesPath + "data/images/food/cabbage1.png",
        ResourceManager.IMAGE_CABBAGE_1);
    loadImageWithScale(resourcesPath + "data/images/food/cabbage2.png",
        ResourceManager.IMAGE_CABBAGE_2);
    loadImageWithScale(resourcesPath + "data/images/food/cabbage3.png",
        ResourceManager.IMAGE_CABBAGE_3);
    loadImageWithScale(resourcesPath + "data/images/food/cabbage4.png",
        ResourceManager.IMAGE_CABBAGE_4);
    loadImageWithScale(resourcesPath + "data/images/food/cabbage5.png",
        ResourceManager.IMAGE_CABBAGE_5);
    loadImageWithScale(resourcesPath + "data/images/food/cabbage6.png",
        ResourceManager.IMAGE_CABBAGE_6);

    loadImageWithScale(resourcesPath + "data/images/food/chocolate1.png",
        ResourceManager.IMAGE_CHOCOLATE_1);
    loadImageWithScale(resourcesPath + "data/images/food/chocolate2.png",
        ResourceManager.IMAGE_CHOCOLATE_2);
    loadImageWithScale(resourcesPath + "data/images/food/chocolate3.png",
        ResourceManager.IMAGE_CHOCOLATE_3);
    loadImageWithScale(resourcesPath + "data/images/food/chocolate4.png",
        ResourceManager.IMAGE_CHOCOLATE_4);
    loadImageWithScale(resourcesPath + "data/images/food/chocolate5.png",
        ResourceManager.IMAGE_CHOCOLATE_5);
    
    loadImageWithScale(resourcesPath + "data/images/food/frenchfries1.png",
        ResourceManager.IMAGE_FRENCH_FRIES_1);
    loadImageWithScale(resourcesPath + "data/images/food/frenchfries2.png",
        ResourceManager.IMAGE_FRENCH_FRIES_2);
    loadImageWithScale(resourcesPath + "data/images/food/frenchfries3.png",
        ResourceManager.IMAGE_FRENCH_FRIES_3);
    loadImageWithScale(resourcesPath + "data/images/food/frenchfries4.png",
        ResourceManager.IMAGE_FRENCH_FRIES_4);
    loadImageWithScale(resourcesPath + "data/images/food/frenchfries5.png",
        ResourceManager.IMAGE_FRENCH_FRIES_5);
    loadImageWithScale(resourcesPath + "data/images/food/frenchfries6.png",
        ResourceManager.IMAGE_FRENCH_FRIES_6);
    
    loadImageWithScale(resourcesPath + "data/images/food/japaneseroll1.png",
        ResourceManager.IMAGE_JAPANESE_ROLLS_1);
    loadImageWithScale(resourcesPath + "data/images/food/japaneseroll2.png",
        ResourceManager.IMAGE_JAPANESE_ROLLS_2);
    loadImageWithScale(resourcesPath + "data/images/food/japaneseroll3.png",
        ResourceManager.IMAGE_JAPANESE_ROLLS_3);
    loadImageWithScale(resourcesPath + "data/images/food/japaneseroll4.png",
        ResourceManager.IMAGE_JAPANESE_ROLLS_4);
    loadImageWithScale(resourcesPath + "data/images/food/japaneseroll5.png",
        ResourceManager.IMAGE_JAPANESE_ROLLS_5);
    loadImageWithScale(resourcesPath + "data/images/food/japaneseroll6.png",
        ResourceManager.IMAGE_JAPANESE_ROLLS_6);
    
    loadImageWithScale(resourcesPath + "data/images/food/pie1.png",
        ResourceManager.IMAGE_PIE_1);
    loadImageWithScale(resourcesPath + "data/images/food/pie2.png",
        ResourceManager.IMAGE_PIE_2);
    loadImageWithScale(resourcesPath + "data/images/food/pie3.png",
        ResourceManager.IMAGE_PIE_3);
    loadImageWithScale(resourcesPath + "data/images/food/pie4.png",
        ResourceManager.IMAGE_PIE_4);
    loadImageWithScale(resourcesPath + "data/images/food/pie5.png",
        ResourceManager.IMAGE_PIE_5);
    loadImageWithScale(resourcesPath + "data/images/food/pie6.png",
        ResourceManager.IMAGE_PIE_6);
    loadImageWithScale(resourcesPath + "data/images/food/pie7.png",
        ResourceManager.IMAGE_PIE_7);
    
    loadImageWithScale(resourcesPath + "data/images/food/potatoes1.png",
        ResourceManager.IMAGE_POTATOES_1);
    loadImageWithScale(resourcesPath + "data/images/food/potatoes2.png",
        ResourceManager.IMAGE_POTATOES_2);
    loadImageWithScale(resourcesPath + "data/images/food/potatoes3.png",
        ResourceManager.IMAGE_POTATOES_3);
    loadImageWithScale(resourcesPath + "data/images/food/potatoes4.png",
        ResourceManager.IMAGE_POTATOES_4);
    loadImageWithScale(resourcesPath + "data/images/food/potatoes5.png",
        ResourceManager.IMAGE_POTATOES_5);
    loadImageWithScale(resourcesPath + "data/images/food/potatoes6.png",
        ResourceManager.IMAGE_POTATOES_6);
    loadImageWithScale(resourcesPath + "data/images/food/potatoes7.png",
        ResourceManager.IMAGE_POTATOES_7);
    loadImageWithScale(resourcesPath + "data/images/food/potatoes8.png",
        ResourceManager.IMAGE_POTATOES_8);
    
    loadImageWithScale(resourcesPath + "data/images/food/sandwich1.png",
        ResourceManager.IMAGE_SANDWICH_1);
    loadImageWithScale(resourcesPath + "data/images/food/sandwich2.png",
        ResourceManager.IMAGE_SANDWICH_2);
    loadImageWithScale(resourcesPath + "data/images/food/sandwich3.png",
        ResourceManager.IMAGE_SANDWICH_3);
    loadImageWithScale(resourcesPath + "data/images/food/sandwich4.png",
        ResourceManager.IMAGE_SANDWICH_4);
    loadImageWithScale(resourcesPath + "data/images/food/sandwich5.png",
        ResourceManager.IMAGE_SANDWICH_5);
    loadImageWithScale(resourcesPath + "data/images/food/sandwich6.png",
        ResourceManager.IMAGE_SANDWICH_6);
    
    loadImageWithScale(resourcesPath + "data/images/food/banana1.png",
        ResourceManager.IMAGE_BANANA_1);
    loadImageWithScale(resourcesPath + "data/images/food/banana2.png",
        ResourceManager.IMAGE_BANANA_2);
    loadImageWithScale(resourcesPath + "data/images/food/banana3.png",
        ResourceManager.IMAGE_BANANA_3);
    loadImageWithScale(resourcesPath + "data/images/food/banana4.png",
        ResourceManager.IMAGE_BANANA_4);
    loadImageWithScale(resourcesPath + "data/images/food/banana5.png",
        ResourceManager.IMAGE_BANANA_5);
    loadImageWithScale(resourcesPath + "data/images/food/banana6.png",
        ResourceManager.IMAGE_BANANA_6);
    
    loadImageWithScale(resourcesPath + "data/images/food/watermelon1.png",
        ResourceManager.IMAGE_WATERMELON_1);
    loadImageWithScale(resourcesPath + "data/images/food/watermelon2.png",
        ResourceManager.IMAGE_WATERMELON_2);
    loadImageWithScale(resourcesPath + "data/images/food/watermelon3.png",
        ResourceManager.IMAGE_WATERMELON_3);
    loadImageWithScale(resourcesPath + "data/images/food/watermelon4.png",
        ResourceManager.IMAGE_WATERMELON_4);
    loadImageWithScale(resourcesPath + "data/images/food/watermelon5.png",
        ResourceManager.IMAGE_WATERMELON_5);
    loadImageWithScale(resourcesPath + "data/images/food/watermelon6.png",
        ResourceManager.IMAGE_WATERMELON_6);
    loadImageWithScale(resourcesPath + "data/images/food/watermelon7.png",
        ResourceManager.IMAGE_WATERMELON_7);
    loadImageWithScale(resourcesPath + "data/images/food/watermelon8.png",
        ResourceManager.IMAGE_WATERMELON_8);
    
  }
  
  loadImageWithBuildIcon(path, resourceId, resourceIconId) {
    resourceManager.loadImageWithScale(path, resourceId, scale);
    if (resourceManager.getResourceHolder(resourceIconId) == null) {
      const image = resourceManager.loadImage(path);
      const w = image.width;
      const h = image.height;
      const max = Math.max(w, h);
      if (max <= buildIconSize) {
        const resourceHolder = new ResourceHolder();
        resourceHolder.resource = image;
        resourceHolder.resetInScale = true;
        resourceManager.putResource(resourceIconId, resourceHolder);
      } else {
        const fw = buildIconSize / max * w;
        const fh = buildIconSize / max * h;
        // to implement
//        const scaledImage = image.getScaledInstance((int) (fw),
//            (int) (fh), Image.SCALE_SMOOTH);
//        BufferedImage bi = ImageToBufferedImage
//            .toBufferedImage(scaledImage);
//        ResourceHolder resourceHolder = new ResourceHolder();
//        resourceHolder.setResource(bi);
//        resourceHolder.setResetInScale(true);
//        resourceManager.putResource(resourceIconId, resourceHolder);
      }
    }
    incCurrentIndex();
    const publish = new ProgressInfo[1];
    publish[0] = new ProgressInfo(
        ((currentIndex * 100) / maxIndex), path);
    publish(publish);
  }
  
}
