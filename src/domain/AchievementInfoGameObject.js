


export default class AchievementInfoGameObject {


  static get ORIGINAL_NEW_ACHIEVEMENT_X() { return 20; }
  static get ORIGINAL_NEW_ACHIEVEMENT_Y() { return 300; }

  static get ORIGINAL_ACHIEVEMENT_BACKGROUND_X() { return 0; }
  static get ORIGINAL_ACHIEVEMENT_BACKGROUND_Y() { return 0; }

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
            this.achievementLabel.setVisible(false);
            this.achievementDescriptionLabel.setVisible(false);
            this.newAchievementLabel.setVisible(false);
            this.achievementBackground.setVisible(false);
            this.newAchievementStartTime = 0;
        }
    }
  }

  showAchievementLabel(message, description) {
    this.newAchievementStartTime = new Date().getTime();
    this.achievementLabel.setText(message);
    this.achievementLabel.setVisible(true);
    this.achievementDescriptionLabel.setText(description);
    this.achievementDescriptionLabel.setVisible(true);
    this.newAchievementLabel.setVisible(true);
    this.achievementBackground.setVisible(true);
  };

}

