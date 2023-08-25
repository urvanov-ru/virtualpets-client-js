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
  #refreshPetsListButton;
  #deletePetButton;
  #enterButton;
  #petsInfo;
  #selectedPetIndex = 0;

  
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
  
  constructor() {
    super();
  }
  
  showView() {
    super.showView();
    if (!this.#initialized) {
      this.#petsDiv = document.createElement('div');
      this.#southDiv = document.createElement('div');
      this.#createPetButton = document.createElement('button');
      this.#refreshPetsListButton = document.createElement('button');
      this.#deletePetButton = document.createElement('button');
      this.#enterButton = document.createElement('button');
      
      this.#petsDiv.style.display = 'flex';
      this.#petsDiv.style.flexDirection = 'column';
      this.#southDiv.style.display = 'flex';
      this.#southDiv.style.flexDirection = 'row';
      
      const createPetImageEl = document.createElement('div');
      const refreshPetsListImageEl = document.createElement('div');
      const deletePetImageEl = document.createElement('div');
      const enterImageEl = document.createElement('div');

      createPetImageEl.append(this.resourceManager.getImage(ResourceManager.IMAGE_ICON_CREATE));
      refreshPetsListImageEl.append(this.resourceManager.getImage(ResourceManager.IMAGE_ICON_REFRESH));
      deletePetImageEl.append(this.resourceManager.getImage(ResourceManager.IMAGE_ICON_DELETE));
      enterImageEl.append(this.resourceManager.getImage(ResourceManager.IMAGE_ICON_ACCEPT));

      this.#createPetButton.append(createPetImageEl);
      this.#refreshPetsListButton.append(refreshPetsListImageEl);
      this.#deletePetButton.append(deletePetImageEl);
      this.#enterButton.append(enterImageEl);
      
      this.#createPetButton.append(this.messageSource.getMessage(StringConstants.CREATE_PET));
      this.#refreshPetsListButton.append(this.messageSource.getMessage(StringConstants.REFRESH));
      this.#deletePetButton.append(this.messageSource.getMessage(StringConstants.DELETE_PET));
      this.#enterButton.append(this.messageSource.getMessage(StringConstants.LOGIN));
      
      this.#southDiv.append(this.#createPetButton);
      this.#southDiv.append(this.#refreshPetsListButton);
      this.#southDiv.append(this.#deletePetButton);
      this.#southDiv.append(this.#enterButton);
      
      this.containerDiv.append(this.#petsDiv);
      this.containerDiv.append(this.#southDiv);
      
      this.#refreshPetsListButton.addEventListener('click', this.#refreshClicked.bind(this));
      this.#createPetButton.addEventListener('click', this.#createClicked.bind(this));
      this.#enterButton.addEventListener('click', this.#enterClicked.bind(this));
      
      this.#initialized = true;
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
    this.#petsDiv.innerHTML = '';
    for (let petInfo of petsInfo) {
      const rowDiv = document.createElement('div');
      const petTextInfoDiv = document.createElement('div');
      const idLabel = document.createElement('label');
      const idDiv = document.createElement('div');
      const nameLabel = document.createElement('label');
      const nameDiv = document.createElement('div');
      const petTypeDiv = document.createElement('div');
      
      rowDiv.style.display = 'flex';
      rowDiv.style.flexDirection = 'row';
      petTextInfoDiv.style.display = 'flex';
      petTextInfoDiv.style.flexDirection = 'column';
      
      idLabel.for = idDiv;
      nameLabel.for = nameDiv;
      
      idLabel.innerText = 'ID';
      nameLabel.innerText = this.messageSource.getMessage(StringConstants.NAME);
      idDiv.innerText = petInfo.id;
      nameDiv.innerText = petInfo.name;
      switch (petInfo.petType) {
      case PetType.CAT:
        petTypeDiv.append(this.resourceManager.getImage(ResourceManager.IMAGE_CAT).cloneNode());
        break;
      }
      
      petTextInfoDiv.append(idLabel);
      petTextInfoDiv.append(idDiv);
      petTextInfoDiv.append(nameLabel);
      petTextInfoDiv.append(nameDiv);
            
      rowDiv.append(petTextInfoDiv);
      rowDiv.append(petTypeDiv);
      
      this.#petsDiv.append(rowDiv);
      
    }
  }

}