import BaseGameLoadWorker from './BaseGameLoadWorker.js';
import ResourceManager from './ResourceManager.js';
import ResourceHolder from './ResourceHolder.js';
import ProgressInfo from './ProgressInfo.js';

// rest
import PetType from '../api/domain/PetType.js';

export default class TownLoadWorker extends BaseGameLoadWorker {
  static get MAX_INDEX() { return 11; }

  constructor(resourceManager, scale,
      petType) {
    super(resourceManager, scale, petType);
    this.maxIndex = TownLoadWorker.MAX_INDEX + this.levelInfoCount + this.achievementInfoCount
        + this.journalCount;
  }

  loadResourcesInBackground() {
    this.loadImageWithScale(this.resourcesPath + "data/images/town/background.png",
        ResourceManager.IMAGE_TOWN_BACKGROUND);

    this.loadImageWithScale(this.resourcesPath + "data/images/town/treasury.png",
        ResourceManager.IMAGE_TOWN_TREASURY);

    this.loadImageWithScale(this.resourcesPath + "data/images/town/treasury_hl.png",
        ResourceManager.IMAGE_TOWN_TREASURY_HIGHLIGHT);

    this.loadImageWithScale(this.resourcesPath + "data/images/town/arrowleft.png",
        ResourceManager.IMAGE_TOWN_ARROW_LEFT);

    this.loadImageWithScale(this.resourcesPath + "data/images/town/arrowleft_hl.png",
        ResourceManager.IMAGE_TOWN_ARROW_LEFT_HIGHLIGHT);

    this.loadImageWithScale(this.resourcesPath + "data/images/town/dressingroom.png",
        ResourceManager.IMAGE_TOWN_DRESSING_ROOM);

    this.loadImageWithScale(this.resourcesPath
        + "data/images/town/dressingroom_hl.png",
        ResourceManager.IMAGE_TOWN_DRESSING_ROOM_HIGHLIGHT);

    this.loadImageWithScale(this.resourcesPath + "data/images/town/rubbish.png",
        ResourceManager.IMAGE_TOWN_RUBBISH);

    this.loadImageWithScale(this.resourcesPath + "data/images/town/rubbish_hl.png",
        ResourceManager.IMAGE_TOWN_RUBBISH_HIGHLIGHT);
    
    this.loadImageWithScale(this.resourcesPath + "data/images/town/afternoontea.png",
        ResourceManager.IMAGE_TOWN_AFTERNOONTEA);

    this.loadImageWithScale(this.resourcesPath + "data/images/town/afternoontea_hl.png",
        ResourceManager.IMAGE_TOWN_AFTERNOONTEA_HIGHLIGHT);

    this.loadLevelInfo();
    this.loadAchievementInfo();
    this.loadJournal();
  }
}
