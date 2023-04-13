
export default class PopupMenuGameObjectRenderBase extends GameObjectRenderBase {

  _popupMenuGameObject;
    
  constructor(go) {
    super(go);
    this._popupMenuGameObject = go;
  }

  step() {
    // TODO Auto-generated method stub
  }

  draw(independentCanvas) {
	throw "Method 'draw' is not implemented";
  }

  get popupMenuGameObject() {
    return this._popupMenuGameObject;
  }
}
