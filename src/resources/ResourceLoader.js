

export default class ResourceLoader {

  #resourceManager;

  #context;

  #maxProgress = 21;// вычел смайлики и картинки кроша. И картинки
  // тукса. И картинки Konqi.

  #progress = 0;

  /**
   * Загружает ресурсы в память.
   * 
   */
  loadResources() {
    // nMaxProgress=197;

    this.#resourceManager.loadImage("data/images/buttons/create.png", ResourceManager.IMAGE_ICON_CREATE);
    incProgress();
    this.#resourceManager.loadImage("data/images/buttons/delete.png", ResourceManager.IMAGE_ICON_DELETE);
    incProgress();
    this.#resourceManager.loadImage("data/images/buttons/revive.png", ResourceManager.IMAGE_ICON_REVIVE);
    incProgress();
    this.#resourceManager.loadImage("data/images/buttons/refresh.png", ResourceManager.IMAGE_ICON_REFRESH);
    incProgress();
    this.#resourceManager.loadImage("data/images/buttons/accept.png", ResourceManager.IMAGE_ICON_ACCEPT);
    incProgress();
    this.#resourceManager.loadImage("data/images/buttons/say.png", ResourceManager.IMAGE_ICON_SAY);
    incProgress();
    this.#resourceManager.loadImage("data/images/icons/ajax-loader.gif", ResourceManager.IMAGE_ICON_LOADING);
    incProgress();
    this.#resourceManager.loadImage("data/images/buttons/information.png", ResourceManager.IMAGE_ICON_INFORMATION);
    incProgress();
    this.#resourceManager.loadImage("data/images/buttons/joystick.png", ResourceManager.IMAGE_ICON_JOYSTICK);
    incProgress();
    this.#resourceManager.loadImage("data/images/buttons/monitor.png", ResourceManager.IMAGE_ICON_MONITOR);
    incProgress();
    this.#resourceManager.loadImage("data/images/buttons/social.png", ResourceManager.IMAGE_ICON_SOCIAL);
    incProgress();
    this.#resourceManager.loadImage("data/images/buttons/facebook_32.png", ResourceManager.IMAGE_ICON_FACEBOOK);
    incProgress();
    this.#resourceManager.loadImage("data/images/buttons/vkontakte_32.png", ResourceManager.IMAGE_ICON_VKONTAKTE);
    this.#resourceManager.loadImage("data/images/buttons/twitter_32.png", ResourceManager.IMAGE_ICON_TWITTER);
    incProgress();

    //// значок в трее
    //Image image = this.#resourceManager.loadImage("data/images/ico.gif");
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
    this.#resourceManager.putResource(ResourceManager.IMAGE_TRAY_ICON, resourceHolder);
    let resourceHolder = new ResourceHolder();
    resourceHolder.setResource(imageTrayGrayIcon);
    this.#resourceManager.putResource(ResourceManager.IMAGE_TRAY_GRAY_ICON, resourceHolder);
    resourceHolder = new ResourceHolder();
    resourceHolder.setResource(imageTrayWarningIcon);
    this.#resourceManager.putResource(ResourceManager.IMAGE_TRAY_WARNING_ICON, resourceHolder);

    this.#resourceManager.loadImage("data/images/smiles/happy.png", ResourceManager.IMAGE_ICON_SMILE);
    incProgress();
    this.#resourceManager.loadImage("data/images/buttons/close.png", ResourceManager.IMAGE_ICON_CLOSE);
    incProgress();
    this.#resourceManager.loadImage("data/images/buttons/erase.png", ResourceManager.IMAGE_ICON_ERASE);
    incProgress();
    this.#resourceManager.loadImage("data/images/buttons/arrowleft.png", ResourceManager.IMAGE_ICON_ARROW_LEFT);
    incProgress();
    this.#resourceManager.loadImage("data/images/buttons/arrowright.png", ResourceManager.IMAGE_ICON_ARROW_RIGHT);
    incProgress();

    //Image img = resourceManager.loadImage("data/images/cat/cat1.png", ResourceManager.IMAGE_CAT);
    //BufferedImage bi = ImageToBufferedImage.toBufferedImage(img);
    //img = bi.getSubimage(0, 0, 150, 150);
    //resourceHolder = new ResourceHolder();
    //resourceHolder.setResource(img);
    //this.#resourceManager.putResource(ResourceManager.IMAGE_CAT, resourceHolder);
    incProgress();
  }

  incProgress() {
    this.#progress++;
    publish(progress);
  }

  /**
   * @param resourceManager the resourceManager to set
   */
  set resourceManager(resourceManager) {
    this.#resourceManager = resourceManager;
  }

  /**
   * @return the maxProgress
   */
  get maxProgress() {
    return this.#maxProgress;
  }

  set applicationContext(context) {
    this.#context = context;
  }
}
