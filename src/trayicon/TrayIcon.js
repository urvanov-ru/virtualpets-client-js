

/**
 * It was a tray icon in a desktop application
 * but in our PWA it just shows messages with a way
 * it wants.
 */
export default class TrayIcon {
  createTrayIcon() {}
  showTrayMessage(message, messageType) {
    alert(message);
  };
  updateTrayIcon() {};
  setConnectionAlive(alive) {};
  setWarning(warning) {};
}
