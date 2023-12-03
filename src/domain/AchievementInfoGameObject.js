
import GameObject from './GameObject.js';

export default class AchievementInfoGameObject extends GameObject {


  static get ORIGINAL_NEW_ACHIEVEMENT_X() { return 20; }
  static get ORIGINAL_NEW_ACHIEVEMENT_Y() { return 300; }

  static get ORIGINAL_ACHIEVEMENT_BACKGROUND_X() { return 0; }
  static get ORIGINAL_ACHIEVEMENT_BACKGROUND_Y() { return 280; }

  static get ORIGINAL_ACHIEVEMENT_X() { return 100; }
  static get ORIGINAL_ACHIEVEMENT_Y() { return 350; }

  static get ORIGINAL_ACHIEVEMENT_DESCRIPTION_X() { return 100; }
  static get ORIGINAL_ACHIEVEMENT_DESCRIPTION_Y() { return 400; }
  static get NEW_ACHIEVEMENT_SHOW_TIME() { return 5 * 1000; }
  static get ORIGINAL_FONT_SIZE() { return 20; }

  newAchievementStartTime = 0;

  newAchievementLabel = null;
  achievementLabel = null;
  achievementDescriptionLabel = null;
  achievementBackground = null;

  step() {
    if (this.newAchievementStartTime != 0) {
        if (new Date().getTime() > this.newAchievementStartTime
                + AchievementInfoGameObject.NEW_ACHIEVEMENT_SHOW_TIME) {
            this.achievementLabel.visible =false;
            this.achievementDescriptionLabel.visible = false;
            this.newAchievementLabel.visible = false;
            this.achievementBackground.visible = false;
            this.newAchievementStartTime = 0;
        }
    }
  }

  showAchievementLabel(message, description) {
    this.newAchievementStartTime = new Date().getTime();
    this.achievementLabel.text = message;
    this.achievementLabel.visible = true;
    this.achievementDescriptionLabel.text = description;
    this.achievementDescriptionLabel.visible = true;
    this.newAchievementLabel.visible = true;
    this.achievementBackground.visible = true;
  };

}

