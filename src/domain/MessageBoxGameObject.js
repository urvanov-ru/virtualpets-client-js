import GameObject from './GameObject.js';


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

//  @Override
//  public void step() {
//    super.step();
//    if (isVisible()) {
//      Point position = getPosition();
//      int x = position.getX();
//      int y = position.getY();
//      if (y < ORIGINAL_MESSAGE_BOX_Y) {
//        final int newY = y += MESSAGE_BOX_MOVE_STEP;
//        position.setY(y);
//        innerGameObjects.stream().forEach(
//            (item) -> {
//              Point relativePosition = item.getPosition();
//              item.getGameObject().setPosition(
//                  new Point(x + relativePosition.getX(), newY
//                      + relativePosition.getY()));
//            });
//        for (int n = 0; n < texts.length; n++) {
//          LabelGameObject item = texts[n];
//          item.setPosition(new Point(x + 50, newY+50 + n * 25));
 //       }
//        if (y >= ORIGINAL_MESSAGE_BOX_Y) {
//          y = ORIGINAL_MESSAGE_BOX_Y;
//          if (messageBoxType == MessageBoxType.OK_BUTTON || messageBoxType == MessageBoxType.OK_CANCEL_BUTTON) {
//            okButton.setVisible(true);
//           okLabel.setVisible(true);
//          }
//          if (messageBoxType == MessageBoxType.CANCEL_BUTTON || messageBoxType == MessageBoxType.OK_CANCEL_BUTTON) {
//            cancelButton.setVisible(true);
//            cancelLabel.setVisible(true);
//          }
//        }
//      }
//    }
//  }

  set visible(visible) {
    super.visible = visible;
    innerGameObjects.each((item) => {
      item.gameObject.visible = visible;
    });
    if (texts != null)
      texts.each((item) => {
        item.visible = visible;
      });
  }

}
