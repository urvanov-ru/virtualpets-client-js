import GameObjectRender from './GameObjectRender.js';
import {mainContainerElement} from '../container.js';
import ClickedArg from '../../domain/ClickedArg.js';

export default class PopupMenuGameObjectRender extends GameObjectRender {

  #dialogEl;
    
  constructor(go) {
    super(go);
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
    for (let index = 0; index < this.gameObject.menuItems.length; index++) {
      const menuItem = this.gameObject.menuItems[index]
      let button = document.createElement('button');
      button.innerText = menuItem.text
      button.addEventListener('click', this.#menuItemClicked.bind(this, index));
      containerDiv.append(button);
    }
    mainContainerElement().append(this.#dialogEl);
    
    closeButton.addEventListener('click', (event) => {
        this.#dialogEl.close();
        this.gameObject.visible = false;
    });
  }
  
  #menuItemClicked(index) {
    this.gameObject.menuItems[index].fireClicked(new ClickedArg());
    this.gameObject.visible = false;
    this.#dialogEl.close();
  }

  step() {
    // TODO Auto-generated method stub
  }

  draw(independentCanvas) {
    if ((this.gameObject.visible) && (!this.#dialogEl.open)) {
      this.#dialogEl.showModal();
    }
  }

  get popupMenuGameObject() {
    return this.gameObject;
  }
  
  release() {
    super.release();
    this.#dialogEl.remove();
  }
}
