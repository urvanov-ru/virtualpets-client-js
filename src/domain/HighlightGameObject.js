import GameObject from './GameObject.js';

export default class HighlightGameObject extends GameObject {
  static get OBJECT_NORMAL() { return 0; }
  static get OBJECT_HIGHLIGHT() { return 1; }
}
