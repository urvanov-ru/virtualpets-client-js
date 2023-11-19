import GameObject from './GameObject.js';


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
    if (this.youHaveReachedLevelStartTime != 0) {
        if (Date.now() > this.youHaveReachedLevelStartTime + LevelInfoGameObject.YOU_HAVE_REACHED_LEVEL_SHOW_TIME) {
            this.youHaveReachedLevelLabel.visible = false;
            this.youHaveReachedLevelStartTime = 0;
        }
    }
  }
    
  set visible(visible) {
    this.levelLabel.visible = visible;
    this.experienceProgressBar.visible = visible;
    this.levelTextLabel.visible = visible;
    this.experienceTextLabel.visible = visible;
  }

  showLevelHasReachedLabel(message) {
    this.youHaveReachedLevelLabel.visible = true;
    this.youHaveReachedLevelLabel.text = message;
    this.youHaveReachedLevelStartTime = Date.now()
  }    
}

