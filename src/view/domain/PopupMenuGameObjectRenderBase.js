package ru.urvanov.virtualpets.client.view.domain;

import ru.urvanov.virtualpets.client.domain.PopupMenuGameObject;
import ru.urvanov.virtualpets.client.viewimpl.IndependentCanvas;

export default class PopupMenuGameObjectRenderBase extends GameObjectRenderBase {

  popupMenuGameObject;
    
  constructor(go) {
    super(go);
    this.popupMenuGameObject = go;
  }

  step() {
    // TODO Auto-generated method stub
  }

  draw(independentCanvas) {
	throw "Method 'draw' is not implemented";
  }

}
