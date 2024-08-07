// localization
import StringConstants from '../localization/StringConstants.js';

// view
import BaseHtmlView from './BaseHtmlView.js';

// rest
import PetType from '../rest/domain/PetType.js';
import CreatePetArg from '../rest/domain/CreatePetArg.js';


export default class CreatePetView extends BaseHtmlView {
  #createPetListeners = [];
  
  #nameLabel;
  #typeLabel;
  #commentLabel;
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
      this.#nameLabel = document.createElement('label');
      this.#typeLabel = document.createElement('label');
      this.#commentLabel = document.createElement('label');
      this.#nameInput = document.createElement('input');
      this.#typeSelect = document.createElement('select');
      this.#commentInput = document.createElement('input');
      this.#createPetButton = document.createElement('button');
      
      this.#nameLabel.for = this.#nameInput;
      this.#typeLabel.for = this.#typeSelect;
      this.#commentLabel.for = this.#commentInput;
      
      this.#nameLabel.innerText = this.messageSource.getMessage(StringConstants.NAME);
      this.#typeLabel.innerText = this.messageSource.getMessage(StringConstants.TYPE);
      this.#commentLabel.innerText = this.messageSource.getMessage(StringConstants.COMMENT);
      this.#createPetButton.innerText = this.messageSource.getMessage(StringConstants.CREATE_PET);
      
      this.#typeSelect.add(new Option(this.messageSource.getMessage(StringConstants.CAT), PetType.CAT));
      
      this.containerDiv.append(this.#nameLabel);
      this.containerDiv.append(this.#nameInput);
      this.containerDiv.append(this.#typeLabel);
      this.containerDiv.append(this.#typeSelect);
      this.containerDiv.append(this.#commentLabel);
      this.containerDiv.append(this.#commentInput);
      this.containerDiv.append(this.#createPetButton);
      
      this.#createPetButton.addEventListener('click', this.#createPetClicked.bind(this));
      
      this.#initialized = true;
      this.title = this.messageSource.getMessage(StringConstants.CREATE_PET_VIEW_TITLE);
    }
  }
  
  hideView() {
    super.hideView();
  }
  
  addCreateListener(listener) {
    this.#createPetListeners.push(listener);
  }
  
  #createPetClicked() {
    for (let listener of this.#createPetListeners) {
      const createPetArg = new CreatePetArg();
      createPetArg.name = this.#nameInput.value;
      createPetArg.petType = this.#typeSelect.selectedOptions[0].value
      createPetArg.comment = this.#commentInput.value;
      listener(this, createPetArg);
    }
  }

}