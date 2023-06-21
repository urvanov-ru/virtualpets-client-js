import GameObjectRender from './GameObjectRender.js';


export default class ProgressBarGameObjectRender extends GameObjectRender {

  #progressBarGameObject;
    
  constructor(go) {
    super(go);
    this.#progressBarGameObject = go;
  }

  step() {
  }

  get progressBarGameObject() {
	this.#progressBarGameObject;
  }
}
