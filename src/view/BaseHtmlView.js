
import {mainContainerElement} from './container.js';

export default class BaseHtmlView {

  static viewStack = [];

  containerDiv;
  #titleDiv;
  #titleText;
  #closeButton;
  
  #initialized = false;

  showView() {
    const lastViewIndex = BaseHtmlView.viewStack.length - 1;
    if (lastViewIndex >= 0) {
      BaseHtmlView.viewStack[lastViewIndex].containerDiv.style.display = 'none';
    }
    if (!this.#initialized) {
      this.containerDiv = document.createElement('div');
      
      this.#titleDiv = document.createElement('div');
      this.#closeButton = document.createElement('button');
      this.#titleText = document.createElement('div');
      
      this.#closeButton.innerText = 'X';
      this.#titleText.innerText = 'title';
      
      this.#titleDiv.style.display = 'flex';
      this.#titleDiv.style.flexFlow = 'row nowrap';
      
      this.#closeButton.style.marginLeft = 'auto';
      
      this.#titleDiv.append(this.#titleText);
      this.#titleDiv.append(this.#closeButton);
      
      
      this.#titleDiv.id = 'titleDiv';
      this.#titleText.id = 'titleText';
      this.#closeButton.id = 'closeButton';
      
      this.containerDiv.style.width = '100%';
      this.containerDiv.style.height = '100%';
      this.containerDiv.style.display = 'none';
      this.containerDiv.style.flexDirection = 'column';
      
      this.containerDiv.append(this.#titleDiv);
      
      mainContainerElement().append(this.containerDiv);
      
      this.#closeButton.addEventListener('click', (event) => {this.hideView();});
      this.#initialized = true;
    }
    this.containerDiv.style.display = 'flex';
    BaseHtmlView.viewStack.push(this);
  }
  
  hideView() {
    BaseHtmlView.viewStack.pop(); // remove self
    this.containerDiv.style.display = 'none';
    if (BaseHtmlView.viewStack.length > 0) {
      const lastView = BaseHtmlView.viewStack.pop(); // get before self view
      lastView.showView();
    }
  }
  
  set closeable(closeable) {
    this.#closeButton.disabled = !closeable;
  }
  
  set titleBarVisible(titleBarVisible) {
    this.#titleDiv.style.display = 'none';
  }
  
  set title(title) {
    this.#titleText.innerText = title;
  }
}