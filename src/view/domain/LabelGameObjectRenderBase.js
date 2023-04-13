
export default class LabelGameObjectRenderBase extends GameObjectRenderBase {
    
  _labelGameObject;
    
  constructor(go) {
    super(go);
    this._labelGameObject = go;
  }
    
  step() {
    // TODO Auto-generated method stub
  }

  draw(independentCanvas) {
	throw "Method 'draw' is not implemeneted"
  }

  get labelGameObject() {
    return this._labelGameObject;
  }
}
