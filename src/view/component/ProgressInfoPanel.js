import {mainContainerElement} from '../container.js';

export default class ProgressInfoDiv {
  #progressDivElement;
  #progressLabelElement;
  #progressValueElement;
  #initialized = false;
  
  get element() {
    return this.#progressDivElement;
  }
  
  set progressInfo(progressInfo) {
    this.#progressLabelElement.innerText = progressInfo.message;
    this.#progressValueElement.value = progressInfo.progress;
  }
  
  showView() {
    if (!this.#initialized) {
      this.#progressDivElement = document.createElement('div');
      this.#progressLabelElement = document.createElement('div');
      this.#progressValueElement = document.createElement('progress');
      this.#progressValueElement.max = 100;
      this.#progressValueElement.value = 0;
      this.#progressDivElement.style.width = '100%';
      this.#progressDivElement.style.height = '100%';
      this.#progressDivElement.style.display = 'none';
    
      this.#progressDivElement.append(this.#progressLabelElement);
      this.#progressDivElement.append(this.#progressValueElement);
    
      mainContainerElement().append(this.#progressDivElement);
      this.#initialized = true;
    }
    this.#progressDivElement.style.display = 'block';
  }
  
  hideView() {
    this.#progressDivElement.style.display = 'none';
  }
}