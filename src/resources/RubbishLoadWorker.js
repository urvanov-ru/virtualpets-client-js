import HiddenObjectsGameLoadWorker from './HiddenObjectsGameLoadWorker.js';
import ResourceManager from './ResourceManager.js';

export default class RubbishLoadWorker extends HiddenObjectsGameLoadWorker {
  static get MAX_INDEX() { return 53; }

  constructor(resourceManager, scale,
      petType) {
    super(resourceManager, scale, petType);
    this.maxIndex = RubbishLoadWorker.MAX_INDEX + this.foodIconsCount + this.catImagesCount + this.interfaceImagesCount
        + this.messageBoxCount + this.buildMaterialsCount + this.levelInfoCount
        + this.achievementInfoCount + this.drinkImagesCount + this.booksCount;
    
  }

  loadResourcesInBackground() {
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/rubbish/apple_bit.png",
        ResourceManager.IMAGE_RUBBISH_APPLE_BIT,
        ResourceManager.IMAGE_RUBBISH_APPLE_BIT_ICON);

    this.loadImageWithIcon(this.resourcesPath
        + "data/images/rubbish/background.png",
        ResourceManager.IMAGE_RUBBISH_BACKGROUND,
        ResourceManager.IMAGE_RUBBISH_BACKGROUND_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/rubbish/bear.png",
        ResourceManager.IMAGE_RUBBISH_BEAR,
        ResourceManager.IMAGE_RUBBISH_BEAR_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/rubbish/bone.png",
        ResourceManager.IMAGE_RUBBISH_BONE,
        ResourceManager.IMAGE_RUBBISH_BONE_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/rubbish/book.png",
        ResourceManager.IMAGE_RUBBISH_BOOK,
        ResourceManager.IMAGE_RUBBISH_BOOK_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/rubbish/box.png",
        ResourceManager.IMAGE_RUBBISH_BOX,
        ResourceManager.IMAGE_RUBBISH_BOX_ICON);

    this.loadImageWithIcon(this.resourcesPath
        + "data/images/rubbish/branch.png",
        ResourceManager.IMAGE_RUBBISH_BRANCH,
        ResourceManager.IMAGE_RUBBISH_BRANCH_ICON);

    this.loadImageWithIcon(this.resourcesPath
        + "data/images/rubbish/broom.png",
        ResourceManager.IMAGE_RUBBISH_BROOM,
        ResourceManager.IMAGE_RUBBISH_BROOM_ICON);
    

