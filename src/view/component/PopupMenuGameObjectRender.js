import GameObjectRender from './GameObjectRender.js';


export default class PopupMenuGameObjectRender extends GameObjectRender {

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
