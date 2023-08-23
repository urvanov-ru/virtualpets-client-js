export default class CreatePetView extends BaseHtmlView {
  #nameLabel;
  #typeLabel;
  #commentsLabel;
  #nameInput;
  #typeSelect;
  #commentInput;
  #createPetButton;

  resourceManager;
  messageSource;
  connectionInfo;
  settings;
  trayIcon;

  #initialized;
  
  showView() {
    super.showView();
    if (!this.#initialized) {
      this.#initialized = true;
    }
  }
  
  hideView() {
    super.hideView();
  }

}