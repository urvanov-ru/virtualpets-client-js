export default class ProgressInfoDiv {
  #progressDivElement;
  #progressLabelElement;
  #progressValueElement;
  
  constructor() {
    this.#progressDivElement = document.createElement('div');
	this.#progressLabelElement = document.createElement('p');
	this.#progressValueElement = document.createElement('progress');
	this.#progressDivElement.append(this.#progressLabelElement);
	this.#progressDivElement.append(this.#progressValueElement);
	this.#progressValueElement.max = 100;
	this.#progressValueElement.value = 0;
	this.#progressDivElement.width = canvas.width;
	this.#progressDivElement.height = canvas.height;
  }
  
  get element() {
    return this.#progressDivElement;
  }
  
  set progressInfo(progressInfo) {
    this.#progressLabelElement.innerText = progressInfo.message;
    this.#progressValueElement.value = progressInfo.progress;
  }
}