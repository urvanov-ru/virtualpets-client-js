import HiddenObjectsGameLoadWorker from './HiddenObjectsGameLoadWorker.js';
import ResourceManager from './ResourceManager.js';

export default class AfternoonTeaLoadWorker extends HiddenObjectsGameLoadWorker {

  static get MAX_INDEX() { return 1 + 55 * 2 ; }
  
  constructor(resourceManager, scale, petType) {
    super(resourceManager, scale, petType);
    this.maxIndex = AfternoonTeaLoadWorker.MAX_INDEX + this.foodIconsCount + this.catImagesCount + this.interfaceImagesCount
        + this.messageBoxCount + this.buildMaterialsCount + this.levelInfoCount
        + this.achievementInfoCount + this.drinkImagesCount + this.booksCount;
  }

  loadResourcesInBackground() {
    this.loadImageWithScale(this.resourcesPath
        + "data/images/afternoontea/background.png",
        ResourceManager.IMAGE_AFTERNOONTEA_BACKGROUND);
    

    this.loadImageWithIcon(this.resourcesPath
        + "data/images/afternoontea/biscuit1.png",
        ResourceManager.IMAGE_AFTERNOONTEA_BISCUIT1,
        ResourceManager.IMAGE_AFTERNOONTEA_BISCUIT1_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/afternoontea/biscuit2.png",
        ResourceManager.IMAGE_AFTERNOONTEA_BISCUIT2,
        ResourceManager.IMAGE_AFTERNOONTEA_BISCUIT2_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/afternoontea/biscuit3.png",
        ResourceManager.IMAGE_AFTERNOONTEA_BISCUIT3,
        ResourceManager.IMAGE_AFTERNOONTEA_BISCUIT3_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/afternoontea/biscuit4.png",
        ResourceManager.IMAGE_AFTERNOONTEA_BISCUIT4,
        ResourceManager.IMAGE_AFTERNOONTEA_BISCUIT4_ICON);

    this.loadImageWithIcon(this.resourcesPath
        + "data/images/afternoontea/biscuits.png",
        ResourceManager.IMAGE_AFTERNOONTEA_BISCUITS,
        ResourceManager.IMAGE_AFTERNOONTEA_BISCUITS_ICON);

    this.loadImageWithIcon(this.resourcesPath
        + "data/images/afternoontea/books.png",
        ResourceManager.IMAGE_AFTERNOONTEA_BOOKS,
        ResourceManager.IMAGE_AFTERNOONTEA_BOOKS_ICON);

    this.loadImageWithIcon(this.resourcesPath
        + "data/images/afternoontea/butter.png",
        ResourceManager.IMAGE_AFTERNOONTEA_BUTTER,
        ResourceManager.IMAGE_AFTERNOONTEA_BUTTER_ICON);

    this.loadImageWithIcon(this.resourcesPath
        + "data/images/afternoontea/butterfly.png",
        ResourceManager.IMAGE_AFTERNOONTEA_BUTTERFLY,
        ResourceManager.IMAGE_AFTERNOONTEA_BUTTERFLY_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/afternoontea/can1.png",
        ResourceManager.IMAGE_AFTERNOONTEA_CAN1,
        ResourceManager.IMAGE_AFTERNOONTEA_CAN1_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/afternoontea/candlestick.png",
        ResourceManager.IMAGE_AFTERNOONTEA_CANDLESTICK,
        ResourceManager.IMAGE_AFTERNOONTEA_CANDLESTICK_ICON);

    this.loadImageWithIcon(this.resourcesPath
        + "data/images/afternoontea/card1.png",
        ResourceManager.IMAGE_AFTERNOONTEA_CARD1,
        ResourceManager.IMAGE_AFTERNOONTEA_CARD1_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/afternoontea/card2.png",
        ResourceManager.IMAGE_AFTERNOONTEA_CARD2,
        ResourceManager.IMAGE_AFTERNOONTEA_CARD2_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/afternoontea/card3.png",
        ResourceManager.IMAGE_AFTERNOONTEA_CARD3,
        ResourceManager.IMAGE_AFTERNOONTEA_CARD3_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/afternoontea/card4.png",
        ResourceManager.IMAGE_AFTERNOONTEA_CARD4,
        ResourceManager.IMAGE_AFTERNOONTEA_CARD4_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/afternoontea/card5.png",
        ResourceManager.IMAGE_AFTERNOONTEA_CARD5,
        ResourceManager.IMAGE_AFTERNOONTEA_CARD5_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/afternoontea/card6.png",
        ResourceManager.IMAGE_AFTERNOONTEA_CARD6,
        ResourceManager.IMAGE_AFTERNOONTEA_CARD6_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/afternoontea/card7.png",
        ResourceManager.IMAGE_AFTERNOONTEA_CARD7,
        ResourceManager.IMAGE_AFTERNOONTEA_CARD7_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/afternoontea/card8.png",
        ResourceManager.IMAGE_AFTERNOONTEA_CARD8,
        ResourceManager.IMAGE_AFTERNOONTEA_CARD8_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/afternoontea/card9.png",
        ResourceManager.IMAGE_AFTERNOONTEA_CARD9,
        ResourceManager.IMAGE_AFTERNOONTEA_CARD9_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/afternoontea/card10.png",
        ResourceManager.IMAGE_AFTERNOONTEA_CARD10,
        ResourceManager.IMAGE_AFTERNOONTEA_CARD10_ICON);

    this.loadImageWithIcon(this.resourcesPath
        + "data/images/afternoontea/cat.png",
        ResourceManager.IMAGE_AFTERNOONTEA_CAT,
        ResourceManager.IMAGE_AFTERNOONTEA_CAT_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/afternoontea/chess1.png",
        ResourceManager.IMAGE_AFTERNOONTEA_CHESS1,
        ResourceManager.IMAGE_AFTERNOONTEA_CHESS1_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/afternoontea/chess2.png",
        ResourceManager.IMAGE_AFTERNOONTEA_CHESS2,
        ResourceManager.IMAGE_AFTERNOONTEA_CHESS2_ICON);
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/afternoontea/chess3.png",
        ResourceManager.IMAGE_AFTERNOONTEA_CHESS3,
        ResourceManager.IMAGE_AFTERNOONTEA_CHESS3_ICON);
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/afternoontea/chess4.png",
        ResourceManager.IMAGE_AFTERNOONTEA_CHESS4,
        ResourceManager.IMAGE_AFTERNOONTEA_CHESS4_ICON);
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/afternoontea/chess5.png",
        ResourceManager.IMAGE_AFTERNOONTEA_CHESS5,
        ResourceManager.IMAGE_AFTERNOONTEA_CHESS5_ICON);

    this.loadImageWithIcon(this.resourcesPath
        + "data/images/afternoontea/clock1.png",
        ResourceManager.IMAGE_AFTERNOONTEA_CLOCK1,
        ResourceManager.IMAGE_AFTERNOONTEA_CLOCK1_ICON);
 
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/afternoontea/clock2.png",
        ResourceManager.IMAGE_AFTERNOONTEA_CLOCK2,
        ResourceManager.IMAGE_AFTERNOONTEA_CLOCK2_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/afternoontea/clock3.png",
        ResourceManager.IMAGE_AFTERNOONTEA_CLOCK3,
        ResourceManager.IMAGE_AFTERNOONTEA_CLOCK3_ICON);
    
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/afternoontea/cube1.png",
        ResourceManager.IMAGE_AFTERNOONTEA_CUBE1,
        ResourceManager.IMAGE_AFTERNOONTEA_CUBE1_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/afternoontea/cube2.png",
        ResourceManager.IMAGE_AFTERNOONTEA_CUBE2,
        ResourceManager.IMAGE_AFTERNOONTEA_CUBE2_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/afternoontea/cube3.png",
        ResourceManager.IMAGE_AFTERNOONTEA_CUBE3,
        ResourceManager.IMAGE_AFTERNOONTEA_CUBE3_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/afternoontea/daisy1.png",
        ResourceManager.IMAGE_AFTERNOONTEA_DAISY1,
        ResourceManager.IMAGE_AFTERNOONTEA_DAISY1_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/afternoontea/drinkme1.png",
        ResourceManager.IMAGE_AFTERNOONTEA_DRINKME1,
        ResourceManager.IMAGE_AFTERNOONTEA_DRINKME1_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/afternoontea/drinkme2.png",
        ResourceManager.IMAGE_AFTERNOONTEA_DRINKME2,
        ResourceManager.IMAGE_AFTERNOONTEA_DRINKME2_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/afternoontea/drinkme3.png",
        ResourceManager.IMAGE_AFTERNOONTEA_DRINKME3,
        ResourceManager.IMAGE_AFTERNOONTEA_DRINKME3_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/afternoontea/flamingo.png",
        ResourceManager.IMAGE_AFTERNOONTEA_FLAMINGO,
        ResourceManager.IMAGE_AFTERNOONTEA_FLAMINGO_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/afternoontea/hat.png",
        ResourceManager.IMAGE_AFTERNOONTEA_HAT,
        ResourceManager.IMAGE_AFTERNOONTEA_HAT_ICON);

    this.loadImageWithIcon(this.resourcesPath
        + "data/images/afternoontea/hedgehog.png",
        ResourceManager.IMAGE_AFTERNOONTEA_HEDGEHOG,
        ResourceManager.IMAGE_AFTERNOONTEA_HEDGEHOG_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/afternoontea/key.png",
        ResourceManager.IMAGE_AFTERNOONTEA_KEY,
        ResourceManager.IMAGE_AFTERNOONTEA_KEY_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/afternoontea/knife.png",
        ResourceManager.IMAGE_AFTERNOONTEA_KNIFE,
        ResourceManager.IMAGE_AFTERNOONTEA_KNIFE_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/afternoontea/mug1.png",
        ResourceManager.IMAGE_AFTERNOONTEA_MUG1,
        ResourceManager.IMAGE_AFTERNOONTEA_MUG1_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/afternoontea/mug2.png",
        ResourceManager.IMAGE_AFTERNOONTEA_MUG2,
        ResourceManager.IMAGE_AFTERNOONTEA_MUG2_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/afternoontea/mug3.png",
        ResourceManager.IMAGE_AFTERNOONTEA_MUG3,
        ResourceManager.IMAGE_AFTERNOONTEA_MUG3_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/afternoontea/mug4.png",
        ResourceManager.IMAGE_AFTERNOONTEA_MUG4,
        ResourceManager.IMAGE_AFTERNOONTEA_MUG4_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/afternoontea/mushroom.png",
        ResourceManager.IMAGE_AFTERNOONTEA_MUSHROOM,
        ResourceManager.IMAGE_AFTERNOONTEA_MUSHROOM_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/afternoontea/pie.png",
        ResourceManager.IMAGE_AFTERNOONTEA_PIE,
        ResourceManager.IMAGE_AFTERNOONTEA_PIE_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/afternoontea/plate1.png",
        ResourceManager.IMAGE_AFTERNOONTEA_PLATE1,
        ResourceManager.IMAGE_AFTERNOONTEA_PLATE1_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/afternoontea/plate2.png",
        ResourceManager.IMAGE_AFTERNOONTEA_PLATE2,
        ResourceManager.IMAGE_AFTERNOONTEA_PLATE2_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/afternoontea/plate3.png",
        ResourceManager.IMAGE_AFTERNOONTEA_PLATE3,
        ResourceManager.IMAGE_AFTERNOONTEA_PLATE3_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/afternoontea/shell.png",
        ResourceManager.IMAGE_AFTERNOONTEA_SHELL,
        ResourceManager.IMAGE_AFTERNOONTEA_SHELL_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/afternoontea/shoes.png",
        ResourceManager.IMAGE_AFTERNOONTEA_SHOES,
        ResourceManager.IMAGE_AFTERNOONTEA_SHOES_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/afternoontea/strawberry.png",
        ResourceManager.IMAGE_AFTERNOONTEA_STRAWBERRY,
        ResourceManager.IMAGE_AFTERNOONTEA_STRAWBERRY_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/afternoontea/sugar.png",
        ResourceManager.IMAGE_AFTERNOONTEA_SUGAR,
        ResourceManager.IMAGE_AFTERNOONTEA_SUGAR_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/afternoontea/teapot.png",
        ResourceManager.IMAGE_AFTERNOONTEA_TEAPOT,
        ResourceManager.IMAGE_AFTERNOONTEA_TEAPOT_ICON);
    
    
    this.loadInterfaceImages();

    this.loadMessageBox();
    

    this.loadFoodIcons();

    this.loadCatImages();
    
    this.createPlayersIcons();
    
    this.loadBuildMaterials();
    
    this.loadLevelInfo();
    
    this.loadAchievementInfo();
    
    this.loadDrink();
    
    this.loadBooks();
    
  }

}
