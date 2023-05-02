import GameObjectRenderBase from './GameObjectRenderBase.js';


export default class PopupMenuGameObjectRenderBase extends GameObjectRenderBase {

  #popupMenuGameObject;
    
  constructor(go) {
    super(go);
    this.#popupMenuGameObject = go;
  }

  step() {
    // TODO Auto-generated method stub
  }

  draw(independentCanvas) {
	throw "Method 'draw' is not implemented";
  }

  get popupMenuGameObject() {
    return this.#popupMenuGameObject;
  }
}
