import GameObjectRenderBase from './GameObjectRenderBase.js';


export default class ProgressBarGameObjectRenderBase extends GameObjectRenderBase {

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
