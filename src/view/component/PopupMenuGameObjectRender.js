import GameObjectRender from './GameObjectRender.js';
import {mainContainerElement} from '../container.js';

export default class PopupMenuGameObjectRender extends GameObjectRender {

  #popupMenuGameObject;
  
  #dialogEl;
    
  constructor(go) {
    super(go);
    this.#popupMenuGameObject = go;
    this.#dialogEl = document.createElement('dialog');
    
    const containerDiv = document.createElement('div');
    containerDiv.style.width = '100%';
    containerDiv.style.height = '100%';
    containerDiv.style.display = 'flex';
    containerDiv.style.flexDirection = 'column';
    
    const titleDiv = document.createElement('div');
    const closeButton = document.createElement('button');
    const titleText = document.createElement('div');
    
    closeButton.innerText = 'X';
    titleText.innerText = 'title';
    
    titleDiv.style.display = 'flex';
    titleDiv.style.flexFlow = 'row nowrap';
    closeButton.style.marginLeft = 'auto';
      
    titleDiv.append(titleText);
    titleDiv.append(closeButton);
    
    containerDiv.append(titleDiv);
    
    this.#dialogEl.append(containerDiv);
    for (let menuItem of this.#popupMenuGameObject.menuItems) {
      let button = document.createElement('button');
      button.innerText = menuItem.text;
      containerDiv.append(button);
    }
    mainContainerElement().append(this.#dialogEl);
    
    closeButton.addEventListener('click', (event) => {
        this.#dialogEl.close();
        this.#popupMenuGameObject.visible = false;
    });
  }

  step() {
    // TODO Auto-generated method stub
  }

  draw(independentCanvas) {
    if ((this.#popupMenuGameObject.visible) && (!this.#dialogEl.open)) {
      this.#dialogEl.showModal();
    }
  }

  get popupMenuGameObject() {
    return this.#popupMenuGameObject;
  }
  
  release() {
    super.release();
    this.#dialogEl.remove();
  }
}
