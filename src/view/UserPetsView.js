// localization
import StringConstants from '../localization/StringConstants.js';

// trayIcon
import MessageType from '../trayicon/MessageType.js';

// view
import BaseHtmlView from './BaseHtmlView.js';

// resources
import ResourceManager from '../resources/ResourceManager.js';

// rest
import PetType from '../rest/domain/PetType.js';
import SelectPetArg from '../rest/domain/SelectPetArg.js';

export default class UserPetsView extends BaseHtmlView{
  #petsDiv;
  #southDiv;
  #createPetButton;
  #previousPetButton;
  #refreshPetsListButton;
  #nextPetButton;
  #deletePetButton;
  #enterButton;
  #petsInfo;
  #selectedPetIndex = 0;
  
  #rowDiv;
  #petTextInfoDiv;
  #idLabel;
  #idDiv;
  #nameLabel;
  #nameDiv;
  #petTypeDiv;

  
  #autoSelectPetName;
  resourceManager;
  connectionInfo;
  settings;
  trayIcon;
  messageSource;
  createPetFrame;
  chatFrame;
  
  #initialized = false;
  
  #refreshListeners = [];
  #createListeners = [];
  #selectListeners = [];
  #deleteListeners = [];
  
  constructor() {
    super();
  }
  
  showView() {
    super.showView();
    if (!this.#initialized) {
      this.#petsDiv = document.createElement('div');
      this.#southDiv = document.createElement('div');
      this.#createPetButton = document.createElement('button');
      this.#previousPetButton = document.createElement('button');
      this.#refreshPetsListButton = document.createElement('button');
      this.#nextPetButton = document.createElement('button');
      this.#deletePetButton = document.createElement('button');
      this.#enterButton = document.createElement('button');
      
      this.#petsDiv.style.display = 'flex';
      this.#petsDiv.style.flexDirection = 'column';
      this.#southDiv.style.display = 'flex';
      this.#southDiv.style.flexDirection = 'row';
      
      this.#rowDiv = document.createElement('div');
      this.#petTextInfoDiv = document.createElement('div');
      this.#idLabel = document.createElement('label');
      this.#idDiv = document.createElement('div');
      this.#nameLabel = document.createElement('label');
      this.#nameDiv = document.createElement('div');
      this.#petTypeDiv = document.createElement('div');
      
      
      this.#rowDiv.style.display = 'flex';
      this.#rowDiv.style.flexDirection = 'row';
      this.#petTextInfoDiv.style.display = 'flex';
      this.#petTextInfoDiv.style.flexDirection = 'column';
      
      this.#idLabel.for = this.#idDiv;
      this.#nameLabel.for = this.#nameDiv;
      
      this.#idLabel.innerText = 'ID';
      this.#nameLabel.innerText = this.messageSource.getMessage(StringConstants.NAME);

      // Пока только один тип питомца "кошка"
      this.#petTypeDiv.append(this.resourceManager.getImage(ResourceManager.IMAGE_CAT).cloneNode());
      
      this.#petTextInfoDiv.append(this.#idLabel);
      this.#petTextInfoDiv.append(this.#idDiv);
      this.#petTextInfoDiv.append(this.#nameLabel);
      this.#petTextInfoDiv.append(this.#nameDiv);
    
      this.#rowDiv.append(this.#petTextInfoDiv);
      this.#rowDiv.append(this.#petTypeDiv);
      this.#petsDiv.append(this.#rowDiv);
      
      
      const createPetImageEl = document.createElement('div');
      const previousPetImageEl = document.createElement('div');
      const refreshPetsListImageEl = document.createElement('div');
      const nextPetImageEl = document.createElement('div');
      const deletePetImageEl = document.createElement('div');
      const enterImageEl = document.createElement('div');
      
      

      createPetImageEl.append(this.resourceManager.getImage(ResourceManager.IMAGE_ICON_CREATE));
      previousPetImageEl.append(this.resourceManager.getImage(ResourceManager.IMAGE_ICON_ARROW_LEFT));
      refreshPetsListImageEl.append(this.resourceManager.getImage(ResourceManager.IMAGE_ICON_REFRESH));
      nextPetImageEl.append(this.resourceManager.getImage(ResourceManager.IMAGE_ICON_ARROW_RIGHT));
      deletePetImageEl.append(this.resourceManager.getImage(ResourceManager.IMAGE_ICON_DELETE));
      enterImageEl.append(this.resourceManager.getImage(ResourceManager.IMAGE_ICON_ACCEPT));

      this.#createPetButton.append(createPetImageEl);
      this.#previousPetButton.append(previousPetImageEl);
      this.#refreshPetsListButton.append(refreshPetsListImageEl);
      this.#nextPetButton.append(nextPetImageEl);
      this.#deletePetButton.append(deletePetImageEl);
      this.#enterButton.append(enterImageEl);
      
      this.#createPetButton.append(this.messageSource.getMessage(StringConstants.CREATE_PET));
      this.#previousPetButton.append(this.messageSource.getMessage(StringConstants.PREVIOUS_PET));
      this.#refreshPetsListButton.append(this.messageSource.getMessage(StringConstants.REFRESH));
      this.#nextPetButton.append(this.messageSource.getMessage(StringConstants.NEXT_PET));
      this.#deletePetButton.append(this.messageSource.getMessage(StringConstants.DELETE_PET));
      this.#enterButton.append(this.messageSource.getMessage(StringConstants.LOGIN));
      
      this.#southDiv.append(this.#createPetButton);
      this.#southDiv.append(this.#previousPetButton);
      this.#southDiv.append(this.#refreshPetsListButton);
      this.#southDiv.append(this.#nextPetButton);
      this.#southDiv.append(this.#deletePetButton);
      this.#southDiv.append(this.#enterButton);
      
      this.containerDiv.append(this.#petsDiv);
      this.containerDiv.append(this.#southDiv);
      
      
      this.#refreshPetsListButton.addEventListener('click', this.#refreshClicked.bind(this));
      this.#createPetButton.addEventListener('click', this.#createClicked.bind(this));
      this.#enterButton.addEventListener('click', this.#enterClicked.bind(this));
      this.#deletePetButton.addEventListener('click', this.#deleteClicked.bind(this));
      
      this.#previousPetButton.addEventListener('click', this.#previousClicked.bind(this));
      this.#nextPetButton.addEventListener('click', this.#nextClicked.bind(this));
      
      this.#initialized = true;
      this.title = this.messageSource.getMessage(StringConstants.USER_PETS_VIEW_TITLE);
    }
    this.containerDiv.style.display = 'flex';
  }
  
  hideView() {
    super.hideView();
  }
  
  addRefreshListener(listener) {
    this.#refreshListeners.push(listener);
  }
  
  addCreateListener(listener) {
    this.#createListeners.push(listener);
  }
  
  addSelectListener(listener) {
    this.#selectListeners.push(listener);
  }
  
  addDeleteListener(listener) {
    this.#deleteListeners.push(listener);
  }
  
  #refreshClicked() {
    for (let listener of this.#refreshListeners) {
      listener(this);
    }
  }
  
  #createClicked() {
    for (let listener of this.#createListeners) {
      listener(this);
    }
  }
  
