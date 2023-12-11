import BaseGameLoadWorker from './BaseGameLoadWorker.js';
import ResourceManager from './ResourceManager.js';


export default class DressingRoomLoadWorker extends BaseGameLoadWorker {

  static get MAX_INDEX() { return 13; }

  constructor(resourceManager, scale, petType) {
    super(resourceManager, scale, petType);
    this.maxIndex = DressingRoomLoadWorker.MAX_INDEX + this.catImagesCount;
  }

  loadResourcesInBackground() {
    this.loadImageWithScale(this.resourcesPath + "data/images/dressingroom/background.png",
        ResourceManager.IMAGE_DRESSING_ROOM_BACKGROUND);
    
    this.loadImageWithScale(this.resourcesPath + "data/images/dressingroom/arrowleft.png",
        ResourceManager.IMAGE_DRESSING_ROOM_ARROW_LEFT);
    this.loadImageWithScale(this.resourcesPath + "data/images/dressingroom/arrowleft_hl.png",
        ResourceManager.IMAGE_DRESSING_ROOM_ARROW_LEFT_HIGHLIGHT);
    
    this.loadImageWithScale(this.resourcesPath + "data/images/dressingroom/hat.png",
        ResourceManager.IMAGE_DRESSING_ROOM_HAT);
    this.loadImageWithScale(this.resourcesPath + "data/images/dressingroom/hat_hl.png",
        ResourceManager.IMAGE_DRESSING_ROOM_HAT_HIGHLIGHT);
    
    this.loadImageWithScale(this.resourcesPath + "data/images/dressingroom/cloth.png",
        ResourceManager.IMAGE_DRESSING_ROOM_CLOTH);
    this.loadImageWithScale(this.resourcesPath + "data/images/dressingroom/cloth_hl.png",
        ResourceManager.IMAGE_DRESSING_ROOM_CLOTH_HIGHLIGHT);
    
    this.loadImageWithScale(this.resourcesPath + "data/images/dressingroom/bow.png",
        ResourceManager.IMAGE_DRESSING_ROOM_BOW);
    this.loadImageWithScale(this.resourcesPath + "data/images/dressingroom/bow_hl.png",
        ResourceManager.IMAGE_DRESSING_ROOM_BOW_HIGHLIGHT);
    
    this.loadImageWithScale(this.resourcesPath + "data/images/dressingroom/messagebox.png",
        ResourceManager.IMAGE_DRESSING_ROOM_MESSAGE_BOX);
    this.loadImageWithScale(this.resourcesPath + "data/images/dressingroom/messageboxbutton.png",
        ResourceManager.IMAGE_DRESSING_ROOM_MESSAGE_BOX_BUTTON);
    this.loadImageWithScale(this.resourcesPath + "data/images/dressingroom/messageboxbutton_hl.png",
        ResourceManager.IMAGE_DRESSING_ROOM_MESSAGE_BOX_BUTTON_HIGHLIGHT);
    this.loadImageWithScale(this.resourcesPath + "data/images/dressingroom/menuitem.png",
        ResourceManager.IMAGE_DRESSING_ROOM_MENU_ITEM);
    
    this.loadCatImages();
  }
}
