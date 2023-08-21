import ResourceManager from './ResourceManager.js';

import ProgressInfo from './ProgressInfo.js';

export default class ResourceLoader {

  #resourceManager;

  #context;

  maxIndex = 19;
  currentIndex = 0;

  /**
   * Загружает ресурсы в память.
   * 
   */
  loadResourcesInBackground() {
    // nMaxProgress=197;

    this.#loadImage("data/images/buttons/create.png", ResourceManager.IMAGE_ICON_CREATE);
    this.#loadImage("data/images/buttons/delete.png", ResourceManager.IMAGE_ICON_DELETE);
    this.#loadImage("data/images/buttons/revive.png", ResourceManager.IMAGE_ICON_REVIVE);
    this.#loadImage("data/images/buttons/refresh.png", ResourceManager.IMAGE_ICON_REFRESH);
    this.#loadImage("data/images/buttons/accept.png", ResourceManager.IMAGE_ICON_ACCEPT);
    this.#loadImage("data/images/buttons/say.png", ResourceManager.IMAGE_ICON_SAY);
    this.#loadImage("data/images/icons/ajax-loader.gif", ResourceManager.IMAGE_ICON_LOADING);
    this.#loadImage("data/images/buttons/information.png", ResourceManager.IMAGE_ICON_INFORMATION);
    this.#loadImage("data/images/buttons/joystick.png", ResourceManager.IMAGE_ICON_JOYSTICK);
    this.#loadImage("data/images/buttons/monitor.png", ResourceManager.IMAGE_ICON_MONITOR);
    this.#loadImage("data/images/buttons/social.png", ResourceManager.IMAGE_ICON_SOCIAL);
    this.#loadImage("data/images/buttons/facebook_32.png", ResourceManager.IMAGE_ICON_FACEBOOK);
    this.#loadImage("data/images/buttons/vkontakte_32.png", ResourceManager.IMAGE_ICON_VKONTAKTE);
    this.#loadImage("data/images/buttons/twitter_32.png", ResourceManager.IMAGE_ICON_TWITTER);

    //// значок в трее
    //Image image = this.#loadImage("data/images/ico.gif");
    //BufferedImage bufferedImage = BufferedImageCreator.createBufferedImage(image.getWidth(null),
    //    image.getHeight(null), true);
    //Graphics g = bufferedImage.getGraphics();
    //g.drawImage(image, 0, 0, null);
    //bufferedImage.flush();
    //Image imageTrayIcon = bufferedImage.getSubimage(0, 0, 16, 16);
    //Image imageTrayGrayIcon = bufferedImage.getSubimage(16, 0, 16, 16);
    //Image imageTrayWarningIcon = bufferedImage.getSubimage(32, 0, 16, 16);
    //ResourceHolder resourceHolder = new ResourceHolder();
    //resourceHolder.setResource(imageTrayIcon);
    //this.#resourceManager.putResource(ResourceManager.IMAGE_TRAY_ICON, resourceHolder);
    //let resourceHolder = new ResourceHolder();
    //resourceHolder.setResource(imageTrayGrayIcon);
    //this.#resourceManager.putResource(ResourceManager.IMAGE_TRAY_GRAY_ICON, resourceHolder);
    //resourceHolder = new ResourceHolder();
    //resourceHolder.setResource(imageTrayWarningIcon);
    //this.#resourceManager.putResource(ResourceManager.IMAGE_TRAY_WARNING_ICON, resourceHolder);
    

    this.#loadImage("data/images/smiles/happy.png", ResourceManager.IMAGE_ICON_SMILE);
    this.#loadImage("data/images/buttons/close.png", ResourceManager.IMAGE_ICON_CLOSE);
    this.#loadImage("data/images/buttons/erase.png", ResourceManager.IMAGE_ICON_ERASE);
    this.#loadImage("data/images/buttons/arrowleft.png", ResourceManager.IMAGE_ICON_ARROW_LEFT);
    this.#loadImage("data/images/buttons/arrowright.png", ResourceManager.IMAGE_ICON_ARROW_RIGHT);

    //Image img = resourceManager.loadImage("data/images/cat/cat1.png", ResourceManager.IMAGE_CAT);
    //BufferedImage bi = ImageToBufferedImage.toBufferedImage(img);
    //img = bi.getSubimage(0, 0, 150, 150);
    //resourceHolder = new ResourceHolder();
    //resourceHolder.setResource(img);
    //this.#resourceManager.putResource(ResourceManager.IMAGE_CAT, resourceHolder);
  }

  publish(chunks) {
    this.process(chunks);
  }
  
  #resourcesToLoad = [];
  
  #loadImage(path, resourceId) {
    this.#resourceManager.loadImage(path, resourceId, this.#loadedCallback.bind(this, path));
  }
  
  #loadedCallback(path) {
    if (this.currentIndex >= this.maxIndex) {
      throw new Error('Incorrect maxIndex value');
    }
    console.debug('loadedCallback currentIndex = %i, maxIndex = %i', this.currentIndex, this.maxIndex);
    this.currentIndex++;
    const publish = new Array(1);
    publish[0] = new ProgressInfo(
        ((this.currentIndex * 100) / this.maxIndex), path);
    publish.message = path;
    this.publish(publish);
    if (this.currentIndex == this.maxIndex) {
      this.done();
    }
  }

  /**
   * @param resourceManager the resourceManager to set
   */
  set resourceManager(resourceManager) {
    this.#resourceManager = resourceManager;
  }

  set applicationContext(context) {
    this.#context = context;
  }
}
