import GameObject from './GameObject.js';


export default class PopupMenuGameObject extends GameObject {
  menuItems = [];
  constructor() {
    super();
    this.visible = false;
  }
}