  #enterClicked() {
    const selectPetArg = new SelectPetArg();
    selectPetArg.petId = this.#petsInfo[this.#selectedPetIndex].id;
    selectPetArg.petName = this.#petsInfo[this.#selectedPetIndex].name;
    selectPetArg.petType = this.#petsInfo[this.#selectedPetIndex].petType;
    for (let listener of this.#selectListeners) {
      
      listener(this, selectPetArg);
    }
  }
  
  set petsInfo(petsInfo) {
    this.#petsInfo = petsInfo;
    this.#refreshPetDiv();
  }

  #refreshPetDiv() {
    if (this.#selectedPetIndex >= this.#petsInfo.length || this.#selectedPetIndex === -1) {
      this.#selectedPetIndex = this.#petsInfo.length - 1;
    }
    if (this.#selectedPetIndex >= 0) {
      let petInfo  = this.#petsInfo[this.#selectedPetIndex];
      this.#idDiv.innerText = petInfo.id;
      this.#nameDiv.innerText = petInfo.name;
    } else {
      this.#idDiv.innerText = '';
      this.#nameDiv.innerText = '';
    }
    
  }
  
  #previousClicked() {
    if (this.#selectedPetIndex > 0) {
      this.#selectedPetIndex--;
    }
    this.#refreshPetDiv();
  }
  
  #nextClicked() {
    if (this.#selectedPetIndex < this.#petsInfo.length - 1) {
      this.#selectedPetIndex++;
    }
    this.#refreshPetDiv();
  }
  
  #deleteClicked() {
    if (confirm(this.messageSource.getMessage(StringConstants.DELETE_PET))) {
      for (let listener of this.#deleteListeners) {
        listener(this, this.#petsInfo[this.#selectedPetIndex].id);
      }
    }
  }

}

