
export default class LabelGameObjectRenderBase extends GameObjectRenderBase {
    
  labelGameObject;
    
  constructor(go) {
    super(go);
    this.labelGameObject = go;
  }
    
  step() {
    // TODO Auto-generated method stub
  }

  draw(independentCanvas) {
	throw "Method 'draw' is not implemeneted"
  }

  getLabelGameObject() {
    return labelGameObject;
  }
}
