import BaseGameLoadWorker from './BaseGameLoadWorker.js';
import ResourceManager from './ResourceManager.js';
import ResourceHolder from './ResourceHolder.js';



export default class HiddenObjectsGameLoadWorker extends BaseGameLoadWorker {

  #iconSize;
  
  constructor(resourceManager,
      scale, petType) {
    super(resourceManager, scale, petType);
    this.#iconSize = 57 * scale;
  }
  
  
  loadInterfaceImages() {
    this.loadImageWithScale(
        this.resourcesPath + "data/images/treasury/interface.png",
        ResourceManager.IMAGE_TREASURY_INTERFACE);
    this.loadImageWithScale(this.resourcesPath
        + "data/images/treasury/interfacehidebtn.png",
        ResourceManager.IMAGE_TREASURY_HIDE_INTERFACE_BUTTON);
    this.loadImageWithScale(this.resourcesPath
        + "data/images/treasury/interfacehidebtn_hl.png",
        ResourceManager.IMAGE_TREASURY_HIDE_INTERFACE_BUTTON_HIGHLIGHT);
    this.loadImageWithScale(this.resourcesPath
        + "data/images/treasury/interfaceshowbtn.png",
        ResourceManager.IMAGE_TREASURY_SHOW_INTERFACE_BUTTON);
    this.loadImageWithScale(this.resourcesPath
        + "data/images/treasury/interfaceshowbtn_hl.png",
        ResourceManager.IMAGE_TREASURY_SHOW_INTERFACE_BUTTON_HIGHLIGHT);

    this.loadImageWithScale(this.resourcesPath
        + "data/images/treasury/messagebox.png",
        ResourceManager.IMAGE_TREASURY_MESSAGE_BOX);
    this.loadImageWithScale(this.resourcesPath
        + "data/images/treasury/messageboxbtn.png",
        ResourceManager.IMAGE_TREASURY_MESSAGE_BOX_BUTTON);
    this.loadImageWithScale(this.resourcesPath
        + "data/images/treasury/messageboxbtn_hl.png",
        ResourceManager.IMAGE_TREASURY_MESSAGE_BOX_BUTTON_HIGHLIGHT);
  }

  get interfaceImagesCount() {
    return 8;
  }
  
  createPlayersIcons() {
    
    let resourceHolder = new ResourceHolder();
    resourceHolder.resource = new OffscreenCanvas(1, 1);
    this.resourceManager.putResource(
        ResourceManager.IMAGE_TREASURY_PLAYER_ICON_1, resourceHolder);
    resourceHolder = new ResourceHolder();
    resourceHolder.resource = new OffscreenCanvas(1, 1);
    this.resourceManager.putResource(
        ResourceManager.IMAGE_TREASURY_PLAYER_ICON_2, resourceHolder);
    resourceHolder = new ResourceHolder();
    resourceHolder.resource = new OffscreenCanvas(1, 1);
    this.resourceManager.putResource(
        ResourceManager.IMAGE_TREASURY_PLAYER_ICON_3, resourceHolder);
    resourceHolder = new ResourceHolder();
    resourceHolder.resource = new OffscreenCanvas(1, 1);
    this.resourceManager.putResource(
        ResourceManager.IMAGE_TREASURY_PLAYER_ICON_4, resourceHolder);
  }
  
  loadImageWithIcon(path, resourceId,
      resourceIconId) {
    this.resourceManager.loadImageWithScale(path, resourceId, this.scale, this.loadedCallback.bind(this, path));
      const image = this.resourceManager.loadImage(path, (callbackArg) => {
      const w = callbackArg.image.width;
      const h = callbackArg.image.height;
      const max = Math.max(w, h);
      if (max <= this.#iconSize) {
        const resourceHolder = new ResourceHolder();
        resourceHolder.resource = callbackArg.image;
        resourceHolder.resetInScale = true;
        this.resourceManager.putResource(resourceIconId, resourceHolder);
        this.loadedCallback(path);
      } else {
        const fw = this.#iconSize / max * w;
        const fh = this.#iconSize / max * h;
          
        Promise.all([createImageBitmap(callbackArg.image, 0, 0, callbackArg.image.width, callbackArg.image.height,
        {
          resizeWidth: Math.round(fw),
          resizeHeight: Math.round(fh),
          resizeQuality: 'high'} )] )
        .then((sprites) => {
            console.debug("Resource %s loaded with resourceId = %i. ImageBitmap = %o.", path, resourceId, sprites[0]);
            const resourceHolder = new ResourceHolder();
            resourceHolder.resetInScale = true;
            resourceHolder.resource = sprites[0];
            this.resourceManager.putResource(resourceIconId, resourceHolder);
            this.loadedCallback(path);
        });
      }
    });
  }
}
