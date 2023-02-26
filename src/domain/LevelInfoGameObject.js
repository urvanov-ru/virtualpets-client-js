

export default class LevelInfoGameObject extends GameObject {

  static get ORIGINAL_LEVEL_LABEL_X() { return 50; }
  static get ORIGINAL_LEVEL_LABEL_Y() { return 10; }
  static get ORIGINAL_LEVEL_TEXT_LABEL_X() { return 10; }
  static get ORIGINAL_LEVEL_TEXT_LABEL_Y() { return 10; }
  static get ORIGINAL_EXPERIENCE_TEXT_LABEL_X() { return 100; }
  static get ORIGINAL_EXPERIENCE_TEXT_LABEL_Y() { return 10; }
  static get ORIGINAL_PROGRESS_BAR_X() { return 130; }
  static get ORIGINAL_PROGRESS_BAR_Y() { return 10; }
  static get ORIGINAL_PROGRESS_BAR_WIDTH() { return 200; }
  static get ORIGINAL_PROGRESS_BAR_HEIGHT() { return 20; }
  static get ORIGINAL_LEVEL_HAVE_REACHED_X() { return 100; }
  static get ORIGINAL_LEVEL_HAVE_REACHED_Y() { return 350; }
  static get YOU_HAVE_REACHED_LEVEL_SHOW_TIME() { return 5 * 1000; }
  levelTextLabel = null;
  experienceTextLabel = null;
  levelLabel = null;
  experienceProgressBar = null;
  experience = 0;
  youHaveReachedLevelLabel;
  youHaveReachedLevelStartTime = 0;

  step() {
    if (youHaveReachedLevelStartTime != 0) {
        if (Date.now() > youHaveReachedLevelStartTime + LevelInfoGameObject.YOU_HAVE_REACHED_LEVEL_SHOW_TIME) {
            youHaveReachedLevelLabel.visible = false;
            youHaveReachedLevelStartTime = 0;
        }
    }
  }
    
  set visible(visible) {
    levelLabel.visible = visible;
    experienceProgressBar.visible = visible;
    levelTextLabel.visible = visible;
    experienceTextLabel.visible = visible;
  }

  showLevelHasReachedLabel(message) {
    youHaveReachedLevelLabel.visible = true;
    youHaveReachedLevelLabel.text = message;
    youHaveReachedLevelStartTime = Date.now()
  }    
}

