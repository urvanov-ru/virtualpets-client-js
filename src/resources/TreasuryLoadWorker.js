import HiddenObjectsGameLoadWorker from './HiddenObjectsGameLoadWorker.js';
import ResourceManager from './ResourceManager.js';

export default class TreasuryLoadWorker extends HiddenObjectsGameLoadWorker {
  static get MAX_INDEX() { return 4 + 40 * 2; }

  constructor(resourceManager, scale,
      petType) {
    super(resourceManager, scale, petType);
    this.maxIndex = TreasuryLoadWorker.MAX_INDEX + this.foodIconsCount + this.catImagesCount + this.interfaceImagesCount
        + this.messageBoxCount + this.buildMaterialsCount + this.levelInfoCount
        + this.achievementInfoCount + this.drinkImagesCount + this.booksCount;
  }

  loadResourcesInBackground() {
    this.loadImageWithScale(this.resourcesPath
        + "data/images/treasury/background.png",
        ResourceManager.IMAGE_TREASURY_BACKGROUND);
    this.loadImageWithScale(this.resourcesPath + "data/images/treasury/torch.png",
        ResourceManager.IMAGE_TREASURY_TORCH);
    this.loadImageWithScale(this.resourcesPath + "data/images/treasury/statue.png",
        ResourceManager.IMAGE_TREASURY_STATUE);
    this.loadImageWithScale(this.resourcesPath + "data/images/treasury/front.png",
        ResourceManager.IMAGE_TREASURY_FRONT);

    this.loadImageWithIcon(this.resourcesPath + "data/images/treasury/liana.png",
        ResourceManager.IMAGE_TREASURY_LIANA,
        ResourceManager.IMAGE_TREASURY_LIANA_ICON);
    this.loadImageWithIcon(this.resourcesPath + "data/images/treasury/lamp.png",
        ResourceManager.IMAGE_TREASURY_LAMP,
        ResourceManager.IMAGE_TREASURY_LAMP_ICON);
    this.loadImageWithIcon(
        this.resourcesPath + "data/images/treasury/wristwatch.png",
        ResourceManager.IMAGE_TREASURY_WRISTWATCH,
        ResourceManager.IMAGE_TREASURY_WRISTWATCH_ICON);
    this.loadImageWithIcon(this.resourcesPath + "data/images/treasury/pinion.png",
        ResourceManager.IMAGE_TREASURY_PINION,
        ResourceManager.IMAGE_TREASURY_PINION_ICON);

    this.loadImageWithIcon(this.resourcesPath + "data/images/treasury/scroll.png",
        ResourceManager.IMAGE_TREASURY_SCROLL,
        ResourceManager.IMAGE_TREASURY_SCROLL_ICON);
    this.loadImageWithIcon(this.resourcesPath + "data/images/treasury/telescope.png",
        ResourceManager.IMAGE_TREASURY_TELESCOPE,
        ResourceManager.IMAGE_TREASURY_TELESCOPE_ICON);
    this.loadImageWithIcon(this.resourcesPath + "data/images/treasury/bigbook.png",
        ResourceManager.IMAGE_TREASURY_BIG_BOOK,
        ResourceManager.IMAGE_TREASURY_BIG_BOOK_ICON);
    this.loadImageWithIcon(this.resourcesPath + "data/images/treasury/lantern.png",
        ResourceManager.IMAGE_TREASURY_LANTERN,
        ResourceManager.IMAGE_TREASURY_LANTERN_ICON);
    this.loadImageWithIcon(this.resourcesPath + "data/images/treasury/sabre.png",
        ResourceManager.IMAGE_TREASURY_SABRE,
        ResourceManager.IMAGE_TREASURY_SABRE_ICON);
    this.loadImageWithIcon(this.resourcesPath + "data/images/treasury/medallion.png",
        ResourceManager.IMAGE_TREASURY_MEDALLION,
        ResourceManager.IMAGE_TREASURY_MEDALLION_ICON);
    this.loadImageWithIcon(this.resourcesPath + "data/images/treasury/barrel.png",
        ResourceManager.IMAGE_TREASURY_BARREL,
        ResourceManager.IMAGE_TREASURY_BARREL_ICON);
    this.loadImageWithIcon(this.resourcesPath + "data/images/treasury/birdsnest.png",
        ResourceManager.IMAGE_TREASURY_BIRDSNEST,
        ResourceManager.IMAGE_TREASURY_BIRDSNEST_ICON);
    this.loadImageWithIcon(this.resourcesPath + "data/images/treasury/pen.png",
        ResourceManager.IMAGE_TREASURY_PEN,
        ResourceManager.IMAGE_TREASURY_PEN_ICON);
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/treasury/paperairplane.png",
        ResourceManager.IMAGE_TREASURY_PAPER_AIRPLANE,
        ResourceManager.IMAGE_TREASURY_PAPER_AIRPLANE_ICON);
    this.loadImageWithIcon(this.resourcesPath + "data/images/treasury/purse.png",
        ResourceManager.IMAGE_TREASURY_PURSE,
        ResourceManager.IMAGE_TREASURY_PURSE_ICON);
    this.loadImageWithIcon(this.resourcesPath + "data/images/treasury/feather.png",
        ResourceManager.IMAGE_TREASURY_FEATHER,
        ResourceManager.IMAGE_TREASURY_FEATHER_ICON);
    this.loadImageWithIcon(this.resourcesPath + "data/images/treasury/knife.png",
        ResourceManager.IMAGE_TREASURY_KNIFE,
        ResourceManager.IMAGE_TREASURY_KNIFE_ICON);
    this.loadImageWithIcon(this.resourcesPath + "data/images/treasury/apple.png",
        ResourceManager.IMAGE_TREASURY_APPLE,
        ResourceManager.IMAGE_TREASURY_APPLE_ICON);
    this.loadImageWithIcon(this.resourcesPath + "data/images/treasury/coins.png",
        ResourceManager.IMAGE_TREASURY_COINS,
        ResourceManager.IMAGE_TREASURY_COINS_ICON);
    this.loadImageWithIcon(this.resourcesPath + "data/images/treasury/cabbage.png",
        ResourceManager.IMAGE_TREASURY_CABBAGE,
        ResourceManager.IMAGE_TREASURY_CABBAGE_ICON);
    this.loadImageWithIcon(this.resourcesPath + "data/images/treasury/chest.png",
        ResourceManager.IMAGE_TREASURY_CHEST,
        ResourceManager.IMAGE_TREASURY_CHEST_ICON);
    this.loadImageWithIcon(
        this.resourcesPath + "data/images/treasury/coinsstack.png",
        ResourceManager.IMAGE_TREASURY_COINS_STACK,
        ResourceManager.IMAGE_TREASURY_COINS_STACK_ICON);
    this.loadImageWithIcon(this.resourcesPath + "data/images/treasury/amulet.png",
        ResourceManager.IMAGE_TREASURY_AMULET,
        ResourceManager.IMAGE_TREASURY_AMULET_ICON);
    this.loadImageWithIcon(this.resourcesPath + "data/images/treasury/diamond.png",
        ResourceManager.IMAGE_TREASURY_DIAMOND,
        ResourceManager.IMAGE_TREASURY_DIAMOND_ICON);
    this.loadImageWithIcon(this.resourcesPath + "data/images/treasury/paper.png",
        ResourceManager.IMAGE_TREASURY_PAPER,
        ResourceManager.IMAGE_TREASURY_PAPER_ICON);
    this.loadImageWithIcon(this.resourcesPath + "data/images/treasury/compass.png",
        ResourceManager.IMAGE_TREASURY_COMPASS,
        ResourceManager.IMAGE_TREASURY_COMPASS_ICON);
    this.loadImageWithIcon(this.resourcesPath + "data/images/treasury/rose.png",
        ResourceManager.IMAGE_TREASURY_ROSE,
        ResourceManager.IMAGE_TREASURY_ROSE_ICON);
    this.loadImageWithIcon(this.resourcesPath + "data/images/treasury/book.png",
        ResourceManager.IMAGE_TREASURY_BOOK,
        ResourceManager.IMAGE_TREASURY_BOOK_ICON);
    this.loadImageWithIcon(this.resourcesPath + "data/images/treasury/mouse.png",
        ResourceManager.IMAGE_TREASURY_MOUSE,
        ResourceManager.IMAGE_TREASURY_MOUSE_ICON);
    this.loadImageWithIcon(this.resourcesPath + "data/images/treasury/cheese.png",
        ResourceManager.IMAGE_TREASURY_CHEESE,
        ResourceManager.IMAGE_TREASURY_CHEESE_ICON);
    this.loadImageWithIcon(this.resourcesPath + "data/images/treasury/fracture.png",
        ResourceManager.IMAGE_TREASURY_FRACTURE,
        ResourceManager.IMAGE_TREASURY_FRACTURE_ICON);
    this.loadImageWithIcon(this.resourcesPath + "data/images/treasury/fork.png",
        ResourceManager.IMAGE_TREASURY_FORK,
        ResourceManager.IMAGE_TREASURY_FORK_ICON);
    this.loadImageWithIcon(this.resourcesPath + "data/images/treasury/basket.png",
        ResourceManager.IMAGE_TREASURY_BASKET,
        ResourceManager.IMAGE_TREASURY_BASKET_ICON);
    this.loadImageWithIcon(this.resourcesPath + "data/images/treasury/curtain.png",
        ResourceManager.IMAGE_TREASURY_CURTAIN,
        ResourceManager.IMAGE_TREASURY_CURTAIN_ICON);
    this.loadImageWithIcon(this.resourcesPath + "data/images/treasury/comb.png",
        ResourceManager.IMAGE_TREASURY_COMB,
        ResourceManager.IMAGE_TREASURY_COMB_ICON);
    this.loadImageWithIcon(this.resourcesPath + "data/images/treasury/spider.png",
        ResourceManager.IMAGE_TREASURY_SPIDER,
        ResourceManager.IMAGE_TREASURY_SPIDER_ICON);
    this.loadImageWithIcon(this.resourcesPath + "data/images/treasury/glasses.png",
        ResourceManager.IMAGE_TREASURY_GLASSES,
        ResourceManager.IMAGE_TREASURY_GLASSES_ICON);
    this.loadImageWithIcon(this.resourcesPath + "data/images/treasury/shield.png",
        ResourceManager.IMAGE_TREASURY_SHIELD,
        ResourceManager.IMAGE_TREASURY_SHIELD_ICON);
    this.loadImageWithIcon(this.resourcesPath + "data/images/treasury/chain.png",
        ResourceManager.IMAGE_TREASURY_CHAIN,
        ResourceManager.IMAGE_TREASURY_CHAIN_ICON);
    this.loadImageWithIcon(this.resourcesPath + "data/images/treasury/web.png",
        ResourceManager.IMAGE_TREASURY_WEB,
        ResourceManager.IMAGE_TREASURY_WEB_ICON);

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
