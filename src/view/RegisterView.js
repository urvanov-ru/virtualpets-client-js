export default class RegisterView {
  #loginLabel;
  #loginInput;
  #passwordLabel;
  #passwordInput;
  #emailLabel;
  #emailInput;
  #registerButton;
  #registerViewDiv;
  #host;
  #initialized = false;
  #version;
  #settings;
  #waitPanel;

  #messageSource;
  #resourceManager;
  
  constructor(width, height, host, messageSource) {
    this.#host = host;
    this.#loginLabel = document.createElement('label');
    this.#loginInput = document.createElement('input');
    this.#loginInput.type = 'text';
    this.#passwordLabel = document.createElement('label');
    this.#passwordInput = document.createElement('input');
    this.#passwordInput.type = 'password';
    this.#emailLabel = document.createElement('label');
    this.#emailInput = document.createElement('input');
    this.#emailInput.type = 'email';
    this.#registerButton = document.createElement('input');
    this.#registerButton.type = 'button';
    this.#registerViewDiv = document.createElement('div');
    this.#registerViewDiv.append(this.#loginLabel);
    this.#registerViewDiv.append(this.#loginInput);
    this.#registerViewDiv.append(this.#passwordLabel);
    this.#registerViewDiv.append(this.#passwordInput);
    this.#registerViewDiv.append(this.#emailLabel);
    this.#regsiterViewDiv.append(this.#emailInput);
    this.#registerViewDiv.append(this.#registerButton);
    if (width) {
      this.#registerViewDiv.style.width = width + 'px';
    }
    if (height) {
      this.#registerViewDiv.style.height = height + 'px';
    }
    this.#registerViewDiv.addEventListener('click', this.onRegisterClicked.bind(this));
  }
  
  get element() {
    return this.#registerViewDiv;
  }
  
  onRegisterClicked() {
    
  }
  
}