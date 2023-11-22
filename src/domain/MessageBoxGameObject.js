import GameObject from './GameObject.js';
import Point from './Point.js';


export default class MessageBoxGameObject extends GameObject {

  static get MESSAGE_BOX_TYPE_OK_BUTTON() { return "message-box-type-ok-button"; }
  static get MESSAGE_BOX_TYPE_OK_CANCEL_BUTTON() { return "message-box-type-ok-cancel-button"; }
  static get MESSAGE_BOX_TYPE_CANCEL_BUTTON() { return "message-cancel-button"; }

  static get ORIGINAL_MESSAGE_BOX_X() { return 34; }
  static get ORIGINAL_MESSAGE_BOX_Y() { return 139; }
  static get ORIGINAL_MESSAGE_BOX_OK_BUTTON_X() { return 300; }
  static get ORIGINAL_MESSAGE_BOX_OK_BUTTON_Y() { return 369; }
  static get ORIGINAL_MESSAGE_BOX_CANCEL_BUTTON_X() { return 500; }
  static get ORIGINAL_MESSAGE_BOX_CANCEL_BUTTON_Y() { return 369; }
  static get MESSAGE_BOX_MOVE_STEP() { return 30; }
  static get ORIGINAL_MESSAGE_BOX_OK_LABEL_X() { return MessageBoxGameObject.ORIGINAL_MESSAGE_BOX_OK_BUTTON_X + 20; }
  static get ORIGINAL_MESSAGE_BOX_OK_LABEL_Y() { return MessageBoxGameObject.ORIGINAL_MESSAGE_BOX_OK_BUTTON_Y + 20; }
  static get ORIGINAL_MESSAGE_BOX_CANCEL_LABEL_X() { return MessageBoxGameObject.ORIGINAL_MESSAGE_BOX_CANCEL_BUTTON_X + 20; }
  static get ORIGINAL_MESSAGE_BOX_CANCEL_LABEL_Y() { return MessageBoxGameObject.ORIGINAL_MESSAGE_BOX_CANCEL_BUTTON_Y + 20; }

  okButton = null;
  cancelButton = null;
  okLabel = null;
  cancelLabel = null;

  texts = null; // LabelGameObject[]

  messageBoxType = null;
  
  innerGameObjects = []; // new ArrayList<InnerGameObject>();


  step() {
    super.step();
    if (this.visible) {
      const position = this.position;
      let x = position.x;
      let y = position.y;
      if (y < MessageBoxGameObject.ORIGINAL_MESSAGE_BOX_Y) {
        const newY = y += MessageBoxGameObject.MESSAGE_BOX_MOVE_STEP;
        position.y = y;
        for (let item of this.innerGameObjects) {
          const relativePosition = item.position;
          item.gameObject.position = 
            new Point(x + relativePosition.x, newY
              + relativePosition.y);
        }
        for (let n = 0; n < this.texts.length; n++) {
          const item = this.texts[n];
          item.position = new Point(x + 50, newY + 50 + n * 25);
        }
        if (y >= MessageBoxGameObject.ORIGINAL_MESSAGE_BOX_Y) {
            y = MessageBoxGameObject.ORIGINAL_MESSAGE_BOX_Y;
          if (this.messageBoxType === MessageBoxGameObject.MESSAGE_BOX_TYPE_OK_BUTTON || this.messageBoxType === MessageBoxGameObject.MESSAGE_BOX_TYPE_OK_CANCEL_BUTTON) {
            this.okButton.visible = true;
            this.okLabel.visible = true;
          }
          if (this.messageBoxType === MessageBoxGameObject.MESSAGE_BOX_TYPE_CANCEL_BUTTON || this.messageBoxType === MessageBoxGameObject.MESSAGE_BOX_TYPE_OK_CANCEL_BUTTON) {
            this.cancelButton.visible = true;
            this.cancelLabel.visible = true;
          }
        }
      }
    }
  }

  set visible(visible) {
    super.visible = visible;
    for (let item of this.innerGameObjects) {
      item.gameObject.visible = visible;
    }
    if (this.texts != null)
      for (let item of this.texts) {
        item.visible = visible;
      }
  }
  
  get visible() {
    return super.visible;
  }

}
