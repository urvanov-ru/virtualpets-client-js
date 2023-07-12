export default class ProgressInfoDiv {
  #progressDivElement;
  #progressLabelElement;
  #progressValueElement;
  
  constructor(container) {
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
    
    container.append(this.#progressDivElement);
    
  }
  
  get element() {
    return this.#progressDivElement;
  }
  
  set progressInfo(progressInfo) {
    this.#progressLabelElement.innerText = progressInfo.message;
    this.#progressValueElement.value = progressInfo.progress;
  }
  
  showView() {
    this.#progressDivElement.style.display = 'block';
  }
  
  hideView() {
    this.#progressDivElement.style.display = 'none';
  }
}