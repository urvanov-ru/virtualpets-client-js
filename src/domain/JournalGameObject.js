
export default class JournalGameObject extends GameObject { //  implements HighlightGameObject

  static get ORIGINAL_ARROW_RIGHT_X() { return 650; }
  static get ORIGINAL_ARROW_RIGHT_Y() { return 500; }
  static get ORIGINAL_ARROW_LEFT_X() { return 50; }
  static get ORIGINAL_ARROW_LEFT_Y() { return 500; }
  static get ORIGINAL_LEFT_LOADING_X() { return 150; }
  static get ORIGINAL_RIGHT_LOADING_X() { return 550; }
  static get ORIGINAL_LEFT_LOADING_Y() { return 300; }
  static get ORIGINAL_RIGHT_LOADING_Y() { return 300; }
    
  newEntriesCountLabel = null;
  inner = null;
  close = null;
  arrowLeft = null;
  arrowRight = null;
  entries = null;
    
  leftText = null;
  rightText = null;
  currentPage = 0;
  leftLoading = null;
  rightLoading = null;
}

