
export default class ProgressBarGameObjectRenderBase extends GameObjectRenderBase {

  _progressBarGameObject;
    
  constructor(go) {
    super(go);
    this._progressBarGameObject = go;
  }

  step() {
  }

  get progressBarGameObject() {
	this._progressBarGameObject;
  }
}
