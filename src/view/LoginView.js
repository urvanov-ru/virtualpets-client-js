export default class LoginView {
  #messageSource;
  #progressFrame;
  #settings;
  #connectionInfo;
  #resourceManager;
  #registerFrame;
  #version;
  #userPetsFrame;
  #recoverPasswordFrame;
  #restoreSessionPanel;
  #cancelRestoreSessionButton;
  #restoreSessionLabel;
  
  #loginLabel;
  #loginInput;
  #passwordLabel;
  #passwordInput;
  #registerButton;
  #loginButton;
  #recoverPasswordButton;
  
  #initialized = false;
  
  constructor(width, height, messageSource, settings, registerFrame) {
    this.#messageSource = messageSource;
    this.#settings = settings;
    this.#registerFrame = registerFrame;
    
  }
  
  showView() {
    if (!initialized) {
      this.#loginLabel = document.createElement('label');
      this.#loginInput = document.createElement('input');
      this.#passwordLabel = document.createElement('label');
      this.#passwordInput = document.createElement('input');
      this.#registerButton = document.createElement('button');
      this.#loginButton = document.createElement('button');
      this.#recoverPasswordButton = ducment.createElement('button');
      
      this.#loginLabel.for = this.#loginInput;
      this.#passwordLabel.for = this.#passwordInput;
      
    }
  }
}