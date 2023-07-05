export default class ProgressInfoDiv {
  #progressDivElement;
  #progressLabelElement;
  #progressValueElement;
  
  constructor(width, height) {
    this.#progressDivElement = document.createElement('div');
	this.#progressLabelElement = document.createElement('div');
	this.#progressValueElement = document.createElement('progress');
	this.#progressDivElement.append(centerDiv);
	this.#progressDivElement.append(this.#progressLabelElement);
	this.#progressDivElement.append(this.#progressValueElement);
	this.#progressValueElement.max = 100;
	this.#progressValueElement.value = 0;
	if (width) {
	  this.#progressDivElement.style.width = width + 'px';
	}
	if (height) {
	  this.#progressDivElement.style.height = height + 'px';
	}
  }
  
  get element() {
    return this.#progressDivElement;
  }
  
  set progressInfo(progressInfo) {
    this.#progressLabelElement.innerText = progressInfo.message;
    this.#progressValueElement.value = progressInfo.progress;
  }
}