    this.loadImageWithIcon(this.resourcesPath
        + "data/images/rubbish/cassete.png",
        ResourceManager.IMAGE_RUBBISH_CASSETE,
        ResourceManager.IMAGE_RUBBISH_CASSETE_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/rubbish/cigarette_end.png",
        ResourceManager.IMAGE_RUBBISH_CIGARETTE_END,
        ResourceManager.IMAGE_RUBBISH_CIGARETTE_END_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/rubbish/cocacola.png",
        ResourceManager.IMAGE_RUBBISH_COCACOLA,
        ResourceManager.IMAGE_RUBBISH_COCACOLA_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/rubbish/coin.png",
        ResourceManager.IMAGE_RUBBISH_COIN,
        ResourceManager.IMAGE_RUBBISH_COIN_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/rubbish/crack.png",
        ResourceManager.IMAGE_RUBBISH_CRACK,
        ResourceManager.IMAGE_RUBBISH_CRACK_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/rubbish/decanter.png",
        ResourceManager.IMAGE_RUBBISH_DECANTER,
        ResourceManager.IMAGE_RUBBISH_DECANTER_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/rubbish/dragon.png",
        ResourceManager.IMAGE_RUBBISH_DRAGON,
        ResourceManager.IMAGE_RUBBISH_DRAGON_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/rubbish/feather.png",
        ResourceManager.IMAGE_RUBBISH_FEATHER,
        ResourceManager.IMAGE_RUBBISH_FEATHER_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/rubbish/game_console.png",
        ResourceManager.IMAGE_RUBBISH_GAME_CONSOLE,
        ResourceManager.IMAGE_RUBBISH_GAME_CONSOLE_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/rubbish/game_console2.png",
        ResourceManager.IMAGE_RUBBISH_GAME_CONSOLE2,
        ResourceManager.IMAGE_RUBBISH_GAME_CONSOLE2_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/rubbish/goblin.png",
        ResourceManager.IMAGE_RUBBISH_GOBLIN,
        ResourceManager.IMAGE_RUBBISH_GOBLIN_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/rubbish/gramophone.png",
        ResourceManager.IMAGE_RUBBISH_GRAMOPHONE,
        ResourceManager.IMAGE_RUBBISH_GRAMOPHONE_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/rubbish/gramophone_record.png",
        ResourceManager.IMAGE_RUBBISH_GRAMOPHONE_RECORD,
        ResourceManager.IMAGE_RUBBISH_GRAMOPHONE_RECORD_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/rubbish/gutter.png",
        ResourceManager.IMAGE_RUBBISH_GUTTER,
        ResourceManager.IMAGE_RUBBISH_GUTTER_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/rubbish/horseshoe.png",
        ResourceManager.IMAGE_RUBBISH_HORSESHOE,
        ResourceManager.IMAGE_RUBBISH_HORSESHOE_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/rubbish/house.png",
        ResourceManager.IMAGE_RUBBISH_HOUSE,
        ResourceManager.IMAGE_RUBBISH_HOUSE_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/rubbish/lamp.png",
        ResourceManager.IMAGE_RUBBISH_LAMP,
        ResourceManager.IMAGE_RUBBISH_LAMP_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/rubbish/lizard.png",
        ResourceManager.IMAGE_RUBBISH_LIZARD,
        ResourceManager.IMAGE_RUBBISH_LIZARD_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/rubbish/manhole.png",
        ResourceManager.IMAGE_RUBBISH_MANHOLE,
        ResourceManager.IMAGE_RUBBISH_MANHOLE_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/rubbish/newspaper.png",
        ResourceManager.IMAGE_RUBBISH_NEWSPAPER,
        ResourceManager.IMAGE_RUBBISH_NEWSPAPER_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/rubbish/newspaper2.png",
        ResourceManager.IMAGE_RUBBISH_NEWSPAPER2,
        ResourceManager.IMAGE_RUBBISH_NEWSPAPER2_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/rubbish/note.png",
        ResourceManager.IMAGE_RUBBISH_NOTE,
        ResourceManager.IMAGE_RUBBISH_NOTE_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/rubbish/notice.png",
        ResourceManager.IMAGE_RUBBISH_NOTICE,
        ResourceManager.IMAGE_RUBBISH_NOTICE_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/rubbish/notice2.png",
        ResourceManager.IMAGE_RUBBISH_NOTICE2,
        ResourceManager.IMAGE_RUBBISH_NOTICE2_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/rubbish/notice3.png",
        ResourceManager.IMAGE_RUBBISH_NOTICE3,
        ResourceManager.IMAGE_RUBBISH_NOTICE3_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/rubbish/notice4.png",
        ResourceManager.IMAGE_RUBBISH_NOTICE4,
        ResourceManager.IMAGE_RUBBISH_NOTICE4_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/rubbish/notice5.png",
        ResourceManager.IMAGE_RUBBISH_NOTICE5,
        ResourceManager.IMAGE_RUBBISH_NOTICE5_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/rubbish/octopus.png",
        ResourceManager.IMAGE_RUBBISH_OCTOPUS,
        ResourceManager.IMAGE_RUBBISH_OCTOPUS_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/rubbish/picture.png",
        ResourceManager.IMAGE_RUBBISH_PICTURE,
        ResourceManager.IMAGE_RUBBISH_PICTURE_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/rubbish/plant.png",
        ResourceManager.IMAGE_RUBBISH_PLANT,
        ResourceManager.IMAGE_RUBBISH_PLANT_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/rubbish/playing_card.png",
        ResourceManager.IMAGE_RUBBISH_PLAYING_CARD,
        ResourceManager.IMAGE_RUBBISH_PLAYING_CARD_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/rubbish/playing_card2.png",
        ResourceManager.IMAGE_RUBBISH_PLAYING_CARD2,
        ResourceManager.IMAGE_RUBBISH_PLAYING_CARD2_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/rubbish/playing_card3.png",
        ResourceManager.IMAGE_RUBBISH_PLAYING_CARD3,
        ResourceManager.IMAGE_RUBBISH_PLAYING_CARD3_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/rubbish/pot.png",
        ResourceManager.IMAGE_RUBBISH_POT,
        ResourceManager.IMAGE_RUBBISH_POT_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/rubbish/puddle.png",
        ResourceManager.IMAGE_RUBBISH_PUDDLE,
        ResourceManager.IMAGE_RUBBISH_PUDDLE_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/rubbish/rock_painting.png",
        ResourceManager.IMAGE_RUBBISH_ROCK_PAINTING,
        ResourceManager.IMAGE_RUBBISH_ROCK_PAINTING_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/rubbish/sir_anthony_at_the_piano.png",
        ResourceManager.IMAGE_RUBBISH_SIR_ANTHONY_AT_THE_PIANO,
        ResourceManager.IMAGE_RUBBISH_SIR_ANTHONY_AT_THE_PIANO_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/rubbish/stone.png",
        ResourceManager.IMAGE_RUBBISH_STONE,
        ResourceManager.IMAGE_RUBBISH_STONE_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/rubbish/table_lamp.png",
        ResourceManager.IMAGE_RUBBISH_TABLE_LAMP,
        ResourceManager.IMAGE_RUBBISH_TABLE_LAMP_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/rubbish/tape_recorder.png",
        ResourceManager.IMAGE_RUBBISH_TAPE_RECORDER,
        ResourceManager.IMAGE_RUBBISH_TAPE_RECORDER_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/rubbish/teapot.png",
        ResourceManager.IMAGE_RUBBISH_TEAPOT,
        ResourceManager.IMAGE_RUBBISH_TEAPOT_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/rubbish/thermometer.png",
        ResourceManager.IMAGE_RUBBISH_THERMOMETER,
        ResourceManager.IMAGE_RUBBISH_THERMOMETER_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/rubbish/tumbler_toy.png",
        ResourceManager.IMAGE_RUBBISH_TUMBLER_TOY,
        ResourceManager.IMAGE_RUBBISH_TUMBLER_TOY_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/rubbish/wall_clock.png",
        ResourceManager.IMAGE_RUBBISH_WALL_CLOCK,
        ResourceManager.IMAGE_RUBBISH_WALL_CLOCK_ICON);
    
    this.loadImageWithIcon(this.resourcesPath
        + "data/images/rubbish/white_bottle.png",
        ResourceManager.IMAGE_RUBBISH_WHITE_BOTTLE,
        ResourceManager.IMAGE_RUBBISH_WHITE_BOTTLE_ICON);

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
